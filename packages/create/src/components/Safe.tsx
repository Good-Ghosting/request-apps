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
            minWidth: '950px',
            mx: "auto",
            padding: "30px",
            }}>
        <Paper elevation={3}>
        <Box sx={{
            width: '80%',
             mx: "auto",
             minHeight: "50vh",
             py: "25px", 
        }}>
        <Box sx={{
            marginBottom: "30px",
             }}>
        <Grid container>
            {boxes.map(box => (
                <>
                <MoneyBox box={box} deleteMoneyBox={deleteMoneyBox} />
                </>
            ))}
            {showForm && <MoneyBoxInput handleSubmit={handleSubmit} />}
        </Grid>
        </Box>
        <Box >
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