import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import { Balance, UserBalance } from "../contexts/MoneyBoxContext";

interface SendToMoneyBoxModalProps {
  userBalance: UserBalance;
  open: boolean;
  onClose: () => void;
  onSend: (amount: string, token: string) => Promise<void>;
}

export const SendToMoneyBoxModal: React.FC<SendToMoneyBoxModalProps> = ({
  userBalance,
  open,
  onClose,
  onSend,
}) => {
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleChangeToken = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedToken(event.target.value as string);
  };

  const handleChangeAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmount(event.target.value as number);
  };

  const handleSend = async () => {
    const selectedTokenAddress = userBalance.safe.find(
        (balance: Balance) => balance.token === selectedToken
    )?.tokenAddress;
    if (!selectedTokenAddress) {
        console.log("No token address found");
        return;
    }
    await onSend(String(amount), selectedTokenAddress);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select a Token</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <Select value={selectedToken} onChange={handleChangeToken}>
            {userBalance.safe.map((balance: Balance) => (
              <MenuItem key={balance.token} value={balance.token}>
                {`${balance.token} (${balance.amount})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={handleChangeAmount}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSend} color="primary">
          Send to Money Boxes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
