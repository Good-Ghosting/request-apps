import * as React from 'react';
import { Tabs, Tab, Typography, Box, Grid, Button } from '@material-ui/core';
import { cardInfo } from './MoneyBoxCard';
import MoneyBoxCard from './MoneyBoxCard';
import { allInfo } from '../containers/PortfolioPage';


const cardData: cardInfo[] = [
    {tokenName: "Wmatic",
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
}
]

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  console.log("children",)

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
            <>{children}</>
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

type TabProps = {
    data: allInfo[]
}

export default function VerticalTabs({data}: TabProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
};

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, }}
    >
    <Box sx={{minWidth: "150px"}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        {data.map((item) => <Tab label={item.box.name} {...a11yProps(Number(item.box.id))}  />)}
      </Tabs>
      </Box>
      <Box sx={{padding: "15px"}}>
      {data.map(item => <TabPanel value={Number(item.box.id)} index={Number(item.box.id)}>
        <MoneyBoxCard boxes={item.card} />
      </TabPanel>)}
      </Box>
    </Box>
  );
}