import {useState} from "react";
import { Grid, Paper, Box, Button } from "@material-ui/core";
import MoneyBox from "./MoneyBox";
import MoneyBoxInput from "./MoneyBoxInput";

export type moneyBox = {
    id: string,
    name: string,
    percent: number,
    onMoneyArrival: string,
}

 type SubmitHandler = (data: moneyBox) => void;

const Safe = () => {
    const [boxes, setBoxes] = useState<moneyBox[]>([]);
    const [showForm, setShowForm] = useState<Boolean>(false);

    const handleSubmit: SubmitHandler = ({name, percent, onMoneyArrival, id}) => {
        setBoxes((prevState) => [...prevState, {name, percent, onMoneyArrival, id}])
        setShowForm(false);
    }

    const deleteMoneyBox = (id: string) => {
        setBoxes((boxes) => boxes.filter(box => box.id !== id))
    }

    return (
        <Box sx={{ 
            width: '90%',
            mx: "auto",
            }}>
        <Paper elevation={3}>
        <Box sx={{
             width: '80%',
             mx: "auto",
             py: "25px", 
             }}>
        <Grid container>
            {boxes.map(box => (
                <MoneyBox box={box} deleteMoneyBox={deleteMoneyBox} />
            ))}
            {showForm && <MoneyBoxInput handleSubmit={handleSubmit} />}
        </Grid>
        <Box>
            <Button 
            variant="contained" 
            color="secondary"
            onClick={() => setShowForm(true)}
            >
                Add Box
            </Button>
        </Box>
        </Box>
        </Paper>
        </Box>
    )
}

export default Safe;