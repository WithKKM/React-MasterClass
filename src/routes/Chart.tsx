import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { Loader } from "rsuite";

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
  const { isLoading, data } = useQuery<IHistorical>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId.coinId),
    {
      refetchInterval: 10000,
    }
  );
  const isError = !Array.isArray(data);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Loader />
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
