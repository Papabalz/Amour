import { relations } from 'drizzle-orm';
import { pgTable, serial, integer, text, time } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	phone_number: text('phone_number'),
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
	name: text('name').notNull(),
	email: text('email').notNull(),
	country: text('country').notNull(),
	phone: text('phone').notNull(),
	location: text('location').notNull(),
	numberOfDays: integer('number_of_days').notNull(),
	adults: integer('adults').notNull(),
	childrenAges: text('children_ages'),
	travelDate: text('travel_date').notNull(),
	pickup_location: text('pickup_location').notNull(),
	status: text('status').default('pending'),
	isPaid: text('is_paid').default('false'),
	payment: text('payment').default('pay_on_arrival'),
	special_requests: text('special_requests'),
	moreInfo: text('more_info'),
	created_At: text('created_at').default(new Date().toISOString()),
	updated_At: text('updated_at').default(new Date().toISOString()),
});


export const transaction = pgTable('transaction', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	amount: integer('amount').notNull(),
	currency: text('currency'),
 paymentMethod: text('payment_method'),
 transactionId: text('transaction_id').notNull().unique(),
 reference: text('reference').notNull(),
 name: text('name'),
	email: text('email'),
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
