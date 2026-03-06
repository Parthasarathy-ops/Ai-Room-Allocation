export interface Student {
    id: number;
    yearOfStudy: number;
    preferredRoomType: 'AC' | 'Non-AC';
    preferredSharing: number;
    medicalNeeds: 'none' | 'low' | 'high';
    department?: string;
}

export interface Room {
    id: number;
    roomNumber: string;
    floor: number;
    type: 'AC' | 'Non-AC';
    capacity: number;
    currentOccupancy: number;
    isGroundFloor: boolean;
    hasLift: boolean;
    occupants?: any[];
}

export class AIEngine {
    static calculateScore(student: Student, room: Room): number {
        let score = 0;

        // 1. Medical Priority (30%)
        if (student.medicalNeeds === 'high') {
            if (room.isGroundFloor) score += 30;
            else if (room.hasLift) score += 15;
        } else {
            score += 30; // Default if no special medical needs
        }

        // 2. Year & Department Alignment (35%)
        if (room.occupants && room.occupants.length > 0) {
            const sameYearCount = room.occupants.filter(occ => occ.yearOfStudy === student.yearOfStudy).length;
            const sameDeptCount = room.occupants.filter(occ => occ.department && student.department && occ.department === student.department).length;

            score += (sameYearCount / room.occupants.length) * 20;
            score += (sameDeptCount / room.occupants.length) * 15;
        } else {
            score += 35; // Perfect for base start
        }

        // 3. Facility Matching (20%)
        if (student.preferredRoomType === room.type) score += 20;

        // 4. Sharing Optimization (15%)
        if (student.preferredSharing === room.capacity) score += 15;

        return Math.min(score, 100);
    }

    static findBestRoom(student: Student, rooms: Room[]) {
        const availableRooms = rooms.filter(r => r.currentOccupancy < r.capacity);

        const scoredRooms = availableRooms.map(room => ({
            room,
            score: this.calculateScore(student, room)
        }));

        // Sort by score descending, then tie-break by lowest current occupancy, then lowest floor
        scoredRooms.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (a.room.currentOccupancy !== b.room.currentOccupancy) return a.room.currentOccupancy - b.room.currentOccupancy;
            return a.room.floor - b.room.floor;
        });

        return scoredRooms.length > 0 ? { room: scoredRooms[0].room, score: scoredRooms[0].score } : { room: null, score: -1 };
    }
}
