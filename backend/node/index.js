const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ===================== CONFIG =====================
const JWT_SECRET = "1234";  // cámbialo en producción
const app = express();

app.use(cors({
    origin: "*",      // React Web + React Native
    credentials: false
}));

app.use(express.json());

// ===================== BD =====================
const db = mysql.createPool({
    host: "mysql-base1cine.alwaysdata.net",
    user: "base1cine_admin",
    password: "contrasena_1234",
    database: "base1cine_ventoo",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ===================== MIDDLEWARE JWT =====================
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ success: false, message: "Token faltante" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json({ success: false, message: "Token inválido o expirado" });

        req.usuario = decoded;
        next();
    });
};

// ===================== REGISTRO =====================
app.post("/registro", async (req, res) => {
    const { nombre, email, telefono, contrasena, rol } = req.body;

    try {
        const checkEmailQuery = `SELECT * FROM usuario WHERE Email = ?`;
        db.query(checkEmailQuery, [email], async (err, results) => {
            if (err) {
                console.error("Error BD:", err);
                return res.status(500).json({ success: false, msg: "Error en la BD" });
            }

            if (results.length > 0) {
                return res.status(400).json({ success: false, msg: "El email ya está registrado" });
            }

            const hash = await bcrypt.hash(contrasena, 10);

            const sql = `
                INSERT INTO usuario (Nombre, Email, Telefono, Contrasena, Tipo_cliente)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(sql, [nombre, email, telefono, hash, rol], (err, result) => {
                if (err) {
                    console.error("Error BD:", err);
                    return res.status(500).json({ success: false, msg: "Error en la BD" });
                }

                res.json({ success: true, msg: "Usuario registrado" });
            });
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, msg: "Error interno" });
    }
});

// ===================== LOGIN =====================
app.post("/login", (req, res) => {
    const { email, contrasena } = req.body;

    db.query("SELECT * FROM usuario WHERE Email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Error servidor" });
        if (results.length === 0) return res.status(401).json({ error: "Usuario no registrado" });

        const usuario = results[0];
        const contraseñaIngresada = contrasena.trim();

        let hash = usuario.Contrasena;
        if (hash.startsWith("$2y$")) hash = "$2a$" + hash.slice(4);

        const match = await bcrypt.compare(contraseñaIngresada, hash);
        if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

        const token = jwt.sign(
            {
                Id_usuario: usuario.Id_usuario,
                Nombre: usuario.Nombre,
                Email: usuario.Email,
                Rol: usuario.Tipo_cliente 
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            usuario: {
                Id_usuario: usuario.Id_usuario,
                Nombre: usuario.Nombre,
                Email: usuario.Email,
                Rol: usuario.Tipo_cliente
            },
            token
        });
    });
});

// ===================== USUARIO LOGUEADO =====================
app.get("/usuario_logueado", verificarToken, (req, res) => {
    res.json({ success: true, usuario: req.usuario });
});

// ===================== PRODUCTOS =====================
app.get("/productos", (req, res) => {
    const query = "SELECT * FROM producto ORDER BY Fecha_publicacion DESC";

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false });

        const productos = results.map(p => p);

        res.json({ success: true, productos });
    });
});

// ===================== REGISTRAR PRODUCTO =====================
app.post("/registrar_producto", verificarToken, (req, res) => {
    const { titulo, descripcion, precio, imagen, categoria } = req.body;

    const query = `
        INSERT INTO producto (Nombre, Descripcion, Precio, Imagen, Fecha_publicacion, Id_categoria, Id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const fecha = new Date().toISOString().slice(0, 10);

    db.query(
        query,
        [titulo, descripcion, precio, imagen, fecha, categoria, req.usuario.Id_usuario],
        (err, result) => {
            if (err) return res.status(500).json({ success: false });

            res.json({ success: true, idProducto: result.insertId });
        }
    );
});

// ===================== PRODUCTO EDITAR =====================
app.get("/producto_id/:id", verificarToken, (req, res) => {
    const idProducto = req.params.id;

    const query = `
        SELECT * 
        FROM producto
        WHERE Id_producto = ? AND Id_usuario = ?
        LIMIT 1
    `;

    db.query(query, [idProducto, req.usuario.Id_usuario], (err, results) => {
        if (err || results.length === 0) {
            return res.json({ success: false, message: "Producto no encontrado" });
        }

        const producto = results[0];

        res.json({ success: true, producto });
    });
});

// ===================== EDITAR PRODUCTO =====================
app.put("/editar_producto/:id", verificarToken, (req, res) => {
    const idProducto = req.params.id;
    const { titulo, descripcion, precio, imagen } = req.body;

    const query = `
        UPDATE producto 
        SET Nombre = ?, Descripcion = ?, Precio = ?, Imagen = ?
        WHERE Id_producto = ?
    `;

    db.query(query, [titulo, descripcion, precio, imagen.trim(), idProducto], (err) => {
        if (err) return res.status(500).json({ success: false });

        res.json({ success: true, message: "Producto actualizado" });
    });
});

// ===================== ELIMINAR PRODUCTO =====================
app.delete("/eliminar_producto/:id", verificarToken, (req, res) => {
    const idProducto = req.params.id;

    const query = `
        DELETE FROM producto
        WHERE Id_producto = ? AND Id_usuario = ?
    `;

    db.query(query, [idProducto, req.usuario.Id_usuario], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Error al eliminar producto" });

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Producto no encontrado o no autorizado" });
        }

        res.json({ success: true, message: "Producto eliminado correctamente" });
    });
});

// ===================== CATEGORIAS =====================
app.get("/categorias", (req, res) => {
    db.query("SELECT * FROM categoria ORDER BY Nombre_categoria", (err, results) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true, categorias: results });
    });
});

// ===================== PRODUCTO + VENDEDOR =====================
app.get("/producto/:id", (req, res) => {
    const id = req.params.id;

    const queryProducto = `
        SELECT p.*, u.Id_usuario AS IdVendedor, u.Nombre AS NombreVendedor, u.Imagen AS FotoVendedor
        FROM producto p
        LEFT JOIN usuario u ON u.Id_usuario = p.Id_usuario
        WHERE p.Id_producto = ?
        LIMIT 1
    `;

    db.query(queryProducto, [id], (err, result) => {
        if (err || result.length === 0)
            return res.json({ success: false, message: "Producto no encontrado" });

        const producto = result[0];

        const queryMas = `
            SELECT * FROM producto
            WHERE Id_usuario = ? AND Id_producto != ?
            ORDER BY Fecha_publicacion DESC
            LIMIT 4
        `;

        db.query(queryMas, [producto.IdVendedor, id], (err2, mas) => {
            if (err2) {
                return res.json({ success: false, message: "Error al obtener más productos" });
            }

            const productosNorm = mas.map(p => ({
                ...p,
                Imagen: p.Imagen
            }));

            res.json({
                success: true,
                producto,
                masDelVendedor: productosNorm
            });
        });
    });
});

// ===================== PRODUCTOS DEL VENDEDOR =====================
app.get("/productos_vendedor", verificarToken, (req, res) => {
    const query = `
        SELECT * FROM producto
        WHERE Id_usuario = ?
        ORDER BY Fecha_publicacion DESC
    `;

    db.query(query, [req.usuario.Id_usuario], (err, results) => {
        if (err) return res.status(500).json({ success: false });

        const productos = results.map(p => ({
            ...p,
            Imagen: p.Imagen
        }));

        res.json({ success: true, productos });
    });
});

// ===================== CARRITO =====================
app.post("/carrito/agregar", verificarToken, (req, res) => {
    const Id_usuario = req.usuario.Id_usuario;
    const { Id_producto, Cantidad } = req.body;

    const fecha = new Date().toISOString().slice(0, 10);

    const buscar = `SELECT * FROM carrito WHERE Id_usuario = ? AND Id_producto = ?`;

    db.query(buscar, [Id_usuario, Id_producto], (err, result) => {
        if (err) return res.json({ success: false });

        if (result.length > 0) {
            const actualizar = `
                UPDATE carrito
                SET Cantidad = Cantidad + ?
                WHERE Id_usuario = ? AND Id_producto = ?
            `;
            db.query(actualizar, [Cantidad, Id_usuario, Id_producto]);
            return res.json({ success: true, message: "Cantidad actualizada" });
        }

        const insertar = `
            INSERT INTO carrito (Id_usuario, Id_producto, Fecha_agregado, Cantidad)
            VALUES (?, ?, ?, ?)
        `;

        db.query(insertar, [Id_usuario, Id_producto, fecha, Cantidad]);
        return res.json({ success: true, message: "Agregado al carrito" });
    });
});

// ===================== OBTENER CARRITO =====================
app.get("/carrito", verificarToken, (req, res) => {
    const query = `
        SELECT c.Cantidad,
               p.Id_producto, p.Nombre, p.Precio, p.Imagen, p.Descripcion
        FROM carrito c
        INNER JOIN producto p ON p.Id_producto = c.Id_producto
        WHERE c.Id_usuario = ?
    `;

    db.query(query, [req.usuario.Id_usuario], (err, results) => {
        if (err) return res.json({ success: false });
        res.json({ success: true, carrito: results });
    });
});

// ===================== VACIAR CARRITO =====================
app.delete("/vaciar_carrito", verificarToken, (req, res) => {
    const sql = `DELETE FROM carrito WHERE Id_usuario = ?`;

    db.query(sql, [req.usuario.Id_usuario], (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true, message: "Carrito vaciado" });
    });
});

// ===================== ELIMINAR PRODUCTO DEL CARRITO =====================
app.delete("/carrito/eliminar/:idProducto", verificarToken, (req, res) => {
    const sql = `DELETE FROM carrito WHERE Id_usuario = ? AND Id_producto = ?`;

    db.query(sql, [req.usuario.Id_usuario, req.params.idProducto], (err) => {
        if (err) return res.json({ success: false });
        res.json({ success: true });
    });
});

// ===================== CREAR PEDIDO =====================
app.post("/crear_pedido", verificarToken, (req, res) => {
    const idUsuario = req.usuario.Id_usuario;
    const { direccion, metodoPago, total, productos } = req.body;

    if (!productos || productos.length === 0) {
        return res.json({ success: false, message: "El pedido no tiene productos." });
    }

    const fecha = new Date().toISOString().slice(0, 10);

    const sqlPedido = `
        INSERT INTO pedido (Direccion_envio, Fecha_pedido, Metodo_pago, Estado_pedido, Total, Id_usuario)
        VALUES (?, ?, ?, 'Pendiente', ?, ?)
    `;

    db.query(sqlPedido, [direccion, fecha, metodoPago, total, idUsuario], (err, result) => {
        if (err) {
            console.log("ERROR SQL (Pedido):", err);
            return res.json({ success: false, error: err });
        }

        const idPedido = result.insertId;

        const sqlDetalle = `
            INSERT INTO pedido_detalle (Id_pedido, Id_producto, Cantidad, Precio)
            VALUES ?
        `;

        const valores = productos.map(p => [
            idPedido,
            p.Id_producto,
            p.Cantidad,
            p.Precio
        ]);

        db.query(sqlDetalle, [valores], (err2) => {
            if (err2) {
                console.log("ERROR SQL (Detalle):", err2);
                return res.json({ success: false, error: err2 });
            }

            res.json({
                success: true,
                message: "Pedido creado con éxito.",
                idPedido
            });
        });
    });
});

// ===================== PEDIDOS CLIENTE =====================
app.get("/pedidos_cliente", verificarToken, (req, res) => {
    const sql = `
        SELECT Id_pedido, Fecha_pedido, Total, Estado_pedido
        FROM pedido
        WHERE Id_usuario = ?
        ORDER BY Fecha_pedido DESC
    `;

    db.query(sql, [req.usuario.Id_usuario], (err, results) => {
        if (err) return res.json({ success: false });
        res.json({ success: true, pedidos: results });
    });
});

// ===================== PEDIDO DETALLADO =====================
app.get("/pedido/:idPedido", verificarToken, (req, res) => {
    const idPedido = req.params.idPedido;

    const sqlPedido = `SELECT * FROM pedido WHERE Id_pedido = ? AND Id_usuario = ?`;

    db.query(sqlPedido, [idPedido, req.usuario.Id_usuario], (err, pedidoResult) => {
        if (err) return res.status(500).json({ success: false });

        if (pedidoResult.length === 0)
            return res.status(404).json({ success: false, message: "Pedido no encontrado" });

        const sqlProductos = `
            SELECT pd.Id_producto, pd.Cantidad, pd.Precio,
                   p.Nombre, p.Descripcion, p.Imagen
            FROM pedido_detalle pd
            INNER JOIN producto p ON p.Id_producto = pd.Id_producto
            WHERE pd.Id_pedido = ?
        `;

        db.query(sqlProductos, [idPedido], (err2, productosResult) => {
            if (err2) return res.status(500).json({ success: false });

            res.json({
                success: true,
                pedido: pedidoResult[0],
                productos: productosResult
            });
        });
    });
});

// ===================== RESEÑAS =====================
app.get("/resenas/:idProducto", (req, res) => {
    const sql = `
        SELECT r.*, u.Nombre AS NombreUsuario, u.Imagen AS FotoUsuario
        FROM resena r
        INNER JOIN usuario u ON u.Id_usuario = r.Id_usuario
        WHERE r.Id_producto = ?
        ORDER BY r.Fecha_resena DESC
    `;

    db.query(sql, [req.params.idProducto], (err, result) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true, resenas: result });
    });
});

// ===================== SUBIR RESEÑA =====================
app.post("/resena", verificarToken, (req, res) => {
    const { Id_producto, Comentario, Estrellas } = req.body;

    const sql = `
        INSERT INTO resena (Id_producto, Id_usuario, Comentario, Estrellas)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [Id_producto, req.usuario.Id_usuario, Comentario, Estrellas], (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

// ===================== EDITAR RESEÑA =====================
app.put("/resena/:idResena", verificarToken, (req, res) => {
    const { Comentario, Estrellas } = req.body;

    const sql = `
        UPDATE resena
        SET Comentario = ?, Estrellas = ?
        WHERE Id_resena = ? AND Id_usuario = ?
    `;

    db.query(sql, [Comentario, Estrellas, req.params.idResena, req.usuario.Id_usuario], (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

// ===================== ELIMINAR RESEÑA =====================
app.delete("/resena/:idResena", verificarToken, (req, res) => {
    const sql = `
        DELETE FROM resena
        WHERE Id_resena = ? AND Id_usuario = ?
    `;

    db.query(sql, [req.params.idResena, req.usuario.Id_usuario], (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});




// ===================== FILTROS =====================
// ===== Filtrar por categoria =====
app.post('/filtrar_categoria', (req, res) => {
    try {
        const { id_categoria } = req.body;

        if (!id_categoria) {
            return res.status(400).json({
                success: false,
                message: "Debes enviar id_categoria"
            });
        }

        const query = `
            SELECT p.*, c.Nombre_categoria 
            FROM producto p
            JOIN categoria c ON p.Id_categoria = c.Id_categoria
            WHERE p.Id_categoria = ?
        `;

        db.query(query, [id_categoria], (err, results) => {
            if (err) {
                console.error("Error BD:", err);
                return res.status(500).json({ success: false, message: "Error al filtrar productos" });
            }

            res.json({
                success: true,
                productos: results
            });
        });
    } catch (error) {
        console.log('Error: ' + error);
        res.status(500).json({
            success: false,
            message: 'No se pudo filtrar'
        });
    }
});


// ===== Filtrar productos por precio =====
app.post('/filtrar_precio', (req, res) => {
    try {
        const { orden } = req.body;

        // Validar orden, por defecto ASC
        const ordenSQL = orden === 'desc' ? 'DESC' : 'ASC';

        const query = `
            SELECT p.*, c.Nombre_categoria
            FROM producto p
            JOIN categoria c ON p.Id_categoria = c.Id_categoria
            ORDER BY p.Precio ${ordenSQL}
        `;

        db.query(query, (err, results) => {
            if (err) {
                console.error("Error BD:", err);
                return res.status(500).json({ success: false, message: "Error al filtrar productos" });
            }

            res.json({
                success: true,
                productos: results
            });
        });
    } catch (error) {
        console.log('Error: ' + error);
        res.status(500).json({
            success: false,
            message: 'No se pudo filtrar'
        });
    }
});


// ===== Buscar productos por nombre =====
app.post('/buscar_nombre', (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: "Debes enviar un nombre para buscar"
            });
        }

        const query = `
            SELECT p.*, c.Nombre_categoria
            FROM producto p
            JOIN categoria c ON p.Id_categoria = c.Id_categoria
            WHERE p.Nombre LIKE ?
        `;

        // Usamos % para buscar coincidencias parciales
        const nombreBusqueda = `%${nombre}%`;

        db.query(query, [nombreBusqueda], (err, results) => {
            if (err) {
                console.error("Error BD:", err);
                return res.status(500).json({
                    success: false,
                    message: "Error al buscar productos"
                });
            }

            res.json({
                success: true,
                productos: results
            });
        });
    } catch (error) {
        console.log('Error: ' + error);
        res.status(500).json({
            success: false,
            message: 'No se pudo buscar'
        });
    }
});



// ===================== PUERTO =====================
app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
});