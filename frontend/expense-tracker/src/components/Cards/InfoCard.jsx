import React from 'react';

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200/50 w-full max-w-full overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl`}
    >
      <div className={`w-14 h-14 flex items-center justify-center text-[28px] text-white ${color} rounded-full drop-shadow-xl shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[15px] text-gray-500 font-medium">{label}</span>
        <span className="text-[22px] font-bold text-gray-900">₹{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
