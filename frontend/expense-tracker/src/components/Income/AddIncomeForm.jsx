import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopUp from "../layouts/EmojiPickerPopUp";

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
        note: "",
    });

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });
    return (
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg p-8 w-full max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-green-700 text-center mb-8">Add New Income</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <EmojiPickerPopUp
                        icon={income.icon}
                        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
                    />
                </div>
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                        value={income.source}
                        onChange={({ target }) => handleChange("source", target.value)}
                        label="Income Source"
                        placeholder="Freelance, Salary, etc"
                        type="text"
                    />
                    <Input 
                        value={income.amount}
                        onChange={({ target }) => handleChange("amount", target.value)}
                        label="Amount"
                        placeholder=""
                        type="number"
                    />
                    <Input 
                        value={income.date}
                        onChange={({ target }) => handleChange("date", target.value)}
                        label="Date"
                        placeholder=""
                        type="date"
                        className="md:col-span-2"
                    />
                    <Input
                        value={income.note}
                        onChange={({ target }) => handleChange("note", target.value)}
                        label="Note (optional)"
                        placeholder="e.g. Salary for July, Freelance project, etc."
                        type="text"
                        className="md:col-span-2"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-10">
                <button
                    type="button"
                    className="btn-primary w-full md:w-auto px-10 py-3 text-lg"
                    onClick={()=>onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm;