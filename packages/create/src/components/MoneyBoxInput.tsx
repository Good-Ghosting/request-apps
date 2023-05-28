import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import { moneyBox } from "./Safe";
import { CenteredGridItem } from "./MoneyBox";

type MoneyBoxInputProps = {
    handleSubmit: (data: moneyBox) => void;
  };


const MoneyBoxInput = ({handleSubmit}: MoneyBoxInputProps) => {
    const [name, setName] = useState<string>("");
    const [percent, setPercent] = useState<number>(10);
    const [arrival, setArrival] = useState<string>("");

    const handleFormSubmit = () => {
        const data = {
          id: uuidv4(),
          name: name,
          percent: percent,
          onMoneyArrival: arrival,
        };
        handleSubmit(data);
      };
    return (
        <Grid container item>
        <CenteredGridItem item xs={4}>
            <Typography variant="h5">Money Box Name</Typography>
            <TextField 
            variant="outlined" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </CenteredGridItem>
        <CenteredGridItem item xs={2}>
         <Typography variant="h5">%</Typography>
         <TextField 
         variant="outlined" 
         type="number"
         value={percent}
        
         onChange={(e) => setPercent(Number(e.target.value))}
         />
        </CenteredGridItem>
        <CenteredGridItem item xs={4}>
        <Typography variant="h5">On Money Arrival</Typography>
         <TextField 
         variant="outlined" 
         select
         value={arrival}
         onChange={(e) => setArrival(e.target.value)}
         SelectProps={{
          native: true,
         }}
         >
          <option>Invest on Aave</option>
          <option>Do Nothing</option>
          <option>Convert to USDC</option>
         </TextField>
        </CenteredGridItem>
        <CenteredGridItem item xs={2}>
        <Button 
        variant="outlined" 
        size="small" 
        color="primary"
        onClick={handleFormSubmit}
        >Submit</Button>
        </CenteredGridItem>
    </Grid>
    )
}

export default MoneyBoxInput;