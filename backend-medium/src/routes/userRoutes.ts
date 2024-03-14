import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const userRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET : string
	}
}>();


userRoute.post('/signup' , async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    
    try{
        const user = await prisma.user.create({
            data:{
                email : body.email,
                password : body.password,
                name : body.name
            }
        })
        const payload = user.id
        const token = await sign(payload, c.env.JWT_SECRET)
        c.status(200)
        return c.json({
          message : "Success",
          token : token
        })
    }
   
    catch(err){
        c.status(400)
        return c.json({
          message : "Error",
          user : err
        })  
    }
    
    
  })

userRoute.post('/login', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const email = body.email;
    const password = body.password;
 
    const user = await prisma.user.findUnique({
        where: {
            email : email
        }
        
    })

    if(!user){
        c.status(403)
        return c.json({
            message : "User not registered"
        })
    }
    if(user.password === password){
        const token = await sign(user.id, c.env.JWT_SECRET)
        c.status(200)
        return c.json({
            message : "Sign In Successfull",
            token
        })
    } else{
        c.status(411)
        return c.json({
            message : 'Wrong creds'
        })
    }
    
})
