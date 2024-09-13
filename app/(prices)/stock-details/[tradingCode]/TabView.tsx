"use client";
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Overview from "./Overview";
import Financials from "./Fiancials";
import MarketDepth from "./MarketDepth";
import BlockTransections from "./BlockTransections";
import News from "./News";
import Technical from "./Technical";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

export default function TabView(props: any) {
  const { stock, news, blocktr, tradingCode } = props;

  const [value, setValue] = useState(0);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleButtonClick = (href: string, title: string) => {
    router.push(href);
    dispatch(pageTitleActions.setPageTitle(title));
  };

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const tabItems = [
    {
      title: "Overview",
      component: (
        <Overview stock={stock} handleButtonClick={handleButtonClick} />
      ),
    },
    {
      title: "Fundamental",
      component: <Financials data={stock.fundamentals} />,
    },
    {
      title: "Market Depth",
      component: (
        <MarketDepth
          data={stock.minute}
          tradingCode={tradingCode}
          marketOpenStatus={stock.marketOpenStatus}
        />
      ),
    },
    {
      title: "Block Trnx",
      component: <BlockTransections tradingCode={tradingCode} />,
    },
    {
      title: "News",
      component: <News tradingCode={tradingCode} />,
    },
    {
      title: "Technical",
      component: (
        <Technical
          technicals={stock.fundamentals.technicals}
          tradingCode={tradingCode}
        />
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs value={value} variant="scrollable" onChange={handleChange}>
          {tabItems.map((item, index) => (
            <Tab
              key={index}
              label={item.title}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                color: "text.primary",
                px: 1.7,
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabItems.map((item, index) => (
        <TabPanel value={value} index={index} key={index}>
          {item.component}
        </TabPanel>
      ))}
    </Box>
  );
}
