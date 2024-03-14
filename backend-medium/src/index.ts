import { Hono } from 'hono'
import { userRoute } from './routes/userRoutes';
import { blogRoutes } from './routes/blogRoutes';
import { cors } from 'hono/cors';
import { verifyRoutes } from './routes/verifyRoutes';

const app = new Hono();

app.use(cors())

app.route('/api/v1/user', userRoute)
app.route('/api/v1/blogs' , blogRoutes)
app.route('/api/v1/verifyUser' , verifyRoutes)
export default app