import * as dotenv from 'dotenv';
dotenv.config();
import { db } from './src/db';
import { rooms } from './src/db/schema';

async function seedRooms() {
    console.log('--- Initializing Room Data ---');
    const roomEntries = [];

    for (let i = 1; i <= 200; i++) {
        const floor = Math.ceil(i / 40);
        const type = i % 2 === 0 ? 'AC' : 'Non-AC';
        const capacity = i % 3 === 0 ? 4 : 3;
        const isGround = floor === 1;
        const hasLift = true;

        roomEntries.push({
            roomNumber: i.toString(),
            floor,
            type: type as 'AC' | 'Non-AC',
            capacity,
            currentOccupancy: 0,
            hasLift,
            isGroundFloor: isGround
        });
    }

    try {
        await db.insert(rooms).values(roomEntries).onConflictDoNothing();
        console.log('✓ Successfully seeded 200 rooms.');
    } catch (err) {
        console.error('⨯ Error seeding rooms:', err);
    }
    process.exit(0);
}

seedRooms();
