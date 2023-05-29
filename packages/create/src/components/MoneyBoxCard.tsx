import {
  Grid,
  Box,
  Typography,
  IconButton,
  makeStyles,
  GridProps,
  DialogActions,
  Button,
  DialogContent,
  Dialog,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import { roundToTwoSignificantDigits } from "../utils/formatUtils";
import { useMoneyBoxContext } from "../contexts/MoneyBoxContext";
import { useState } from "react";

export type cardInfo = {
  tokenName: string;
  token: number;
  tokenUsd: number;
  tokenAddress: string;
};

type CardBoxProps = {
  card: cardInfo;
  boxId: string;
};

const useStyles = makeStyles({
  centered: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "38px",
  },
});

const GridCard = ({ children, ...props }: GridProps) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.centered} {...props}>
      {children}
    </Grid>
  );
};

const CardBox = ({ card, boxId }: CardBoxProps) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const { tokenName, token, tokenUsd, tokenAddress } = card;

  const {
    transferFromBoxToSafe,
    transferFromBoxToAddress,
    transferFromBoxToBox,
  } = useMoneyBoxContext();

  return (
    <>
      <TransferModal
        cardBox={{ card, boxId }}
        open={isTransferModalOpen}
        handleClose={() => setIsTransferModalOpen(false)}
        handleTransfer={async (target, amount, transferMethod) => {
          if (transferMethod === "box") {
            await transferFromBoxToBox(boxId, target, amount, tokenAddress);
          } else {
            await transferFromBoxToAddress(boxId, amount, tokenAddress, target);
          }

          setIsTransferModalOpen(false);
        }}
      ></TransferModal>
      <GridCard item xs={2}>
        {tokenName}
      </GridCard>
      <GridCard item xs={2}>
        {roundToTwoSignificantDigits(token)}
      </GridCard>
      <GridCard item xs={3}>
        {roundToTwoSignificantDigits(tokenUsd)} usd
      </GridCard>
      <GridCard item xs={5}>
        <Box sx={{ display: "flex" }}>
          <IconButton color="secondary">
            <AddIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={async () => {
              await transferFromBoxToSafe(boxId, String(token), tokenAddress);
            }}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => {
              setIsTransferModalOpen(true);
            }}
          >
            <SwapHorizIcon />
          </IconButton>
        </Box>
      </GridCard>
    </>
  );
};

type MoneyBoxCardProp = {
  boxes: cardInfo[];
  boxId: string;
};

const MoneyBoxCard = ({ boxes, boxId }: MoneyBoxCardProp) => {
  return (
    <Grid container>
      <Grid container item>
        <Grid item xs={6}>
          <Typography variant="h5">Money Box name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" variant="h5">
            Money Box Total
          </Typography>
        </Grid>
        {boxes.map((box) => (
          <CardBox card={box} boxId={boxId} />
        ))}
      </Grid>
    </Grid>
  );
};

type TransferModalProps = {
  cardBox: CardBoxProps;
  open: boolean;
  handleClose: () => void;
  handleTransfer: (
    target: string,
    amount: string,
    transferMethod: "box" | "address"
  ) => void;
};

const TransferModal: React.FC<TransferModalProps> = ({
  cardBox,
  open,
  handleClose,
  handleTransfer,
}) => {
  const [value, setValue] = useState(0);
  const [boxId, setBoxId] = useState("");
  const [transferOption, setTransferOption] = useState<"box" | "address">(
    "box"
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Transfer {cardBox.card.tokenName}</DialogTitle>
      <DialogContent>
        <div>Total Tokens Available: {cardBox.card.token}</div>
        <TextField
          autoFocus
          margin="dense"
          label="Amount to transfer"
          type="number"
          fullWidth
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <TextField
          margin="dense"
          label={
            transferOption === "box"
              ? "Box ID to transfer to"
              : "Ethereum address to transfer to"
          }
          type="text"
          fullWidth
          value={boxId}
          onChange={(e) => setBoxId(e.target.value)}
        />
        <Select
          value={transferOption}
          onChange={(e) => setTransferOption(e.target.value as any)}
        >
          <MenuItem value="box">Box ID</MenuItem>
          <MenuItem value="address">Ethereum Address</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            return handleTransfer(boxId, String(value), transferOption);
          }}
          color="primary"
        >
          {transferOption === "box"
            ? "Transfer to another box"
            : "Transfer to address"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoneyBoxCard;
