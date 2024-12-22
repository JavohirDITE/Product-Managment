const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./products.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Подключено к базе данных products.');
});

const products = [
  { name: 'Terraplex™ 1185 x 585 х20mm | 0,69кв.м теплоизоляционная плита (Uzbekistan)', unit: 'шт', quantity: 32, price: 0.98 },
  { name: 'Izolyuks™ 3 x 1000mm пароизоляция в рулоне (Uzbekistan)', unit: 'метр', quantity: 22, price: 0.29 },
  { name: 'lammin™ ⌀16 x 2,0mm | Tmax=95°C труба для теплого пола (Turkey)', unit: 'пог. метр', quantity: 1000, price: 0.38 },
  { name: 'Якорная скоба под такерa', unit: 'шт', quantity: 2500, price: 0.02 },
  { name: '600| L=1800mm | TYPE-22 | P=9Bar | Tmax=120°C панельный радиатор | боковое подключение — 1/2"', unit: 'шт', quantity: 4, price: 140.00 },
  { name: '600| L=1200mm | TYPE-22 | P=9Bar | Tmax=120°C панельный радиатор | боковое подключение — 1/2"', unit: 'шт', quantity: 1, price: 95.00 },
  { name: '600| L=600mm | TYPE-22 | P=9Bar | Tmax=120°C панельный радиатор | боковое подключение — 1/2"', unit: 'шт', quantity: 1, price: 58.00 },
  { name: '600| L=800mm | TYPE-22 | P=9Bar | Tmax=120°C панельный радиатор | боковое подключение — 1/2"', unit: 'шт', quantity: 3, price: 69.00 },
  { name: 'Kas™ PN10 | 1" (DN25) | ⌀16 х 2,0mm | 7 контуров коллектор лучевой развязки | вентиль (Turkey)', unit: 'шт', quantity: 4, price: 36.00 },
  { name: 'Kas™ PN10 | 1" (DN25) | ⌀16 х 2,0mm | 8 контуров коллектор лучевой развязки | вентиль (Turkey)', unit: 'шт', quantity: 4, price: 42.00 },
  { name: 'Kas™ PN10 | 1" (DN25) | ⌀16 х 2,0mm | 5 контуров коллектор лучевой развязки | вентиль (Turkey)', unit: 'шт', quantity: 2, price: 26.00 },
  { name: 'Kas™ 1" кронштейн для коллектора серии ECO (Turkey)', unit: 'шт', quantity: 10, price: 1.50 },
  { name: 'Kas™ PN40 1" (DN25) | ВР-НР (разъемное соединение Сальником) водопроводный шаровой кран | "бабочка" (Turkey)', unit: 'шт', quantity: 6, price: 11.33 },
  { name: 'Kas™ 1/2" | ВР-НР радиаторный кран | угловой — подача (Turkey)', unit: 'шт', quantity: 18, price: 4.50 },
  { name: 'Kas™ ⌀32mm x 1" | НР муфта комбинированная (Turkey)', unit: 'шт', quantity: 8, price: 2.24 },
  { name: 'Kas™ ⌀32mm x 1" | ВР муфта комбинированная (Turkey)', unit: 'шт', quantity: 4, price: 1.62 },
  { name: 'Kas™ ⌀25mm x 1/2" | НР муфта комбинированная (Turkey)', unit: 'шт', quantity: 20, price: 1.08 },
  { name: 'Kas™ PN20 | ⌀25 x 3,5mm | Tmax=90°C труба композитная ГВС и отопления (Turkey)', unit: 'пог. метр', quantity: 78, price: 1.18 },
  { name: 'Kas™ PN20 | ⌀32 x 4,4mm | Tmax=90°C труба композитная ГВС и отопления (Turkey)', unit: 'пог. метр', quantity: 88, price: 2.05 },
  { name: 'Kas™ ⌀25mm муфта соединительная (Turkey)', unit: 'шт', quantity: 20, price: 0.12 },
  { name: 'Kas™ ⌀32mm муфта соединительная (Turkey)', unit: 'шт', quantity: 30, price: 0.20 },
  { name: 'Kas™ ⌀32mm отвод 90° (Turkey)', unit: 'шт', quantity: 80, price: 0.33 },
  { name: 'Kas™ ⌀32mm отвод 45° (Turkey)', unit: 'шт', quantity: 30, price: 0.30 },
  { name: 'Kas™ ⌀32mm обвод муфтовый короткий (Turkey)', unit: 'шт', quantity: 20, price: 1.13 },
  { name: 'Kas™ ⌀32mm тройник (Turkey)', unit: 'шт', quantity: 30, price: 0.42 },
  { name: 'Kas™ ⌀32 x 20 x 32mm тройник переходной (Turkey)', unit: 'шт', quantity: 6, price: 0.37 },
  { name: 'Kas™ ⌀32 x 25 x 32mm тройник переходной (Turkey)', unit: 'шт', quantity: 30, price: 0.39 },
  { name: 'Kas™ ⌀25mm отвод 90° (Turkey)', unit: 'шт', quantity: 80, price: 0.18 },
  { name: 'Kas™ ⌀25mm отвод 45° (Turkey)', unit: 'шт', quantity: 30, price: 0.15 },
  { name: 'Kas™ ⌀25mm муфта соединительная (Turkey)', unit: 'шт', quantity: 30, price: 0.12 },
  { name: 'Kas™ ⌀32 x 25mm муфта переходная (Turkey)', unit: 'шт', quantity: 30, price: 0.14 },
  { name: 'Tetroflon™ - фум лента', unit: 'шт', quantity: 2, price: 0.88 },
  { name: 'Ostendorf™ ⌀110mm | Tmax=95°C отвод 45° для внутренней канализации (Germany)', unit: 'шт', quantity: 20, price: 0.97 },
  { name: 'Ostendorf™ ⌀110mm | Tmax=95°C отвод 87° для внутренней канализации (Germany)', unit: 'шт', quantity: 4, price: 0.98 },
  { name: 'Ostendorf™ ⌀110mm | Tmax=95°C тройник 45° для внутренней канализации (Germany)', unit: 'шт', quantity: 3, price: 1.85 },
  { name: 'Ostendorf™ ⌀110 x 50mm | Tmax=95°C тройник 45° для внутренней канализации (Germany)', unit: 'шт', quantity: 6, price: 2.16 },
  { name: 'Ostendorf™ ⌀110mm | Tmax=95°C тройник 87° для внутренней канализации (Germany)', unit: 'шт', quantity: 1, price: 1.76 },
  { name: 'Ostendorf™ ⌀50mm | Tmax=95°C отвод 45° для внутренней канализации (Germany)', unit: 'шт', quantity: 20, price: 0.31 },
  { name: 'Ostendorf™ ⌀50mm | Tmax=95°C отвод 87° для внутренней канализации (Germany)', unit: 'шт', quantity: 20, price: 0.31 },
  { name: 'Ostendorf™ ⌀110 x 50mm | Tmax=95°C переход эксцентрический для внутренней канализации (Germany)', unit: 'шт', quantity: 5, price: 0.70 },
  { name: 'Ostendorf™ ⌀110 x 75mm | Tmax=95°C переход эксцентрический для внутренней канализации (Germany)', unit: 'шт', quantity: 1, price: 1.80 },
  { name: 'Ostendorf™ ⌀75mm | Tmax=95°C отвод 45° для внутренней канализации (Germany)', unit: 'шт', quantity: 2, price: 1.40 },
  { name: 'Ostendorf™ ⌀75mm | Tmax=95°C отвод 87° для внутренней канализации (Germany)', unit: 'шт', quantity: 2, price: 1.45 },
  { name: 'Ostendorf™ ⌀50 x 1,8mm | L=250mm | Tmax=95°C труба для внутренней канализации (Germany)', unit: 'шт', quantity: 10, price: 0.51 },
  { name: 'Ostendorf™ ⌀50 x 1,8mm | L=500mm | Tmax=95°C труба для внутренней канализации (Germany)', unit: 'шт', quantity: 10, price: 0.80 },
  { name: 'Ostendorf™ ⌀50 x 1,8mm | L=1000mm | Tmax=95°C труба для внутренней канализации (Germany)', unit: 'шт', quantity: 3, price: 1.23 },
  { name: 'Ostendorf™ ⌀75 x 1,8mm | L=1000mm | Tmax=95°C труба для внутренней канализации (Germany)', unit: 'шт', quantity: 1, price: 4.00 },
  { name: 'Ostendorf™ ⌀110 x 2,7mm | L=250mm | Tmax=95°C труба для внутренней канализации (Germany)', unit: 'шт', quantity: 4, price: 1.17 },
  { name: 'Ostendorf™ ⌀110 x 2,7mm | L=500mm | Tmax=95°C труба для внутренней канализации (Germany)', unit: 'шт', quantity: 3, price: 1.92 },
  { name: 'Ostendorf™ ⌀110 x 2,7mm | L=1000mm | Tmax=95°C труба для внутренней канализации (Germany)', unit: 'шт', quantity: 3, price: 3.46 },
  { name: 'Ostendorf™ ⌀110 x 2,7mm | L=2000mm | Tmax=95°C труба для внутренней канализации (Germany)', unit: 'шт', quantity: 1, price: 6.51 },
  { name: 'Ostendorf™ ⌀110 x 2,7mm | L=3000mm | Tmax=95°C труба для внутренней канализации (Germany)', unit: 'шт', quantity: 5, price: 9.33 },
  { name: 'Ostendorf™ ⌀110mm | Tmax=95°C ревизия для внутренней канализации (Germany)', unit: 'шт', quantity: 1, price: 2.82 },
  { name: 'Ostendorf™ | V=250ml смазка для труб и фитингов канализации (Germany)', unit: 'шт', quantity: 1, price: 3.20 }
];

const insertProduct = (product) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO products (name, unit, quantity, price) VALUES (?, ?, ?, ?)', 
      [product.name, product.unit, product.quantity, product.price], 
      function(err) {
        if (err) {
          reject(err);
        } else {
          console.log(`Строка добавлена с rowid ${this.lastID}`);
          resolve();
        }
      }
    );
  });
};

const insertAllProducts = async () => {
  for (const product of products) {
    try {
      await insertProduct(product);
    } catch (err) {
      console.error('Ошибка при добавлении продукта:', err.message);
    }
  }
  
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Соединение с базой данных закрыто.');
  });
};

insertAllProducts();