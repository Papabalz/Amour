import { relations } from 'drizzle-orm';
import { pgTable, serial, integer, text, time } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	phone_number: text('phone_number').notNull(),
	nationality: text('nationality'),
	created_At: text('created_at').default(new Date().toISOString()),
	updated_At: text("updated_at").default(new Date().toISOString()),
});

// userRelation will be defined after booking and transaction are declared

export const booking = pgTable('booking', {	

	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	guideType: text("guide_type").notNull(),
	arriveDate: text('arrive_date').notNull(),
	departDate: text('depart_date').notNull(),
	guests: integer('guests').notNull(),
	status: text('status').default('pending'),
	payment: text('payment').default('pay_later'),
	pickup_location: text('pickup_location').notNull(),
	pickup_time: time('pickup_time'),
	moreInfo: text('more_info'),
	special_requests:  text('special_requests'),
	isPaid: text('is_paid').default('false'),
	created_At: text('created_at').default(new Date().toISOString()),
	updated_At: text('updated_at').default(new Date().toISOString()),
});


export const transaction = pgTable('transaction', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	amount: integer('amount').notNull(),
	currency: text('currency').notNull(),
 paymentMethod: text('payment_method').notNull(),
 transactionId: text('transaction_id').notNull().unique(),
 reference: text('reference').notNull(),
 name: text('name').notNull(),
	email: text('email').notNull(),
 bookingId: integer('booking_id').notNull().unique().references(() => booking.id, { onDelete: 'cascade' }),
	status: text('status').default('pending'),
	created_At: text('created_at').default(new Date().toISOString()),
	updated_At: text('updated_at').default(new Date().toISOString()),
});

export const bookingRelation = relations(booking, ({ one, many }) => ({
	user: one(user, { fields: [booking.userId], references: [user.id] }),
	transaction: one(transaction), // A booking has one transaction
}));

export const transactionRelation = relations(transaction, ({ one }) => ({
	booking: one(booking, { fields: [transaction.bookingId], references: [booking.id] }),
	user: one(user, { fields: [transaction.userId], references: [user.id] })
}));

// Now define userRelation after booking and transaction are declared
export const userRelation = relations(user, ({ many }) => ({
	bookings: many(booking),
	transactions: many(transaction)
}));

// Export types for user, booking, and transaction
export type Booking = typeof booking.$inferSelect;
export type User = typeof user.$inferSelect;
export type Transaction = typeof transaction.$inferSelect;
