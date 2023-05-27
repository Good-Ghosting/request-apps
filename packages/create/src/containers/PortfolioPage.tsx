import { Box, Typography, Grid, Paper, Divider } from "@material-ui/core";
import PieChart, {MoneyBoxPieChart} from "../components/PieChart";
import VerticalTabs from "../components/VerticalTab";
import { moneyBox } from "../components/Safe";
import { cardInfo } from "../components/MoneyBoxCard";

export type allInfo = {
    box: moneyBox,
    card: cardInfo[],
}

const data: allInfo[] = [{
    box: {
        id: "2",
        name: "Tax",
        percent: 10,
        onMoneyArrival: "Do Nothing"
    },
    card: [  {tokenName: "Wmatic",
    token: 50,
    usd: "50",
},
{tokenName: "USDC",
token: 100,
usd: "50",
},
{tokenName: "DAI",
token: 70,
usd: "65",
}],
},
{
    box: {
        id: "4",
        name: "Spending",
        percent: 20,
        onMoneyArrival: "Invest on Aave"
    },
    card: [  {tokenName: "Weth",
    token: 20,
    usd: "23",
},
{tokenName: "USDT",
token: 105,
usd: "58",
},
{tokenName: "DAI",
token: 70,
usd: "65",
}]
}
]

const PortfolioPage = () => {
    return (
        <Box sx={{ 
            minWidth: '750px',
            mx: "auto",
            padding: "30px",
            }}>
            <Paper elevation={3}>
                <Box sx={{
                    width: '80%',
                    mx: "auto",
                    minHeight: "70vh",
                    py: "15px", 
                    }}>
                    <Typography variant="h4">Overrall Portfolio</Typography>
                    <Divider />
                    <Box sx={{
                        margin: "15px 0px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        }}>
                        <Box sx={{
                            width: "50%"
                        }}>
                            <Grid container spacing={2}>
                            <Grid item xs={6}>
                                    <Typography variant="h5">Unallocated funds</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5">200 USD</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5">Money Boxes</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5">500 USD</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5">Total</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5">700 USD</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{
                            maxWidth: "25%"
                        }}>
                        <PieChart />
                        </Box>
                    </Box>
                    <Typography variant="h4">Money Boxes Breakdown</Typography>
                    <Divider />
                    <Box sx={{
                        display: "flex",
                    }}>
                    <Box  sx={{
                            maxWidth: "25%",
                            margin: "20px"
                        }}>
                        <MoneyBoxPieChart />
                    </Box>
                    <Box>
                        <VerticalTabs data={data} />
                    </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
};

export default PortfolioPage;