"use client";
import React from "react";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import IndexChart from "@/components/homepage/IndexChart";
import MarketMoverChart from "@/components/homepage/MarketMoverChart";
import SectorStatus from "@/components/homepage/SectorStatus";
import GainerLoser from "@/components/homepage/GainerLoser";
import BlockTr from "@/components/homepage/BlockTr";
import News from "@/components/homepage/News";
import TopFinancials from "@/components/homepage/TopFinancials";
import Ipo from "@/components/homepage/Ipo";
import Beta from "@/components/homepage/Beta";
import IndexMover from "@/components/homepage/IndexMover";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";

export default function Home() {
  const [indexData, setindexData] = React.useState<any>(null);
  const [sectorData, setsectorData] = React.useState(null);
  const [gainerLoserData, setgainerLoserData] = React.useState();
  const [blockTrData, setblockTrData] = React.useState();
  const [newsData, setnewsData] = React.useState();
  const [topFinancialsData, settopFinancialsData] = React.useState();
  const [ipo, setipo] = React.useState();
  const [beta, setbeta] = React.useState();
  const [indexMover, setindexMover] = React.useState();
  const [isLoading, setisLoading] = React.useState(false);

  const [datafetched, setdatafetched] = React.useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Homepage"));

  const handleButtonClick = (href: string, title: string) => {
    router.push(href);
    // dispatch(pageTitleActions.setPageTitle(title));
  };

  async function getIndexData() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/indexMinuteData`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setindexData(data);
  }
  async function getGainerLoserData() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/topGainerLoser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setgainerLoserData(data);
  }
  async function getIpo() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/ipo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setipo(data);
  }
  async function getSectorData() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/sectorGainValueSummary`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setsectorData(data);
  }
  async function getBlockTr() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/blockTr/lastday`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setblockTrData(data);
  }
  async function getNews() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/news/all?limit=500`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setnewsData(data);
  }
  async function getTopFinancials() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/topFinancials?setlimit=12`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    settopFinancialsData(data);
  }
  async function getBeta() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/allStockBeta?type=top&count=8`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setbeta(data);
  }
  async function getIndexMover() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/indexMover?type=top&count=8`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setindexMover(data);
  }

  async function getData() {
    try {
      setisLoading(true);
      await Promise.all([
        getIndexData(),
        getSectorData(),
        getGainerLoserData(),
        getBlockTr(),
        getNews(),
        getTopFinancials(),
        getIpo(),
        getBeta(),
        getIndexMover(),
      ]);
      setdatafetched(true);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      setdatafetched(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const { pathname, search } = window.location;
      router.push(`/reload?redirect=${encodeURIComponent(pathname + search)}`);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <LoadingSpinner open={isLoading} />

      {datafetched && (
        <>
          <Box>
            <Box>
              {indexData && (
                <Box sx={{ mb: 2.5 }}>
                  <IndexChart
                    indexData={indexData}
                    handleButtonClick={handleButtonClick}
                  />
                </Box>
              )}
            </Box>

            <Divider light />

            <Box sx={{ mb: 1 }}>
              <Box>
                {indexData && sectorData && (
                  <MarketMoverChart
                    data={indexData?.latest}
                    sectorData={sectorData[0]}
                  />
                )}
              </Box>
            </Box>

            <Divider light />

            <Box>
              {gainerLoserData && (
                <Box>
                  <GainerLoser
                    data={gainerLoserData}
                    handleButtonClick={handleButtonClick}
                  />
                </Box>
              )}
            </Box>

            <Divider light />

            <Box sx={{ pt: 2, pb: 1 }}>
              {sectorData && (
                <Box>
                  <SectorStatus sectorData={sectorData} />
                </Box>
              )}
            </Box>

            <Divider light />

            <Box>{newsData && <News data={newsData} />}</Box>

            <Divider light />

            <Box>
              {topFinancialsData && (
                <Box sx={{ pb: 2 }}>
                  <TopFinancials
                    data={topFinancialsData}
                    handleButtonClick={handleButtonClick}
                  />
                </Box>
              )}
            </Box>

            <Divider light />

            <Box sx={{ pt: 2 }}>
              {indexMover && (
                <IndexMover
                  data={indexMover}
                  handleButtonClick={handleButtonClick}
                />
              )}
            </Box>

            <Box sx={{ py: 1 }}>
              {beta && (
                <Beta data={beta} handleButtonClick={handleButtonClick} />
              )}
            </Box>

            <Box sx={{ my: 1 }}>
              {blockTrData && (
                <BlockTr
                  data={blockTrData}
                  handleButtonClick={handleButtonClick}
                />
              )}
            </Box>

            <Box sx={{ my: 1 }}>{ipo && <Ipo data={ipo} />}</Box>
          </Box>
          <Box sx={{ pt: 2, pb: 2 }}>
            <Divider />
            <Typography
              sx={{ fontSize: ".9rem", textAlign: "center", mt: 2 }}
              color="text.secondary"
            >
              Charts are powered by{" "}
              <Typography
                component={Link}
                href="https://www.tradingview.com/"
                target="_blank"
                sx={{ color: "primary.main" }}
              >
                TradingView
              </Typography>
            </Typography>
          </Box>
        </>
      )}
    </>
  );
}
