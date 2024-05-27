DROP TABLE IF EXISTS Blogs;
CREATE TABLE IF NOT EXISTS Blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    eyeCatch TEXT NOT NULL,
    category TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);

INSERT INTO Blogs (id, title, content, eyeCatch, category, createdAt, updatedAt) VALUES
    ('1', 'タイトル1', '内容1', 'アイキャッチ1', 'カテゴリ1', '2021-01-01 00:00:00', '2021-01-01 00:00:00'),
    ('2', 'タイトル2', '内容2', 'アイキャッチ2', 'カテゴリ2', '2021-01-02 00:00:00', '2021-01-02 00:00:00'),
    ('3', 'タイトル3', '内容3', 'アイキャッチ3', 'カテゴリ3', '2021-01-03 00:00:00', '2021-01-03 00:00:00');
