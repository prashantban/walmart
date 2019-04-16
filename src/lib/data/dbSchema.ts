export const dbSchema = `

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name VARCHAR(255) NOT NULL

);

CREATE TABLE IF NOT EXISTS orders (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  user_id INTEGER NOT NULL,

  FOREIGN KEY(user_id) REFERENCES users(id)

);

CREATE TABLE IF NOT EXISTS items (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name VARCHAR(255) NOT NULL

);

CREATE TABLE IF NOT EXISTS order_items (

  order_id INTEGER NOT NULL,

  item_id INTEGER NOT NULL,

  FOREIGN KEY (order_id) REFERENCES orders(id),

  FOREIGN KEY (item_id) REFERENCES items(id),

  PRIMARY KEY (order_id, item_id)

);
`;