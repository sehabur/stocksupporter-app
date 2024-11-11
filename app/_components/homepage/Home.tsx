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

import { indexInfoActions, pageTitleActions } from "_store";
import AutoReload from "../shared/AutoReload";
import { Preferences } from "@capacitor/preferences";
import { calcDataFetchEndTime, getIsMarketOpen } from "_helper";

export default function Home() {
  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Homepage"));

  const router = useRouter();

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

  const marketOpenStatus = useSelector((state: any) => state.marketOpenStatus);

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
    customDataFetchEndData: {
      endDatetime: string;
      isCustomTime: boolean;
      hour: number;
      minute: number;
    } = {
      endDatetime: "",
      isCustomTime: false,
      hour: 0,
      minute: 0,
    }
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
      const { endDatetime, isCustomTime, hour, minute } =
        customDataFetchEndData;

      dataFetchEndTime = new Date(endDatetime);

      if (isCustomTime) {
        dataFetchEndTime.setUTCHours(hour, minute, 0, 0);
      }
    } else {
      dataFetchEndTime = calcDataFetchEndTime(marketOpenStatus);
    }

    // console.log(storageKey, dataFetchEndTime);

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

    setisLoading(false);
    setdatafetched(true); // Show UI as soon as these 2 API call done //

    const indexInfo = await getDataByStoreValidate(
      "getIndexInfo",
      "indexInfoHomepage"
    );
    dispatch(indexInfoActions.setData(indexInfo.Data));

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

    const indexMover = await getDataByStoreValidate(
      "indexMover?type=top&count=8",
      "indexMoverHomepage"
    );
    setindexMover(indexMover);

    const allStockBeta = await getDataByStoreValidate(
      "allStockBeta?type=top&count=8",
      "allStockBetaHomepage"
    );
    setbeta(allStockBeta);

    const blockTr = await getDataByStoreValidate(
      "blockTr/lastday",
      "blockTrHomepage",
      true,
      {
        endDatetime: marketOpenStatus?.dailyBlockTrUpdateDate,
        isCustomTime: true,
        hour: 9,
        minute: 55,
      }
    );
    setblockTrData(blockTr);

    const ipo = await getDataByStoreValidate("ipo", "ipoHomepage", true, {
      endDatetime: marketOpenStatus?.ipoUpdateTime,
      isCustomTime: false,
      hour: 0,
      minute: 0,
    });
    setipo(ipo);
  }

  useEffect(() => {
    getData();
  }, [marketOpenStatus]);

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
