import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, json, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { createSession } from '$lib/server/session';
import { sendWelcomeEmail } from '$lib/email/mailer';


export const createUser = async ({ request }: { request: Request }) => {

    const formData = await request.formData();
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const phone_number = formData.get('phone_number') as string;
    const nationality = formData.get('nationality') as string;

    const existingUser = await db.select().from(user).where(eq(user.email, email));

    if (!name ) return fail(400, { message: 'Name is required', success: false });
    if (!email) return fail(400, { message: 'Email is required', success: false });
    if (!password) return fail(400, { message: 'Password is required', success: false });
    if (!confirmPassword) return fail(400, { message: 'Confirm password is required', success: false });


    if (existingUser.length > 0) {
        return fail( 400,{ message: 'User already exists', success: false });
    }

    if (password !== confirmPassword) {
        return fail(400, { message: 'Passwords do not match', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {

        await db.insert(user).values({email, name, password: hashedPassword, nationality, phone_number});

        // Send welcome email
        await sendWelcomeEmail({ name, email });

        return { message: 'User created successfully', status: 302, success: true };
        
    } catch (error) {
        console.error('Error creating user:', error);
        return fail(400, {message: 'Failed to create user', success: false});
        
    }

};

export const loginUser = async ({request, cookie}: {request: any, cookie: any}) => {

    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) return fail(400, { message: 'Email is required', success: false });
    if (!password) return fail(400, { message: 'Password is required', success: false });


    const foundUser = await db.select().from(user).where(eq(user.email, email));

    if (!foundUser || foundUser.length === 0) {
        return fail(400, { message: 'User not found', success: false });
    }   

    const isPasswordValid =  await bcrypt.compare(password, foundUser[0]?.password);
    if (!isPasswordValid) {
        return fail(400, { message: 'Invalid credentials', success: false });
    }

    createSession(cookie, {id: foundUser[0]?.id, email: foundUser[0]?.email, name: foundUser[0]?.name  });
    // console.log('User logged in successfully:', foundUser);

    try {
        

        if (foundUser[0]?.id) {
            return { message: 'User logged in successfully', status: 302, success: true };
            
        } else {
            return fail(400, { message: 'Invalid email or password', success: false });
        }

    } catch (error) {
        console.error('Error logging in user:', error);
        return fail(400, { message: 'Failed to login user', success: false });
    }

};

export const getUser = async ({ userId }: { userId: number }) => {
    try {
        const foundUser = await db.select().from(user).where(eq(user.id, userId));

        if (!foundUser || foundUser.length === 0) {
            return fail(400, { message: 'User not found', success: false });
        }

        return { user: foundUser[0], status: 200, success: true };

    } catch (error) {
        // console.error('Error fetching user:', error);
        return fail(400, { message: 'Failed to fetch user', success: false });
    }
};

export const updateUser = async ({ request, userId }: { request: Request, userId: number }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone_number = formData.get('phone_number') as string;
    const nationality = formData.get('nationality') as string;

await db.update(user)
    .set({
        name,
        email,
        phone_number,
        nationality
    })
    .where(eq(user.id, userId));
   

    return { message: 'User updated successfully', status: 200, success: true };
};