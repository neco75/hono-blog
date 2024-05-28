import { Hono } from 'hono'
import posts from './blogs/blogs'

const app = new Hono()
app.route('/posts', posts);

app.get('/', (c) => {
  return c.json({ message: 'Welcome to Hono' })
})

export default app;
