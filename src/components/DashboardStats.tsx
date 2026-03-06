'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const StatsCard = ({ title, value, unit, icon: Icon, colorClass }: { title: string; value: number | string; unit?: string; icon: any; colorClass: string }) => {
    return (
        <div className={`glass-card relative overflow-hidden group`}>
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500`}>
                <Icon size={80} className={colorClass} />
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="text-xs uppercase tracking-widest text-[#888] font-bold">{title}</h4>
                <div className={`text-4xl font-bold flex items-baseline gap-1 ${colorClass}`}>
                    {value} <span className="text-sm font-normal text-white/40">{unit}</span>
                </div>
            </div>
        </div>
    );
};

export const CompatibilityChart = () => {
    const data = {
        labels: ['Excellent (90%+)', 'High (70-90%)', 'Moderate (50-70%)', 'Low (<50%)'],
        datasets: [{
            label: 'Matches',
            data: [42, 120, 25, 13],
            backgroundColor: ['#00f2ff', '#b200ff', '#ff007f', '#ff003c'],
            borderColor: 'transparent',
            borderRadius: 8,
        }]
    };

    const options = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888' } },
            x: { grid: { display: false }, ticks: { color: '#888' } }
        }
    };

    return (
        <div className="glass-card">
            <h3 className="neon-text-purple mb-6 text-xl uppercase tracking-widest font-bold">Matching Compatibility</h3>
            <Bar data={data} options={options} />
        </div>
    );
};
