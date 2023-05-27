import { Grid, Box, Typography, Button } from "@material-ui/core";

export type cardInfo = {
    tokenName: string,
    token: number,
    usd: string,
}

type CardBoxProps = {
    card: cardInfo,
    // moneyBoxName: string,
    // moneyBoxTotal: number,
}

const CardBox = ({card}: CardBoxProps) => {
    const {tokenName, token, usd} = card
    return (
    <>
    <Grid item xs={2}>{tokenName}</Grid>
        <Grid item xs={2}>{token}</Grid>
        <Grid item xs={2}>{usd} usd</Grid>
        <Grid item xs={5}>
            <Box sx={{display: "flex"}}>
                <Button>A</Button>
                <Button>D</Button>
                <Button>T</Button>
            </Box>
    </Grid>
    </>
)}

type MoneyBoxCardProp = {
    boxes: cardInfo[]
}

const MoneyBoxCard = ({boxes}: MoneyBoxCardProp) => {
    return (
        <Grid container>
            <Grid container item>
            <Grid item xs={6}>
            <Typography variant="h5">Money Box name</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography align="center" variant="h5">Money Box Total</Typography>
            </Grid>
                {boxes.map(box => <CardBox card={box} />)}
            </Grid>
        </Grid>
    )
}

export default MoneyBoxCard;