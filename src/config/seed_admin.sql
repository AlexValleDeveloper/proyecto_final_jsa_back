-- Base de datos: productos_regionales
-- Proyecto: E-commerce de productos regionales españoles (poyecto_final_jsa)

USE productos_regionales;
-- -----------------------------------------------------
-- DATOS SEMILLA DEL ADMIN
-- -----------------------------------------------------

INSERT INTO user (email, name, birth_date, password, role, validated, active)
VALUES (
  'admin@productosregionales.com',
  'Admin',
  '1990-01-01',
  '$2b$10$ieMeUmxgSrbXWgL1yU4RAeGh4YBmrjNkF80zho6eLQtvKgkFPHqyK',
  'admin',
  1,
  1
);

-- 
-- La contraseña hasheada en texto plano es: admin1234
-- 