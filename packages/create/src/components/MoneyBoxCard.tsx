import { Grid, Box, Typography, IconButton, makeStyles, GridProps,} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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

const useStyles = makeStyles({
    centered: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: "38px"
    },
  });

const GridCard = ({ children, ...props }: GridProps) => {
    const classes = useStyles();
    return (
        <Grid item className={classes.centered} {...props}>
          {children}
        </Grid>
      );
}

const CardBox = ({card}: CardBoxProps) => {
    const {tokenName, token, usd} = card
    return (
    <>
    <GridCard item xs={2}>{tokenName}</GridCard>
        <GridCard  item xs={2}>{token}</GridCard>
        <GridCard item xs={3}>{usd} usd</GridCard>
        <GridCard  item xs={5}>
            <Box sx={{display: "flex"}}>
                <IconButton color="secondary">
                    <AddIcon />
                </IconButton>
                <IconButton color="secondary">
                    <RemoveIcon />
                </IconButton>
                <IconButton color="secondary">
                    <RemoveIcon />
                </IconButton>
            </Box>
    </GridCard>
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