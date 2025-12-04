import React, { useState } from "react";
import '../componentes/css/Productos_Cliente_Carrito.css'
import Tarjeta_Producto from "./Tarjeta_Producto";
import { useEffect } from "react";

const Productos_Cliente_Carrito = ({Mostrar_Modal_Pago, productos, Eliminar_Producto_Carrito}) => {

    const [aceptar_permiso, setAceptar_permiso] = useState(false)

    return(
        <div className="contenedor_productos_cliente_carrito">
            <p>Carrito</p>

            <div className="caja_productos_productos_cliente_carrito">
                <div>
                    {productos.length === 0 || !productos?
                    (
                        <p>No hay productos</p>
                    ) : 
                    (
                        <>
                            {productos.map((p) => {
                                const subtotal = Number(p.Precio) * Number(p.Cantidad); 
                                return(
                                    <div key={p.Id_producto}>
                                        <Tarjeta_Producto
                                            id_producto={p.Id_producto}
                                            img_prodcuto={p.Imagen}
                                            titulo_producto={p.Nombre}
                                            precio_producto={p.Precio}
                                            texto_tarjeta={'Ver'}
                                            ruta_tarjeta={'/Ver_Informacion_Producto'}
                                        />
                                        <p>Cantidad: {p.Cantidad}</p>
                                        <p>Subtotal: ${subtotal.toLocaleString()}</p>
                                        <button onClick={() => Eliminar_Producto_Carrito(p.Id_producto)}>Eliminar</button>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>

                {productos.length === 0 ? 
                (
                    null
                ) : 
                (
                    <div>
                        <input id="aceptar_condiciones" type="checkbox" checked={aceptar_permiso} onChange={(e) => setAceptar_permiso(e.target.checked)}/>
                        <label htmlFor="aceptar_condiciones">¿Aceptas que no puedes cancelar el pedido una vez realizado?</label>
                    </div>
                )}
            </div>

            {productos.length === 0 ? 
            (
                null
            ) : 
            (
                <>
                    {aceptar_permiso === false ? 
                    (
                        <button className="boton_desactivado">Comprar</button>
                    ) : 
                    (
                        <button onClick={Mostrar_Modal_Pago}>Comprar</button>
                    )}
                </>
            )}
        </div>
    )
}

export default Productos_Cliente_Carrito