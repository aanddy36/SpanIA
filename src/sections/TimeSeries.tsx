import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const TimeSeries = () => {
const { timeSeries } = useSelector((store: RootState) => store.admin);
  return (
    <div className="grow">
      <ResponsiveContainer width="100%">
        <AreaChart data={timeSeries}>
          <XAxis dataKey="label" />
          <YAxis unit="$" />
          <CartesianGrid />
          <Tooltip />
          <Area
            dataKey="sales"
            type="monotone"
            stroke="#4f46e5"
            fill="#c7d2fe"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
