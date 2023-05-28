import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  makeStyles,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import PieChart, { MoneyBoxPieChart } from "../components/PieChart";
import VerticalTabs from "../components/VerticalTab";
import { moneyBox } from "../components/Safe";
import { cardInfo } from "../components/MoneyBoxCard";
import { UserBalance, useMoneyBoxContext } from "../contexts/MoneyBoxContext";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import { SendToMoneyBoxModal } from "../components/SendToMoneyBoxModal";
import { roundToTwoSignificantDigits } from "../utils/formatUtils";
import SyncIcon from "@material-ui/icons/Sync";

export type allInfo = {
  box: moneyBox;
  card: cardInfo[];
};

function generateAllInfo(userBalance: UserBalance): allInfo[] {
  const allInfo: allInfo[] = userBalance.boxes.map((box) => {
    return {
      box: {
        id: String(box.boxId),
        name: box.name,
        percent: box.percentage,
        onMoneyArrival: "Do Nothing", // Assuming static value here, replace as needed
      },
      card: box.balances.map((balance) => {
        return {
          tokenName: balance.token,
          token: balance.amount,
          tokenUsd: balance.amountUSD,
          tokenAddress: balance.tokenAddress,
        };
      }),
    };
  });

  return allInfo;
}

const useStyles = makeStyles({
  sendButton: {
    minHeight: "30px",
    height: "20px",
    color: "#fff",
    padding: "0",
    fontWeight: "normal",
    minWidth: "100px",
    "& span": {
      fontSize: "12px",
    },
    marginLeft: "5px",
  },

  flex: {
    display: "flex",
  },

  h5: {
    paddingTop: "5px",
  },
});

const PortfolioPage = () => {
  const { getUserBalance, transferFromSafeToBoxes } = useMoneyBoxContext();
  const [userBalances, setUserBalances] = useState<UserBalance | undefined>(
    undefined
  );

  const [isSendToBoxModalOpen, setIsSendToBoxModalOpen] =
    useState<boolean>(false);

  const { account } = useWeb3React<providers.Web3Provider>();

  useEffect(() => {
    if (!account) return;

    const fetchUserBalance = async () => {
      const userBalance = await getUserBalance();
      setUserBalances(userBalance);
    };
    fetchUserBalance();
  }, [account]);

  const hasLoadedUserData = !!userBalances;

  const totalValueUSDInSafe =
    userBalances?.safe.reduce((acc, balance) => acc + balance.amountUSD, 0) ??
    0;

  const totalValueUSDInBoxes =
    userBalances?.boxes.reduce((acc, boxBalance) => {
      return (
        acc +
        boxBalance.balances.reduce(
          (boxAcc, balance) => boxAcc + balance.amountUSD,
          0
        )
      );
    }, 0) ?? 0;

  const safeUSDPercentage =
    (totalValueUSDInSafe / (totalValueUSDInBoxes + totalValueUSDInSafe)) * 100;

  const classes = useStyles();
  const userDataForTable = userBalances && generateAllInfo(userBalances);

  if (!hasLoadedUserData) return <CircularProgress></CircularProgress>;

  const refetchAllDataButton = (
    <IconButton
      onClick={() => {
        setUserBalances(undefined);
        getUserBalance().then((userBalance) => setUserBalances(userBalance));
      }}
    >
      <SyncIcon></SyncIcon>
    </IconButton>
  );

  return (
    <Box
      sx={{
        minWidth: "750px",
        mx: "auto",
        padding: "30px",
      }}
    >
      {refetchAllDataButton}
      {userBalances && (
        <SendToMoneyBoxModal
          userBalance={userBalances}
          open={isSendToBoxModalOpen}
          onClose={() => setIsSendToBoxModalOpen(false)}
          onSend={transferFromSafeToBoxes}
        ></SendToMoneyBoxModal>
      )}
      <Paper elevation={3}>
        <Box
          sx={{
            width: "80%",
            mx: "auto",
            minHeight: "70vh",
            py: "15px",
          }}
        >
          <Typography variant="h4">Overall Portfolio</Typography>
          <Divider />
          <Box
            sx={{
              margin: "15px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "50%",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h5">Unallocated funds (Safe)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    {roundToTwoSignificantDigits(totalValueUSDInSafe)} USD
                  </Typography>
                </Grid>
                <Grid className={classes.flex} item xs={6}>
                  <Typography className={classes.h5} variant="h5">
                    Money Boxes
                  </Typography>
                  <Button
                    className={classes.sendButton}
                    variant="contained"
                    color="secondary"
                    onClick={() => setIsSendToBoxModalOpen(true)}
                  >
                    Move to Boxes
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    {roundToTwoSignificantDigits(totalValueUSDInBoxes)} USD
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">Total</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    {roundToTwoSignificantDigits(
                      totalValueUSDInBoxes + totalValueUSDInSafe
                    )}{" "}
                    USD
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                maxWidth: "30%",
              }}
            >
              {hasLoadedUserData && (
                <PieChart
                  safePercentage={safeUSDPercentage}
                  moneyBoxPercentage={100 - safeUSDPercentage}
                />
              )}
            </Box>
          </Box>
          <Typography variant="h4">Money Boxes Breakdown</Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                maxWidth: "30%",
                margin: "20px",
              }}
            >
              {hasLoadedUserData && (
                <MoneyBoxPieChart userBalance={userBalances} />
              )}
            </Box>
            <Box>
              {userDataForTable && <VerticalTabs data={userDataForTable} />}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PortfolioPage;
