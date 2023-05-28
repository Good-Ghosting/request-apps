import * as React from "react";
import { Tabs, Tab, Box, makeStyles } from "@material-ui/core";
import MoneyBoxCard from "./MoneyBoxCard";
import { allInfo } from "../containers/PortfolioPage";

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
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

type TabProps = {
  data: allInfo[];
};

const useStyles = makeStyles({
  tab: {
    padding: "0",
    maxHeight: "35px",
  },
});

export default function VerticalTabs({ data }: TabProps) {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
        alignItems: "center",
      }}
    >
      <Box sx={{ minWidth: "150px" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          {data.map((item, index) => (
            <Tab
              className={classes.tab}
              label={item.box.name}
              {...a11yProps(Number(index))}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ padding: "15px" }}>
        {data.map((item, index) => (
          <TabPanel value={value} index={index} key={index}>
            <MoneyBoxCard boxes={item.card} boxId={item.box.id} />
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}
