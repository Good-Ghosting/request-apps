import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers, providers } from "ethers";
import React, { useCallback } from "react";
import {
  IERC20Abi__factory,
  MoneyBoxesAbi__factory,
  MoneyBoxesFactoryAbi__factory,
} from "../contracts";
import axios from "axios";

export interface IMoneyBoxContext {
  deployMoneyBox: (config: MoneyBoxConfigurationStruct[]) => Promise<string>;
  getUserBoxes: () => Promise<string[] | undefined>;
  getUserBalance: () => Promise<UserBalance | undefined>;
  transferFromSafeToBoxes: (amount: string, token: string) => Promise<void>;

  transferFromBoxToSafe: (
    boxIndex: number | string,
    amount: string,
    token: string
  ) => Promise<void>;

  transferFromBoxToBox: (
    fromBoxId: number | string,
    toBoxId: number | string,
    amount: string,
    token: string
  ) => Promise<void>;

  transferFromBoxToAddress: (
    boxIndex: number | string,
    amount: string,
    token: string,
    toAddress: string
  ) => Promise<void>;
}

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const MoneyBoxContext = React.createContext<IMoneyBoxContext | null>(null);

//Only support gnosis chain for now
const TOKENS_TRACKED_GNOSIS_CHAIN = [
  {
    name: "WETH",
    address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    coinGeckoId: "ethereum",
    decimals: 18,
  },
  {
    name: "USDC",
    address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    coinGeckoId: "usd-coin",
    decimals: 6,
  },
];

export type MoneyBoxConfigurationStruct = {
  percentage: number | string;
  name: string;
  isActive: boolean;
};

export type Balance = {
  token: string;
  tokenAddress: string;
  amount: number;
  amountUSD: number;
  isNativeToken: boolean;
};

export type BoxBalance = {
  boxId: string | number;
  balances: Balance[];
  name: string;
  percentage: number;
};

export type UserBalance = {
  safe: Balance[];
  boxes: BoxBalance[];
};

export const MoneyBoxProvider: React.FC = ({ children }) => {
  const { library, account } = useWeb3React<providers.Web3Provider>();

  const factoryAddress = "0x2B070Cf50aE6F6D4E442CF10dcd5289C37450BB5";
  const safeAddress = "0x57Ed8b808D7CF4a1C30F488EB34a4202E4be5109";

  const getMoneyBoxFactoryContract = useCallback(() => {
    if (!library || !account) return;

    const contract = MoneyBoxesFactoryAbi__factory.connect(
      factoryAddress,
      library.getSigner()
    );

    return contract;
  }, [library, account]);

  const deployMoneyBox = useCallback(
    async (config: MoneyBoxConfigurationStruct[]) => {
      const contract = getMoneyBoxFactoryContract();
      if (!contract) return;

      const tx = await contract.createMoneyBoxesContract(safeAddress, config);
      const receipt = await tx.wait();

      //return result
      return receipt.events?.[0].args?.[0];
    },
    [getMoneyBoxFactoryContract]
  );

  const getUserBoxes = useCallback(async () => {
    const contract = getMoneyBoxFactoryContract();
    if (!contract) return;

    try {
      const latestUserMoneyBox = await contract.getUserLatestMoneyBox(
        account ?? ""
      );

      return [latestUserMoneyBox];
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, [getMoneyBoxFactoryContract, account]);

  const getMoneyBoxContract = useCallback(
    async (address: string) => {
      if (!library || !account) return;

      const boxAddress = await getUserBoxes();

      if (!boxAddress) return;

      console.log("boxAddress", boxAddress[0]);

      const contract = MoneyBoxesAbi__factory.connect(
        boxAddress[0],
        library.getSigner()
      );

      return contract;
    },
    [library, account, getUserBoxes]
  );

  const bigNumberBalanceToNumber = useCallback(
    (balance: BigNumber, decimals: number = 18) => {
      return Number(ethers.utils.formatUnits(balance, decimals));
    },
    []
  );

  const stringToBigNumberWei = useCallback(
    (amount: string, decimals: number = 18) => {
      return ethers.utils.parseUnits(amount, decimals);
    },
    []
  );

  const getUserBalance = useCallback(async () => {
    if (!library || !account) return;

    console.log("start getUserBalance");

    const coinGeckoAPI = "https://api.coingecko.com/api/v3/coins/";

    const xDaiPrice: number = await axios
      .get(coinGeckoAPI + "xdai")
      .then((res) => {
        return res.data.market_data.current_price.usd;
      });

    const ERC20TokensPrice = await Promise.all(
      TOKENS_TRACKED_GNOSIS_CHAIN.map((token) => {
        return axios.get(coinGeckoAPI + token.coinGeckoId).then((res) => ({
          ...token,
          usdValue: res.data.market_data.current_price.usd,
        }));
      })
    );

    console.log("ERC20TokensPrice", ERC20TokensPrice);

    const safeBalanceNative = await library
      .getBalance(safeAddress)
      .then((balance) => {
        console.log("balance", balance.toString());
        return bigNumberBalanceToNumber(balance, 18); //xDai is 18 decimals
      });

    console.log("safeBalanceNative", safeBalanceNative);
    console.log("xDaiPrice", xDaiPrice);

    const userBalance: UserBalance = {
      safe: [
        {
          token: "xDai",
          amount: safeBalanceNative,
          amountUSD: safeBalanceNative * xDaiPrice,
          isNativeToken: true,
          tokenAddress: ZERO_ADDRESS,
        },
      ],
      boxes: [],
    };

    ERC20TokensPrice.forEach(async (token) => {
      const contract = IERC20Abi__factory.connect(
        token.address,
        library.getSigner()
      );
      const balance = await contract
        .balanceOf(safeAddress)
        .then((balance) => bigNumberBalanceToNumber(balance, token.decimals));

      userBalance.safe.push({
        token: token.name,
        amount: balance,
        amountUSD: balance * token.usdValue,
        isNativeToken: false,
        tokenAddress: token.address,
      });
    });

    console.log("userBalance1", userBalance);

    const boxContract = await getMoneyBoxContract(safeAddress);
    if (!boxContract) return userBalance;

    console.log("boxContract", boxContract);

    const numberOfBoxes = await boxContract.getNumberOfBoxes();

    for (let i = 0; i < numberOfBoxes.toNumber(); i++) {
      const boxId = i;
      const boxConfig = await boxContract.boxes(boxId);

      const boxBalance: BoxBalance = {
        boxId,
        name: boxConfig.name,
        percentage: boxConfig.percentage.toNumber(),
        balances: [],
      };

      ERC20TokensPrice.forEach(async (token) => {
        const boxBalanceForToken = await boxContract
          .getBalanceOfBox(boxId, token.address)
          .then((balance) => bigNumberBalanceToNumber(balance, token.decimals));

        boxBalance.balances.push({
          token: token.name,
          amount: boxBalanceForToken,
          isNativeToken: false,
          tokenAddress: token.address,
          amountUSD: boxBalanceForToken * token.usdValue,
        });
      });

      //native
      const boxBalanceForNative = await boxContract
        .getBalanceOfBox(boxId, ZERO_ADDRESS)
        .then(bigNumberBalanceToNumber);

      boxBalance.balances.push({
        token: "xDai",
        amount: boxBalanceForNative,
        isNativeToken: true,
        amountUSD: boxBalanceForNative * xDaiPrice,
        tokenAddress: ZERO_ADDRESS,
      });

      userBalance.boxes.push(boxBalance);
    }

    return userBalance;
  }, [account, library, getMoneyBoxContract, bigNumberBalanceToNumber]);

  const transferFromSafeToBoxes = useCallback(
    async (amount: string, token: string) => {
      const boxContract = await getMoneyBoxContract(safeAddress);
      if (!boxContract) return;

      const amountWei = stringToBigNumberWei(amount);

      const tx = await boxContract.transferFromSafeToBoxes(amountWei, token);

      await tx.wait();
    },
    [getMoneyBoxContract, stringToBigNumberWei]
  );

  const transferFromBoxToSafe = useCallback(
    async (boxIndex: number | string, amount: string, token: string) => {
      const boxContract = await getMoneyBoxContract(safeAddress);
      if (!boxContract) return;

      const totalAmountInBox = await boxContract.getBalanceOfBox(
        boxIndex,
        token
      );
      //const amountWei = stringToBigNumberWei(amount);

      const tx = await boxContract.transferFromBoxToSafe(
        boxIndex,
        totalAmountInBox,
        token
      );
      await tx.wait();
    },
    [getMoneyBoxContract]
  );

  const transferFromBoxToBox = useCallback(
    async (
      fromBoxId: number | string,
      toBoxId: number | string,
      amount: string,
      token: string
    ) => {
      const boxContract = await getMoneyBoxContract(safeAddress);
      if (!boxContract) return;

      const amountWei = stringToBigNumberWei(amount);

      const tx = await boxContract.transferFromBoxToBox(
        fromBoxId,
        toBoxId,
        amountWei,
        token
      );

      await tx.wait();
    },
    [getMoneyBoxContract, stringToBigNumberWei]
  );

  const transferFromBoxToAddress = useCallback(
    async (
      boxIndex: number | string,
      amount: string,
      token: string,
      toAddress: string
    ) => {
      const boxContract = await getMoneyBoxContract(safeAddress);
      if (!boxContract) return;

      const amountWei = stringToBigNumberWei(amount);

      const tx = await boxContract.transferFromBoxToAddress(
        boxIndex,
        amountWei,
        token,
        toAddress
      );

      await tx.wait();
    },

    [getMoneyBoxContract, stringToBigNumberWei]
  );

  return (
    <MoneyBoxContext.Provider
      value={{
        deployMoneyBox,
        getUserBoxes,
        getUserBalance,
        transferFromSafeToBoxes,
        transferFromBoxToSafe,
        transferFromBoxToBox,
        transferFromBoxToAddress,
      }}
    >
      {children}
    </MoneyBoxContext.Provider>
  );
};

export const useMoneyBoxContext = () => {
  const context = React.useContext(MoneyBoxContext);
  if (!context) {
    throw new Error("This hook must be used inside a UserProvider");
  }
  return context;
};
