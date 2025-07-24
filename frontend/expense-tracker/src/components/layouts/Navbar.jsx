import React, { useState, useContext } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuWalletMinimal } from "react-icons/lu";
import SideMenu from "./SideMenu";
import { UserContext } from '../../context/UserContext';

const FILTER_OPTIONS = [
    { label: 'Last 1 Day', value: '1d' },
    { label: 'Last 1 Week', value: '1w' },
    { label: 'Last 1 Month', value: '1m' },
    { label: 'Last 1 Year', value: '1y' },
];

const Navbar = ({activeMenu, onExpenseFilterChange, onIncomeFilterChange, selectedExpenseFilter, selectedIncomeFilter}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { user } = useContext(UserContext);
    return (
        <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-4">
                <button 
                    className="block lg:hidden text-black" onClick={() => {
                        setOpenSideMenu(!openSideMenu);
                    }}
                >
                    {openSideMenu ? (
                        <HiOutlineX className="text-2xl" />
                    ) : (
                        <HiOutlineMenu className="text-2xl" />
                    )}
                </button>
                <span className="flex items-center gap-2 text-primary font-extrabold text-2xl tracking-tight">
                    <LuWalletMinimal className="text-2xl mr-1" />
                    Expense Tracker
                </span>
            </div>
            <div className="flex items-center gap-6">
                {/* Removed income and expense filter dropdowns as requested */}
                {user && (
                    <span className="text-base font-medium text-gray-700 bg-purple-50 px-4 py-2 rounded-full shadow-sm">
                        Welcome, {user.fullName}
                    </span>
                )}
            </div>
            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
}

export default Navbar;