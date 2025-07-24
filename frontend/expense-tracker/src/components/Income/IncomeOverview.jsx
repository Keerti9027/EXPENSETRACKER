import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import CustomPieChart from "../Charts/CustomPieChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const IncomeOverview = ({transactions, onAddIncome}) => {
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const totalIncome = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);

    useEffect(() => {
        setBarChartData(prepareIncomeBarChartData(transactions));
        setPieChartData(
            transactions.reduce((acc, curr) => {
                const existing = acc.find(item => item.name === curr.source);
                if (existing) {
                    existing.amount += Number(curr.amount);
                } else {
                    acc.push({ name: curr.source, amount: Number(curr.amount) });
                }
                return acc;
            }, [])
        );
        return () => {};
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <div>
                    <h5 className="text-2xl font-bold text-primary mb-1">Income Overview</h5>
                    <p className="text-sm text-gray-500">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button className="add-btn add-btn-fill flex items-center gap-2 px-4 py-2 text-base mt-2 md:mt-0" onClick={onAddIncome}>
                    <LuPlus className="text-lg" /> Add Income
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                    <CustomBarChart data={barChartData} />
                </div>
                <div>
                    <CustomPieChart
                        data={pieChartData}
                        label="Total Income"
                        totalAmount={`₹{totalIncome}`}
                        showTextAnchor
                        colors={COLORS}
                    />
                </div>
            </div>
        </div>
    );
}
 
export default IncomeOverview;