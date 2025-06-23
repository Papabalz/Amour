import { relations } from 'drizzle-orm';
import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	nationality: text('nationality'),
	created_At: text('created_at').default(new Date().toISOString()),
	updated_At: text('updated_at').default(new Date().toISOString()),
});

export const userRelation = relations(user, ({ one }) => ({

	booking: one(booking),
	transaction: one(transaction)
}))

export const booking = pgTable('booking', {

	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	guideType: text('guide_type').notNull(),
	arriveDate: text('arrive_date').notNull(),
	departDate: text('depart_date').notNull(),
	guests: integer('guests').notNull(),
	status: text('status').default('pending'),
	vehicle: text('vehicle'),
	isPaid: text('is_paid').default('false'),
	created_At: text('created_at').default(new Date().toISOString()),
	updated_At: text('updated_at').default(new Date().toISOString()),
});

export const bookingRelation = relations(booking, ({ one }) => ({
	user: one(user),
	transaction: one(transaction)
}));

export const transaction = pgTable('transaction', {
	id: serial('id').primaryKey(),
	bookingId: integer('booking_id')
		.notNull()
		.references(() => booking.id, { onDelete: 'cascade' }),
		userId: integer('user_id').notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	amount: integer('amount').notNull(),
	status: text('status').default('pending'),
	created_At: text('created_at').default(new Date().toISOString()),
	updated_At: text('updated_at').default(new Date().toISOString()),
});

export const transactionRelation = relations(transaction, ({ one }) => ({
	booking: one(booking),
	user: one(user)
}));