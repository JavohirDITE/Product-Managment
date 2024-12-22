const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Database setup
const db = new sqlite3.Database('./products.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the products database.');
});

// Обновляем структуру таблицы, добавляя поле для изображения
db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  unit TEXT,
  quantity REAL,
  price REAL,
  image_url TEXT
)`);

app.use(express.json());
app.use(express.static('public'));

// Маршруты
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.put('/api/products/:id', (req, res) => {
  const { quantity } = req.body;
  db.run('UPDATE products SET quantity = ? WHERE id = ?', [quantity, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

app.post('/api/products/:id/image', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  db.run('UPDATE products SET image_url = ? WHERE id = ?', [imageUrl, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ imageUrl });
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});