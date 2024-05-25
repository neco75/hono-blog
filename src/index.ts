import { Hono } from 'hono'
import posts from './blogs/blogs'

const app = new Hono()
app.route('/posts', posts);

app.get('/', (c) => {
  return c.text('neco-blog-api')
})

export default app
