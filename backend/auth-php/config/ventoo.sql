CREATE DATABASE ventoo DEFAULT CHARACTER SET utf8mb4;
USE ventoo;

-- =====================================
--         CATEGORIA
-- =====================================
CREATE TABLE Categoria (
    Id_categoria INT(6) NOT NULL AUTO_INCREMENT,
    Nombre_categoria VARCHAR(30) NOT NULL,
    PRIMARY KEY (Id_categoria)
);

-- =====================================
--         USUARIO
-- =====================================
CREATE TABLE Usuario (
    Id_usuario INT(6) NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(30) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    Tipo_cliente VARCHAR(15) NOT NULL,
    Imagen VARCHAR(255) DEFAULT 'default.png',
    PRIMARY KEY (Id_usuario)
);

-- =====================================
--         PEDIDO
-- =====================================
CREATE TABLE Pedido (
    Id_pedido INT(6) NOT NULL AUTO_INCREMENT,
    Direccion_envio VARCHAR(50) NOT NULL,
    Fecha_pedido DATE NOT NULL,
    Metodo_pago VARCHAR(15) NOT NULL,
    Estado_pedido VARCHAR(15) NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    Id_usuario INT(6) NOT NULL,
    PRIMARY KEY (Id_pedido),
    CONSTRAINT fk_pedido_usuario
        FOREIGN KEY (Id_usuario) REFERENCES Usuario(Id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- =====================================
--         PRODUCTO
-- =====================================
CREATE TABLE Producto (
    Id_producto INT(6) NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Imagen MEDIUMTEXT NOT NULL,
    Fecha_publicacion DATE NOT NULL,
    Id_categoria INT(6) NOT NULL,
    Id_usuario INT(6) NOT NULL,
    PRIMARY KEY (Id_producto),
    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (Id_categoria) REFERENCES Categoria(Id_categoria)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_producto_usuario
        FOREIGN KEY (Id_usuario) REFERENCES Usuario(Id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- =====================================
--         PEDIDO_DETALLE
-- =====================================
CREATE TABLE Pedido_Detalle (
    Id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    Id_pedido INT(6) NOT NULL,
    Id_producto INT(6) NOT NULL,
    Cantidad INT(10) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_pedido
        FOREIGN KEY (Id_pedido) REFERENCES Pedido(Id_pedido)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (Id_producto) REFERENCES Producto(Id_producto)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- =====================================
--         CARRITO (USUARIO_PRODUCTO)
-- =====================================
CREATE TABLE Carrito (
    Id_usuario INT(6) NOT NULL,
    Id_producto INT(6) NOT NULL,
    Fecha_agregado DATE NOT NULL,
    Cantidad INT(10) NOT NULL,
    PRIMARY KEY (Id_usuario, Id_producto),
    CONSTRAINT fk_carrito_usuario
        FOREIGN KEY (Id_usuario) REFERENCES Usuario(Id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_carrito_producto
        FOREIGN KEY (Id_producto) REFERENCES Producto(Id_producto)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- =====================================
--         RESEÑAS
-- =====================================
CREATE TABLE Resena (
    Id_resena INT AUTO_INCREMENT PRIMARY KEY,
    Id_producto INT(6) NOT NULL,
    Id_usuario INT(6) NOT NULL,
    Comentario VARCHAR(255) NOT NULL,
    Estrellas INT NOT NULL CHECK (Estrellas BETWEEN 1 AND 5),
    Fecha_resena DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resena_producto
        FOREIGN KEY (Id_producto) REFERENCES Producto(Id_producto)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_resena_usuario
        FOREIGN KEY (Id_usuario) REFERENCES Usuario(Id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- =====================================
--         CATEGORÍAS BASE
-- =====================================
INSERT INTO Categoria (Nombre_categoria) VALUES
('Ropa'),
('Calzado'),
('Electrónica'),
('Hogar'),
('Cocina'),
('Belleza y Cuidado Personal'),
('Juguetes'),
('Deportes'),
('Mascotas'),
('Accesorios'),
('Herramientas'),
('Libros'),
('Oficina'),
('Salud'),
('Arte y Manualidades');