import {useState} from "react";
import { Grid, Paper, Box, Button, makeStyles, Typography } from "@material-ui/core";
import MoneyBox from "./MoneyBox";
import MoneyBoxInput from "./MoneyBoxInput";

export type moneyBox = {
    id: string,
    name: string,
    percent: number,
    onMoneyArrival: string,
    // tokens: [{...add tokens here that are of type cardInfo defined in MoneyBoxCard}]
}

 type SubmitHandler = (data: moneyBox) => void;

 const buttonStyle = {
    minHeight: "30px",
    minWidth: "100px",
    height: "20px",
    fontSize: "14px",
    padding: "12px",
 }

 const useStyles = makeStyles({
    addButton: {
        ...buttonStyle,
        color: "#fff",
    },
    deleteButton: {
        ...buttonStyle,
        marginRight: "10px",
    }
 })

const Safe = () => {
    const classes = useStyles();
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
            marginBottom: "15px",
             }}>
        <Grid container>
            {boxes.map(box => (
                <>
                <MoneyBox box={box} deleteMoneyBox={deleteMoneyBox} />
                </>
            ))}
            {(showForm || boxes.length === 0)  && <MoneyBoxInput handleSubmit={handleSubmit} />}
        </Grid>
        </Box>
        <Box sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center"
        }} >
            <Box sx={{
                marginRight: "300px",
            }}>
                <Typography variant="h5">Total: 100 %</Typography>
            </Box>
            <Button 
            className={classes.addButton}
            variant="contained" 
            color="secondary"
            onClick={() => setShowForm(true)}
            >
                Add Box
            </Button>
        </Box>
        <Box sx={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
        }}>
            <Button
            className={classes.deleteButton}
            variant="outlined" 
            color="primary"
            >
                Cancel
            </Button>
            <Button
            className={classes.addButton}
            variant="contained" 
            color="secondary"
            >
            Confirm
            </Button>
        </Box>
        </Box>
        </Paper>
        </Box>
    )
}

export default Safe;