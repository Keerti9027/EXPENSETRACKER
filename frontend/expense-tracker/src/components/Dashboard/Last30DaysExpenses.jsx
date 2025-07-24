import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({data}) => {
    const [charData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        return () => {};
    }, [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between mb-2">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>
            <div className="mb-3 text-sm text-primary font-semibold">Showing last 30 days of expenses</div>
            <div className="mb-4 max-h-40 overflow-y-auto">
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div key={item._id} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                            <span className="text-gray-700 text-xs">{item.date ? new Date(item.date).toLocaleDateString() : ''}</span>
                            <span className="text-gray-900 font-medium">₹{item.amount}</span>
                            <span className="text-gray-500 text-xs">{item.category || item.note || ''}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-400 text-xs">No expenses in the last 30 days.</div>
                )}
            </div>
            <CustomBarChart data={charData} />
        </div>
    )
}

export default Last30DaysExpenses;