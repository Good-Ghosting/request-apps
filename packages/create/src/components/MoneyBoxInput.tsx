import { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import { moneyBox } from "./Safe";

type MoneyBoxInputProps = {
    handleSubmit: (data: moneyBox) => void;
  };


const MoneyBoxInput = ({handleSubmit}: MoneyBoxInputProps) => {
    const [name, setName] = useState<string>("");
    const [percent, setPercent] = useState<number>(0);
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
        <Grid container item spacing={3}>
        <Grid item xs={3}>
            <TextField 
            variant="outlined" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </Grid>
        <Grid item xs={3}>
         <TextField 
         variant="outlined" 
         type="number"
         value={percent}
         onChange={(e) => setPercent(Number(e.target.value))}
         />
        </Grid>
        <Grid item xs={4}>
         <TextField 
         variant="outlined" 
         value={arrival}
         onChange={(e) => setArrival(e.target.value)}
         />
        </Grid>
        <Grid item xs={2}>
        <Button 
        variant="outlined" 
        size="small" 
        color="primary"
        onClick={handleFormSubmit}
        >Submit</Button>
        </Grid>
    </Grid>
    )
}

export default MoneyBoxInput;