import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
export const userRoute = new Hono();
userRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: body.password,
                name: body.username
            }
        });
        console.log("user is ", user);
        const payload = user.id;
        const token = await sign(payload, c.env.JWT_SECRET);
        return c.json({
            message: "Success",
            user: user,
            token: token
        });
    }
    catch (err) {
        return c.json({
            message: "Success",
            user: err
        });
    }
});
userRoute.post('/login', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const email = body.email;
    const password = body.password;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        c.status(403);
        return c.json({
            message: "User not registered"
        });
    }
    if (user.password === password) {
        const token = await sign(user.id, c.env.JWT_SECRET);
        c.status(200);
        return c.json({
            message: "Sign In Successfull"
        });
    }
    else {
        c.status(411);
        return c.json({
            message: 'Wrong creds'
        });
    }
});
