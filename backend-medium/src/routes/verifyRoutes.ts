import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

export const verifyRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// verifyRoutes.post('/' , async (c) => {
//     const body = await c.req.json();
//     try{

//     const res = await verify(body.token , c.env.JWT_SECRET)
//     console.log("res is ",res)
//     c.status(200)
//     return c.json({
//         message : "Success"
//     })
//     }
//     catch(err){
//         c.status(401)
//         return c.json({
//             message : "Invalid token"
//         })
//     }

// })

verifyRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
}).$extends(withAccelerate())
  try {
    const token = c.req.header("Authorization")?.slice(7) || "";
    console.log("token is ",token);
    const userId = body.userId;
    const decodedtoken = await decode(token);
    console.log(decodedtoken.payload);
    if (decodedtoken.payload === userId) {
      c.status(200);
      return c.json({
        message: "User is the admin of the post",
        user : decodedtoken.payload
      });
    } else {
      c.status(403);
      return c.json({
        message: "User is not the admin of the post",
      });
    }
  } catch (err) {
    c.status(403)
    return c.json({
      err,
    });
  }
});
