export const getUniques = (array: any, key: string) => {
  const seen = new Set();
  const uniques: any = [];

  array.forEach((item: any) => {
    if (!seen.has(item[key])) {
      seen.add(item[key]);
      uniques.push(item);
    }
  });

  return uniques;
};

export const addDaysToToday = (days: number) => {
  const today = new Date();
  const resultDate = new Date(today);
  resultDate.setDate(today.getDate() + days);
  // resultDate.setUTCHours(17, 59, 0, 0); // 23:59 at GMT+6 corresponds to 17:59 UTC
  return resultDate;
};

export const isWithinPreviousTwoDays = (givenDate: string) => {
  if (!givenDate) return false;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const endDate = new Date(givenDate);
  endDate.setDate(endDate.getDate() - 1);

  const startDate = new Date(givenDate);

  let spotCount = 0;

  while (spotCount < 2) {
    startDate.setDate(startDate.getDate() - 1);

    if (!(startDate.getDay() === 5 || startDate.getDay() === 6)) {
      spotCount++;
    }
  }
  return currentDate >= startDate && currentDate <= endDate;
};

export const getIsMarketOpen = (marketOpenStatus: any) => {
  const { dataInsertionEnable, openHour, openMinute, closeHour, closeMinute } =
    marketOpenStatus;

  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();

  const currentTimeInMinutes = hours * 60 + minutes;
  const startTimeInMinutes = openHour * 60 + openMinute;
  const endTimeInMinutes = closeHour * 60 + closeMinute;

  return (
    dataInsertionEnable == 1 &&
    currentTimeInMinutes >= startTimeInMinutes &&
    currentTimeInMinutes <= endTimeInMinutes
  );
};

export const calcDataFetchEndTime = (marketOpenStatus: any) => {
  const {
    dataFetchStartHour,
    dataFetchStartMinute,
    dataFetchEndHour,
    dataFetchEndMinute,
  } = marketOpenStatus;

  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();

  const currentTimeInMinutes = hours * 60 + minutes;
  const startTimeInMinutes = dataFetchStartHour * 60 + dataFetchStartMinute;

  if (currentTimeInMinutes < startTimeInMinutes) {
    const previousDay = new Date(now);
    previousDay.setUTCDate(now.getUTCDate() - 1);
    previousDay.setUTCHours(dataFetchEndHour, dataFetchEndMinute);
    return previousDay;
  } else {
    const sameDay = new Date(now);
    sameDay.setUTCHours(dataFetchEndHour, dataFetchEndMinute);
    return sameDay;
  }
};
