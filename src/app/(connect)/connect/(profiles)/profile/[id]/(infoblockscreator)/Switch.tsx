"use client"
import React from 'react';

const Switch = ({ click, toggled } : { click: () => void, toggled: boolean }) => {
    return (
        <div className="w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex justify-center">
        <circle onClick={click} className={`${ toggled ? "bg-green-500/40 dark:bg-green-500 translate-x-4" : "bg-red-800/40 dark:bg-red-600 -translate-x-4"} w-8 rounded-full ease-in-out hover:scale-110 cursor-pointer duration-500 h-8`} />
        </div>
    );
};

export default Switch;