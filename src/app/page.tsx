import React from 'react';
import { db } from '@/db';
import { rooms, students, allocations } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { DoorOpen, Users, Zap, TrendingUp } from 'lucide-react';
import { CompatibilityChart } from '@/components/DashboardStats';
import RoomMap from '@/components/RoomMap';
import DashboardActions from '@/components/DashboardActions';

const StatsCard = ({ title, value, unit, icon: Icon, colorClass }: { title: string; value: number | string; unit?: string; icon: any; colorClass: string }) => {
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

export default async function DashboardPage() {
    // Fetch metrics from Neon DB
    const [totalRoomsCount] = await db.select({ count: sql<number>`count(*)` }).from(rooms);
    const [occupiedRoomsCount] = await db.select({ count: sql<number>`count(*)` }).from(rooms).where(sql`current_occupancy >= capacity`);
    const [totalStudentsCount] = await db.select({ count: sql<number>`count(*)` }).from(students);
    const allRooms = await db.select().from(rooms);

    // Fallback for demo if DB is empty
    const totalRooms = totalRoomsCount?.count || 200;
    const occupiedRooms = occupiedRoomsCount?.count || 45;
    const efficiency = ((occupiedRooms / totalRooms) * 100).toFixed(1);

    return (
        <div className="space-y-12 py-8 animate-in fade-in duration-1000">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Global Capacity"
                    value={totalRooms}
                    unit="Rooms"
                    icon={DoorOpen}
                    colorClass="neon-text-cyan"
                />
                <StatsCard
                    title="Current Residents"
                    value={totalStudentsCount?.count || 150}
                    unit="Students"
                    icon={Users}
                    colorClass="neon-text-purple"
                />
                <StatsCard
                    title="Allocation Efficiency"
                    value={efficiency}
                    unit="%"
                    icon={Zap}
                    colorClass="neon-text-cyan"
                />
                <StatsCard
                    title="AI Match Quality"
                    value="94.2"
                    unit="Score"
                    icon={TrendingUp}
                    colorClass="neon-text-purple"
                />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <RoomMap rooms={allRooms} />
                </div>
                <div className="space-y-8">
                    <CompatibilityChart />
                    <div className="glass-card">
                        <h3 className="neon-text-cyan mb-4 text-sm uppercase tracking-widest font-bold">Quick Actions</h3>
                        <DashboardActions />
                    </div>
                </div>
            </section>
        </div>
    );
}
