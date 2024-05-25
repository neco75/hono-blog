import { Hono } from 'hono'

const app = new Hono()

type Post = {
    id: string
    title: string
    content: string
    eyeCatch: string
    category: string
    createdAt: string
    updatedAt: string
  }
  
  let posts: Post[] = []

  // create a new post
app.post('/',async (c) => {
    const { title, content, eyeCatch, category } = await c.req.json<{
      title: string
      content: string
      eyeCatch: string
      category: string
    }>();
    const newPost: Post = {
      id: Math.random().toString(36).slice(-8),
      title,
      content,
      eyeCatch,
      category,
      createdAt: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
      updatedAt: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
    }
    posts.push(newPost)
    return c.json(newPost)
  })
  
  // read all posts
  app.get('/', (c) => {
    return c.json(posts)
  })
  
  // read a post
  app.get('/:id', (c) => {
    const id = c.req.param('id')
    const post = posts.find((p) => p.id === id)
    if (post){
      return c.json(post)
    }else{
      return c.json({message: 'Post not found'}, 404)
    }
  })
  
  // update a post
  app.put('/:id', async (c) => {
    const id = c.req.param('id')
    const { title, content, eyeCatch, category } = await c.req.json<{
      title: string
      content: string
      eyeCatch: string
      category: string
    }>();
    const post = posts.find((p) => p.id === id)
    if (post){
      post.title = title
      post.content = content
      post.eyeCatch = eyeCatch
      post.category = category
      post.updatedAt = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
      return c.json(post)
    }else{
      return c.json({message: 'Post not found'}, 404)
    }
  })
  
  // delete a post
  app.delete('/:id', (c) => {
    const id = c.req.param('id')
    const post = posts.find((p) => p.id === id)
    if (post){
      posts = posts.filter((p) => p.id !== id)
      return c.json({message: 'Post deleted'})
    }else{
      return c.json({message: 'Post not found'}, 404)
    }
  })

export default app