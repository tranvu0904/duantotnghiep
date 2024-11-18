import { getNumbersArea, getNumbersPrice } from "./getNumbers";

export const getCodePrice = (totals, min, max) => {
  return totals?.map((item) => {
    let arrMinMax = getNumbersPrice(item.value);
    return {
      ...item,
      min:
        arrMinMax.length === 2
          ? arrMinMax[0]
          : arrMinMax[0] === min
          ? 0
          : arrMinMax[0],
      max:
        arrMinMax.length === 2
          ? arrMinMax[1]
          : arrMinMax[0] === max
          ? 999999
          : arrMinMax[0],
    };
  });
};

export const getCodeArea = (totals, min, max) => {
  return totals.map((item) => {
    let arrMinMax = getNumbersArea(item.value);
    return {
      ...item,
      min:
        arrMinMax.length === 2
          ? arrMinMax[0]
          : arrMinMax[0] === min
          ? 0
          : arrMinMax[0],
      max:
        arrMinMax.length === 2
          ? arrMinMax[1]
          : arrMinMax[0] === max
          ? 999999
          : arrMinMax[0],
    };
  });
};

export const getCodesPrice = (entry, prices, min, max) => {
  const pricesWithMinMax = getCodePrice(prices, min, max);
  return pricesWithMinMax.filter(
    (item) => item.min <= entry && item.max > entry
  );
};

export const getCodesArea = (entry, areas, min, max) => {
  const areasWithMinMax = getCodeArea(areas, min, max);
  return areasWithMinMax.filter(
    (item) => item.min <= entry && item.max > entry
  );
};
