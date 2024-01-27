import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fakeSales } from "../services/fakeUser";

export const TimeSeries = () => {
  return (
    <div className="grow">
      <ResponsiveContainer width="100%">
        <AreaChart data={fakeSales}>
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
