import { Grid, Typography } from "@material-ui/core"

const MoneyBox = () => {
    return (
        <Grid container item spacing={3}>
            <Grid item xs={4}>
                <Typography variant="h5">Money Box name</Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography variant="h5">Percentage</Typography>
            </Grid>
            <Grid item xs={4}>
            <Typography variant="h5">On money arrival</Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography variant="h5">Delete button</Typography>
            </Grid>
        </Grid>
    )
}

export default MoneyBox;