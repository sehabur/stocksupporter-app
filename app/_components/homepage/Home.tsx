"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Box, Divider, Typography } from "@mui/material";

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
import { AUTO_RELOAD_TIME_MS } from "@/data/constants";

import { indexInfoActions, pageTitleActions } from "_store";
import AutoReload from "../shared/AutoReload";
import { Preferences } from "@capacitor/preferences";
import { calcDataFetchEndTime, getIsMarketOpen } from "_helper";

export default function Home() {
  const [indexData, setindexData] = useState<{ latest: {}; rsi: number }>();

  const [sectorData, setsectorData] = useState();

  const [blockTrData, setblockTrData] = useState();

  const [newsData, setnewsData] = useState();

  const [topFinancialsData, settopFinancialsData] = useState();

  const [ipo, setipo] = useState();

  const [beta, setbeta] = useState();

  const [indexMover, setindexMover] = useState();

  const [isLoading, setisLoading] = useState(false);

  const [datafetched, setdatafetched] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const marketOpenStatus = useSelector((state: any) => state.marketOpenStatus);

  dispatch(pageTitleActions.setPageTitle("Homepage"));

  const handleButtonClick = (href: string) => {
    router.push(href);
  };

  async function fetchDataFromApi(endpoint: string, storageKey: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/${endpoint}`,
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
    const initdata = await res.json();

    await Preferences.set({
      key: storageKey,
      value: JSON.stringify({
        data: initdata,
        pullTime: new Date().toISOString(),
      }),
    });
    return initdata;
  }

  const getDataByStoreValidate = async (
    endpoint: string,
    storageKey: string,
    isCustomDataFetchEndTime: boolean = false,
    customDataFetchEndTimeValue: string = ""
  ) => {
    if (getIsMarketOpen(marketOpenStatus)) {
      return await fetchDataFromApi(endpoint, storageKey);
    }

    const storage: { value: any } = await Preferences.get({
      key: storageKey,
    });

    if (!storage.value) {
      return await fetchDataFromApi(endpoint, storageKey);
    }

    const { data: dataFromStorage, pullTime } = JSON.parse(storage.value);

    let dataFetchEndTime;

    if (isCustomDataFetchEndTime) {
      dataFetchEndTime = new Date(customDataFetchEndTimeValue);
    } else {
      dataFetchEndTime = calcDataFetchEndTime(marketOpenStatus);
    }

    // console.log(endpoint, dataFetchEndTime);

    if (new Date(pullTime) < new Date(dataFetchEndTime)) {
      return await fetchDataFromApi(endpoint, storageKey);
    } else {
      return dataFromStorage;
    }
  };

  async function getData() {
    setisLoading(true);
    const indexMinuteData = await getDataByStoreValidate(
      "indexMinuteData",
      "indexMinuteDataHomepage"
    );
    setindexData(indexMinuteData);

    const sectorGainValueSummary = await getDataByStoreValidate(
      "sectorGainValueSummary",
      "sectorGainValueSummaryHomepage"
    );
    setsectorData(sectorGainValueSummary);

    const news = await getDataByStoreValidate(
      "news/all?limit=250",
      "newsHomepage"
    );
    setnewsData(news);

    const topFinancials = await getDataByStoreValidate(
      "topFinancials?setlimit=12",
      "topFinancialsHomepage"
    );
    settopFinancialsData(topFinancials);

    const allStockBeta = await getDataByStoreValidate(
      "allStockBeta?type=top&count=8",
      "allStockBetaHomepage"
    );
    setbeta(allStockBeta);

    const indexMover = await getDataByStoreValidate(
      "indexMover?type=top&count=8",
      "indexMoverHomepage"
    );
    setindexMover(indexMover);

    const indexInfo = await getDataByStoreValidate(
      "getIndexInfo",
      "indexInfoHomepage"
    );
    dispatch(indexInfoActions.setData(indexInfo.Data));

    const ipo = await getDataByStoreValidate(
      "ipo",
      "ipoHomepage",
      true,
      marketOpenStatus?.ipoUpdateTime
    );
    setipo(ipo);

    const blockTr = await getDataByStoreValidate(
      "blockTr/lastday",
      "blockTrHomepage",
      true,
      marketOpenStatus?.dailyBlockTrUpdateDate
    );
    setblockTrData(blockTr);

    setisLoading(false);
    setdatafetched(true);
  }

  useEffect(() => {
    getData();
  }, [marketOpenStatus]);

  // async function getIndexData() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/indexMinuteData`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();
  //   setindexData(data);
  // }
  // async function getGainerLoserData() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/topGainerLoser`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();
  //   setgainerLoserData(data);
  // }
  // async function getIpo() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/ipo`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();
  //   setipo(data);
  // }
  // async function getSectorData() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/sectorGainValueSummary`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();
  //   setsectorData(data);
  // }
  // async function getBlockTr() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/blockTr/lastday`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();
  //   setblockTrData(data);
  // }
  // async function getNews() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/news/all?limit=500`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();
  //   setnewsData(data);
  // }
  // async function getTopFinancials() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/topFinancials?setlimit=12`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();
  //   settopFinancialsData(data);
  // }
  // async function getBeta() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/allStockBeta?type=top&count=8`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();
  //   setbeta(data);
  // }
  // async function getIndexMover() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/indexMover?type=top&count=8`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();
  //   setindexMover(data);
  // }

  // async function getIndexInfo() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/getIndexInfo`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const initdata = await res.json();
  //   dispatch(indexInfoActions.setData(initdata.Data));
  // }

  // async function getData() {
  //   try {
  //     setisLoading(true);
  //     await Promise.all([
  //       getIndexData(),
  //       getSectorData(),
  //       getGainerLoserData(),
  //       getBlockTr(),
  //       getNews(),
  //       getTopFinancials(),
  //       getIpo(),
  //       getBeta(),
  //       getIndexMover(),
  //     ]);
  //     setdatafetched(true);
  //     setisLoading(false);
  //   } catch (error) {
  //     setisLoading(false);
  //     setdatafetched(false);
  //   }
  // }

  return (
    <Box>
      <LoadingSpinner open={isLoading} />
      <AutoReload />
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

            {/* <Divider light /> */}

            <Box>
              <Box>
                {indexData && sectorData && (
                  <MarketMoverChart
                    data={indexData?.latest}
                    rsi={indexData.rsi}
                  />
                )}
              </Box>
            </Box>

            {/* <Divider /> */}

            <Box>
              <GainerLoser handleButtonClick={handleButtonClick} />
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
    </Box>
  );
}
