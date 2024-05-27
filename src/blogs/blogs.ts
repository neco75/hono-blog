import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

type Post = {
    id: string
    title: string
    content: string
    eyeCatch: string
    category: string
    createdAt: string
    updatedAt: string
  }

// CORS
app.use(cors())

// create a new post
app.post('/', async (c) => {
  try {
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
    await c.env.DB.prepare("INSERT INTO posts (id, title, content, eyeCatch, category, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(newPost.id, newPost.title, newPost.content, newPost.eyeCatch, newPost.category, newPost.createdAt, newPost.updatedAt).run();
    return c.json(newPost, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create post', details: error }, 500)
  }
})

// read all posts
app.get('/', async (c) => {
  try{
    let postsJson = await c.env.DB.prepare("SELECT * FROM posts").all()
    return c.json(postsJson)
  } catch (e) {
    return c.json({ message: 'Posts not found' }, 404)
  }
})

// read a post
app.get('/:id', async (c) => {
  const id = c.req.param('id')
  const postJson = await c.env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).run();
  if (postJson) {
    return c.json(postJson)
  } else {
    return c.json({ message: 'Post not found' }, 404)
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
  const postJson = await c.env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).run();
  if (postJson) {
    await c.env.DB.prepare("UPDATE posts SET title = ?, content = ?, eyeCatch = ?, category = ?, updatedAt = ? WHERE id = ?").bind(title, content, eyeCatch, category, new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }), id).run();
    return c.json({ message: 'Post updated' })
  } else {
    return c.json({ message: 'Post not found' }, 404)
  }
})

// delete a post
app.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const postJson = await c.env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).run();
  if (postJson) {
    await c.env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
    return c.json({ message: 'Post deleted' })
  } else {
    return c.json({ message: 'Post not found' }, 404)
  }
})

export default app