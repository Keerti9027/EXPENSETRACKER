import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomerLineChart from "../Charts/CustomerLineChart";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#FA2C37", "#FF6900", "#875CF5", "#4f39f6"];

const ExpenseOverview = ({transactions, onExpenseIncome}) => {
    const [lineChartData, setLineChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const totalExpense = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);

    useEffect(() => {
        setLineChartData(prepareExpenseBarChartData(transactions));
        setPieChartData(
            transactions.reduce((acc, curr) => {
                const existing = acc.find(item => item.name === curr.category);
                if (existing) {
                    existing.amount += Number(curr.amount);
                } else {
                    acc.push({ name: curr.category, amount: Number(curr.amount) });
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
                    <h5 className="text-2xl font-bold text-primary mb-1">Expense Overview</h5>
                    <p className="text-sm text-gray-500">
                        Track your spending trends over time and gain insights into where your money goes.
                    </p>
                </div>
                <button className="add-btn add-btn-fill flex items-center gap-2 px-4 py-2 text-base mt-2 md:mt-0" onClick={onExpenseIncome}>
                    <LuPlus className="text-lg" /> Add Expense
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                    <CustomerLineChart data={lineChartData} />
                </div>
                <div>
                    <CustomPieChart
                        data={pieChartData}
                        label="Total Expense"
                        totalAmount={`₹{totalExpense}`}
                        showTextAnchor
                        colors={COLORS}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExpenseOverview;