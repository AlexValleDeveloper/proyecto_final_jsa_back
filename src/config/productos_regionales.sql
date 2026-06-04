-- Base de datos: productos_regionales
-- Proyecto: E-commerce de productos regionales españoles (poyecto_final_jsa)

CREATE DATABASE productos_regionales;

USE productos_regionales;

-- -----------------------------------------------------
-- Tablas de catálogo (sin dependencias)
-- -----------------------------------------------------

CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL
);

CREATE TABLE community (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Usuarios
-- -----------------------------------------------------

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(45) NOT NULL UNIQUE,
  name VARCHAR(45) NOT NULL,
  birth_date DATE NOT NULL,
  password VARCHAR(120) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  address VARCHAR(250),
  phone VARCHAR(20),
  validated TINYINT NOT NULL,
  active TINYINT NOT NULL DEFAULT 1
);

-- -----------------------------------------------------
-- Productos
-- -----------------------------------------------------

CREATE TABLE item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(250) NOT NULL,
  status TINYINT NOT NULL DEFAULT 1,
  category_id INT NOT NULL,
  community_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(id),
  FOREIGN KEY (community_id) REFERENCES community(id)
);

-- -----------------------------------------------------
-- Recetas
-- -----------------------------------------------------

CREATE TABLE recipe (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  instructions TEXT NOT NULL,
  category_id INT NOT NULL,
  community_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(id),
  FOREIGN KEY (community_id) REFERENCES community(id)
);

-- -----------------------------------------------------
-- Carrito
-- -----------------------------------------------------

CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE cart_item (
  cart_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  PRIMARY KEY (cart_id, item_id),
  FOREIGN KEY (cart_id) REFERENCES cart(id),
  FOREIGN KEY (item_id) REFERENCES item(id)
);

-- -----------------------------------------------------
-- Pedidos
-- -----------------------------------------------------

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status ENUM('pending', 'processing', 'shipped') NOT NULL DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  shipping_date DATE,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE orders_item (
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, item_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES item(id)
);
