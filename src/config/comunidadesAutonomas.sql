
USE productos_regionales;

-- Comunidades
INSERT INTO community (name) VALUES
('Canarias'),
('Castilla y León'),
('Cataluña');

-- Categorías
INSERT INTO category (name) VALUES
('Bebidas'),
('Productos'),
('Platos');

-- Canarias
INSERT INTO elementos (comunidad_id, categoria_id, nombre) VALUES
(1, 1, 'Ron miel'),
(1, 1, 'Vino malvasía'),
(1, 1, 'Barraquito'),
(1, 2, 'Plátano canario'),
(1, 2, 'Mojo picón'),
(1, 2, 'Gofio'),
(1, 3, 'Papas arrugadas'),
(1, 3, 'Sancocho canario'),
(1, 3, 'Ropa vieja canaria');

-- Castilla y León
INSERT INTO elementos (comunidad_id, categoria_id, nombre) VALUES
(2, 1, 'Ribera del Duero'),
(2, 1, 'Vino de Toro'),
(2, 1, 'Licor de guindas'),
(2, 2, 'Morcilla de Burgos'),
(2, 2, 'Botillo del Bierzo'),
(2, 2, 'Garbanzos de Fuentesaúco'),
(2, 3, 'Lechazo asado'),
(2, 3, 'Sopa castellana'),
(2, 3, 'Judiones de La Granja');

-- Cataluña
INSERT INTO elementos (comunidad_id, categoria_id, nombre) VALUES
(3, 1, 'Cava'),
(3, 1, 'Ratafía'),
(3, 1, 'Estrella Damm'),
(3, 2, 'Fuet'),
(3, 2, 'Calçots'),
(3, 2, 'Pa de pagès'),
(3, 3, 'Escudella i carn d''olla'),
(3, 3, 'Pa amb tomàquet'),
(3, 3, 'Suquet de peix');