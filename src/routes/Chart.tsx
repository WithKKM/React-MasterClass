import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexCharts from "apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ICoinChildren {
  coinId: string;
}

function Chart() {
  const { state } = useLocation();
  const coinId = state as ICoinChildren;
  // console.log(coin);
  const { isLoading, data } = useQuery<IHistorical>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId.coinId)
  );
  return <h1>Charts</h1>;
}

export default Chart;
