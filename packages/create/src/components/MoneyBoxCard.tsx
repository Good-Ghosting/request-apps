import { useEffect, useState } from "react";
import { Grid, Box, Typography, IconButton, makeStyles, GridProps,} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

import axios from "axios";

export type cardInfo = {
    tokenName: string,
    token: number,
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
    const {tokenName, token,} = card
    const [coin, setCoin] = useState<number | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            const coinName= tokenName.toLowerCase()
            try {
              const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}`);
              setCoin((response.data.market_data.current_price.usd).toFixed(2) * token);
            } catch (error) {
              console.error("error: " + error);
            }
          };
          fetchData();
    }, [])
    return (
    <>
    <GridCard item xs={2}>{tokenName}</GridCard>
        <GridCard  item xs={2}>{token}</GridCard>
        <GridCard item xs={3}>{coin ?? token} usd</GridCard>
        <GridCard  item xs={5}>
            <Box sx={{display: "flex"}}>
                <IconButton color="secondary">
                    <AddIcon />
                </IconButton>
                <IconButton color="secondary">
                    <RemoveIcon />
                </IconButton>
                <IconButton color="secondary">
                    <SwapHorizIcon />
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