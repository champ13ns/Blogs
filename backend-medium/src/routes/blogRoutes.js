/*
GET    /getBlog/:id ->
PUT    /updateBlog /:id
POST   /createBlog
DELETE  /deleteBlog/:id
GET     /allBlogs

*/
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
export const blogRoutes = new Hono();
blogRoutes.use('/*', async (c, next) => {
    const header = c.req.header('Authorization') || "";
    const token_str = header?.slice(7);
    console.log(token_str);
    const res = await verify(token_str, c.env.JWT_SECRET);
    if (res) {
        c.set("userId", res.id);
        await next();
    }
    else {
        c.status(403);
        c.json({
            message: "Not-authorized"
        });
        return;
    }
});
blogRoutes.get('/allBlogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const allBlogs = await prisma.post.findMany({
            where: {}
        });
        console.log(allBlogs);
        c.status(200);
        return c.json({
            allBlogs
        });
    }
    catch (err) {
        console.log('Error while fteching ', err);
        return c.json({
            err
        });
    }
});
blogRoutes.put('/blog/:id', async (c) => {
    const body = await c.req.json();
    const id = c.req.param("id");
    console.log("id is ", id);
    if (!id) {
        c.status(403);
        c.json({
            message: "Invalid id"
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const updatedBlog = await prisma.post.update({
            where: {
                id: id
            }, data: {
                content: body?.content,
                title: body?.title
            }
        });
        c.status(200);
        c.json({
            message: "Successfully Updated"
        });
    }
    catch (err) {
        c.status(403);
        c.json({
            message: "invalid"
        });
    }
});
blogRoutes.get('/blog/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blog = await prisma.post.findMany({
        where: {
            id: id
        }
    });
    if (!blog || blog.length == 0) {
        c.status(400);
        return c.json({
            message: "Blog not found"
        });
    }
    else {
        c.status(200);
        return c.json({
            message: "Success",
            blog
        });
    }
});
blogRoutes.delete('/blog/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const res = await prisma.post.delete({
            where: {
                id: id
            }
        });
        c.status(200);
        c.json({
            message: "Deleted Successfully"
        });
    }
    catch (err) {
        c.status(200);
        return c.json({
            message: "Error while deleting",
        });
    }
});
blogRoutes.post('/createBlog', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const title = body.title;
    const content = body.content;
    const authorId = body.authorId;
    const newPost = await prisma.post.create({
        data: {
            title: title,
            content: content,
            authorId: authorId,
        }
    });
    return c.json({
        message: "Success",
        newPost
    });
});
