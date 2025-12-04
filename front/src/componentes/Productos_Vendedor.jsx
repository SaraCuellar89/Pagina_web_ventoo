import React from "react";
import '../componentes/css/Productos_Vendedor.css'
import Tarjeta_Producto from "./Tarjeta_Producto";

const Productos_Vendedor = ({productos, Eliminar_Producto}) => {
    return(
        <div className="contenedor_productos_vendedor">
            <p>Tus Productos</p>

            <div>
                {productos.length === 0 ?
                (
                    <p>No hay productos</p>
                ) : 
                (
                    <>
                        {productos.map((p) => (
                            <div key={p.Id_producto}>
                                <Tarjeta_Producto
                                    id_producto={p.Id_producto}
                                    img_prodcuto={p.Imagen}
                                    titulo_producto={p.Nombre}
                                    precio_producto={p.Precio}
                                    texto_tarjeta={'Editar'}
                                    ruta_tarjeta={'/Editar_Producto'}
                                />
                                <button onClick={() => Eliminar_Producto(p.Id_producto)}>Eliminar</button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Productos_Vendedor