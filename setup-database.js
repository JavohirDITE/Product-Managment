const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create the database file if it doesn't exist
const dbPath = path.join(process.cwd(), 'products.db');
console.log('Создание базы данных:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Ошибка открытия базы данных:', err.message);
    return;
  }
  console.log('База данных успешно создана и подключена.');

  // Create the products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    unit TEXT NOT NULL,
    quantity REAL DEFAULT 0,
    price REAL DEFAULT 0,
    image_url TEXT
  )`, (err) => {
    if (err) {
      console.error('Ошибка создания таблицы:', err.message);
      return;
    }
    console.log('Таблица products успешно создана.');

    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error('Ошибка закрытия базы данных:', err.message);
        return;
      }
      console.log('Соединение с базой данных закрыто.');
    });
  });
});