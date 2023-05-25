import { Grid, Typography, Button } from "@material-ui/core"
import { moneyBox } from "./Safe";


type MoneyBoxProps = {
    box: moneyBox,
    deleteMoneyBox: (id: string) => void
}

const MoneyBox = ({box, deleteMoneyBox}: MoneyBoxProps) => {
    const {id, name, percent, onMoneyArrival} = box
    return (
        <Grid container item spacing={3}>
            <Grid item xs={4}>
                <Typography variant="h5">{name}</Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography variant="h5">{percent} %</Typography>
            </Grid>
            <Grid item xs={4}>
            <Typography variant="h5">{onMoneyArrival}</Typography>
            </Grid>
            <Grid item xs={2}>
            <Button
            onClick={() => deleteMoneyBox(id)}
            color="secondary"
            >
                Delete
            </Button>
            </Grid>
        </Grid>
    )
}

export default MoneyBox;