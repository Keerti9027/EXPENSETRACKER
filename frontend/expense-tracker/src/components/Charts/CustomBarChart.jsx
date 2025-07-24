import React from "react";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Cell, 
   LabelList,
} from "recharts";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6", "#00C49F", "#FFBB28"];

const CustomBarChart = ({ data }) => {
  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, month, amount, name } = payload[0].payload;
      return (
        <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200">
          <div className="font-semibold text-primary mb-1">
            {date || month || name}
          </div>
          <div className="text-gray-700">
            Amount: <span className="font-bold text-green-600">₹{amount}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} barCategoryGap="20%">
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#875cf5" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#cfbefb" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey={data[0]?.date ? "date" : "month"}
            tick={{ fontSize: 13, fill: "#7c3aed" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 13, fill: "#7c3aed" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            radius={[16, 16, 0, 0]}
            fill="url(#barGradient)"
            barSize={36}
            animationDuration={800}
          >
            <LabelList
              dataKey="amount"
              position="top"
              style={{ fill: "#7c3aed", fontWeight: "bold", fontSize: 13 }}
              formatter={(value) => `₹${value}`}
            />
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
