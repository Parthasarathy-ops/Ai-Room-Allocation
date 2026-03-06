'use client';

import React from 'react';
import { motion } from 'framer-motion';

const RoomMap = ({ rooms }: { rooms: any[] }) => {
    return (
        <div className="glass-card">
            <h3 className="neon-text-cyan mb-6 text-xl uppercase tracking-widest font-bold">Room Allocation Map</h3>
            <div className="grid grid-cols-10 sm:grid-cols-20 gap-2">
                {Array.from({ length: 200 }).map((_, i) => {
                    const roomNum = (i + 1).toString();
                    const room = rooms.find(r => r.roomNumber === roomNum) || { currentOccupancy: 0, capacity: 4 };
                    const isFull = room.currentOccupancy >= room.capacity;

                    return (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.2, zIndex: 10, backgroundColor: isFull ? '#ff003c' : '#00f2ff' }}
                            className={`
                aspect-square rounded-sm text-[8px] flex items-center justify-center cursor-pointer transition-all duration-300
                ${isFull ? 'bg-[#ff003c] shadow-[0_0_8px_#ff003c]' : 'bg-white/5 border border-white/10 hover:shadow-[0_0_12px_#00f2ff]'}
              `}
                            title={`Room ${roomNum}: ${room.currentOccupancy}/${room.capacity}`}
                        >
                            {roomNum}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default RoomMap;
