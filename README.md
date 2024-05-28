typescriptフレームワークHonoを使ったBlogのApiを作成。DBはCloudflare Workers D1を使用。

開発メモ

2024/5/27
お試しとして配列でブログ内容を管理していたところを、cloudflare D1を使用して管理できるようにコードを書き換えている。ただ、APIが正常なレスポンスしなくなった。悲しい。以下エラー。

```
✘ [ERROR] TypeError: Cannot read properties of undefined (reading 'prepare')

      at null.<anonymous>
  (file:///Users/sagararikuto/programming/Hono/hono-blog/src/blogs/blogs.ts:40:23)
      at async dispatch
  (file:///Users/sagararikuto/programming/Hono/hono-blog/node_modules/hono/dist/compose.js:29:17)
      at async cors2
  (file:///Users/sagararikuto/programming/Hono/hono-blog/node_modules/hono/dist/middleware/cors/index.js:65:5)
      at async dispatch
  (file:///Users/sagararikuto/programming/Hono/hono-blog/node_modules/hono/dist/compose.js:29:17)
      at null.<anonymous> (async
  file:///Users/sagararikuto/programming/Hono/hono-blog/.wrangler/tmp/dev-hONz2G/index.js:890:25)
      at async jsonError
  (file:///Users/sagararikuto/programming/Hono/hono-blog/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts:22:10)
      at async drainBody
  (file:///Users/sagararikuto/programming/Hono/hono-blog/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts:5:10)

```

一旦開発やめてcloudflare D1の使い方勉強する必要あり。ちなみにローカル環境でwrangler d1 execute blog --local --command='SELECT * FROM Blogs;'とやるとDBはできてるっぽい。
.tomlとblogs.tsで指しているDBの名称が異なっていたため修正したがそれでも結果変わらす。

2024/5/28
テーブル名間違ってただけだった…とりあえずDBを使用した基本的なCRUD操作が実装できた。

```
npm install
npm run dev
```

```
npm run deploy
```
