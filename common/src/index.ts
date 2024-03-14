import {z} from 'zod'

const SignUpInput = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string().min(5),
    name : z.string()
})

export type signUpInput = z.infer<typeof SignUpInput>

const LoginInput =z.object({
    email : z.string().email(),
    password : z.string()
})

export type LoginInput = z.infer<typeof LoginInput>

const BlogInput = z.object({
    title : z.string(),
    content : z.string(),
    authorId : z.string(),
})

export type blogInput = z.infer<typeof BlogInput>

const UpdateBlog = z.object({
    title : z.string(),
    content : z.string(),
    authorId : z.string(),
})
 
export type UpdateBlogInput = z.infer<typeof UpdateBlog>