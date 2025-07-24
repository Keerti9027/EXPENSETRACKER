import React from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

const CustomerLineChart = ({ data }) => {
    const CustomTooltip = ({ active, payload }) => {
        if(active && payload && payload.length){
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.date || payload[0].payload.month}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="text-sm font-medium text-gray-900">₹{payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };
    return <div className="bg-white">
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f56565" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#fff" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey={data[0]?.date ? "date" : "month"} tick={{fontSize:12, fill:"#555" }} stroke="none" />
                <YAxis tick={{fontSize: 12, fill:"#555" }} stroke="none" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#f56565" fill="url(#expenseGradient)" strokeWidth={3} dot={{ r: 5, fill:"#f56565", stroke: "#fff", strokeWidth: 2}} />
            </AreaChart>
        </ResponsiveContainer>
        </div>;
};

export default CustomerLineChart;