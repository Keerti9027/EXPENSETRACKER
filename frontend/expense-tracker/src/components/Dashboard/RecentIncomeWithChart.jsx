import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>
      <div className="mb-3 text-sm text-green-700 font-semibold">Showing last 60 days of income</div>
      <div className="mb-4 max-h-40 overflow-y-auto">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700 text-xs">{item.date ? new Date(item.date).toLocaleDateString() : ''}</span>
              <span className="text-gray-900 font-medium">₹{item.amount}</span>
              <span className="text-gray-500 text-xs">{item.source || item.note || ''}</span>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-xs">No income in the last 60 days.</div>
        )}
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;