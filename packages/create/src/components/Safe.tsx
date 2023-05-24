import React from "react";
import { Grid, Paper, Box } from "@material-ui/core";
import MoneyBox from "./MoneyBox";


const Safe = () => {
    return (
        <Box sx={{ 
            width: '60%',
            mx: "auto",
            }}>
        <Paper elevation={3}>
        <Box sx={{
             width: '80%',
             mx: "auto",
             py: "25px", 
             }}>
        <Grid container>
            <MoneyBox />
            <MoneyBox />
            <MoneyBox />
        </Grid>
        </Box>
        </Paper>
        </Box>
    )
}

export default Safe;