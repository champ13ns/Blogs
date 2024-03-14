import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const verifyRoutes = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET : string
	}
}>();

verifyRoutes.post('/' , async (c) => {
    const body = await c.req.json();
    try{
     
    const res = await verify(body.token , c.env.JWT_SECRET)
    console.log("res is ",res)
    c.status(200)
    return c.json({
        message : "Success"
    })    
    }
    catch(err){ 
        c.status(401)
        return c.json({
            message : "Invalid token"
        })
    }
   
})