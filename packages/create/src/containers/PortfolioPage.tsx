import { Box, Typography, Grid, Paper, Divider } from "@material-ui/core";
import PieChart, {MoneyBoxPieChart} from "../components/PieChart";

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
                        justifyContent: "space-between",
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
                            maxWidth: "40%"
                        }}>
                        <PieChart />
                        </Box>
                    </Box>
                    <Typography variant="h4">Money Boxes Breakdown</Typography>
                    <Divider />
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                    <Box  sx={{
                            maxWidth: "40%",
                            margin: "20px 0px"
                        }}>
                        <MoneyBoxPieChart />
                    </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
};

export default PortfolioPage;