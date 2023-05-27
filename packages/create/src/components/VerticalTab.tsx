import * as React from 'react';
import { Tabs, Tab, Typography, Box, Grid, Button } from '@material-ui/core';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
};

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box>
        <Typography variant='h5'>Taxes</Typography>
        <Typography variant='h5'>100 USD</Typography>
        </Box>
      <Grid container spacing={2}>
        <Grid item xs={2}>USDC</Grid>
        <Grid item xs={2}>50</Grid>
        <Grid item xs={3}> 50 USD</Grid>
        <Grid item xs={5}>
            <Box sx={{display: "flex"}}>
                <Button>A</Button>
                <Button>D</Button>
                <Button>T</Button>
            </Box>
        </Grid>
        <Grid item xs={2}>USDC</Grid>
        <Grid item xs={2}>50</Grid>
        <Grid item xs={3}> 50 USD</Grid>
        <Grid item xs={5}>
            <Box sx={{display: "flex"}}>
                <Button>A</Button>
                <Button>D</Button>
                <Button>T</Button>
            </Box>
        </Grid>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}