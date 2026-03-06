import { pgTable, serial, text, varchar, integer, timestamp, boolean, pgEnum, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const roleEnum = pgEnum('role', ['admin', 'student']);
export const medicalEnum = pgEnum('medical_needs', ['none', 'low', 'high']);
export const roomTypeEnum = pgEnum('room_type', ['AC', 'Non-AC']);

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 50 }).notNull().unique(),
    password: text('password').notNull(),
    role: roleEnum('role').default('student').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const students = pgTable('students', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 100 }).notNull(),
    regNo: varchar('reg_no', { length: 20 }).notNull().unique(),
    school: varchar('school', { length: 100 }),
    department: varchar('department', { length: 100 }),
    yearOfStudy: integer('year_of_study'),
    medicalNeeds: medicalEnum('medical_needs').default('none'),
    language: varchar('language', { length: 50 }),
    preferredRoomType: roomTypeEnum('preferred_room_type'),
    preferredSharing: integer('preferred_sharing'), // 3 or 4
});

export const rooms = pgTable('rooms', {
    id: serial('id').primaryKey(),
    roomNumber: varchar('room_number', { length: 10 }).notNull().unique(),
    floor: integer('floor'),
    type: roomTypeEnum('type'),
    capacity: integer('capacity'),
    currentOccupancy: integer('current_occupancy').default(0),
    hasLift: boolean('has_lift').default(false),
    isGroundFloor: boolean('is_ground_floor').default(false),
});

export const allocations = pgTable('allocations', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id, { onDelete: 'cascade' }).unique(),
    roomId: integer('room_id').references(() => rooms.id, { onDelete: 'cascade' }),
    allocationDate: timestamp('allocation_date').defaultNow(),
    compatibilityScore: decimal('compatibility_score', { precision: 5, scale: 2 }),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
    student: one(students, {
        fields: [users.id],
        references: [students.userId],
    }),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
    user: one(users, {
        fields: [students.userId],
        references: [users.id],
    }),
    allocations: many(allocations),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
    allocations: many(allocations),
}));

export const allocationsRelations = relations(allocations, ({ one }) => ({
    student: one(students, {
        fields: [allocations.studentId],
        references: [students.id],
    }),
    room: one(rooms, {
        fields: [allocations.roomId],
        references: [rooms.id],
    }),
}));
