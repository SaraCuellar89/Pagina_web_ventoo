import React from "react";
import { Link } from "react-router-dom";
import '../componentes/css/Info_Pedido_Cliente.css'
import Tarjeta_Producto from "../componentes/Tarjeta_Producto"
import { useEffect } from "react";
import { useState } from "react";

const Info_Pedido_Cliente = ({productos}) => {
    return(
        <div className="contenedor_info_pedido_cliente">
            <Link to={'/Perfil_Cliente'}>{'<'} Devolverse</Link>

            <div>

                {productos.map((p) => (
                    <div>
                        <Tarjeta_Producto
                            key={p.Id_producto}
                            id_producto={p.Id_producto}
                            img_prodcuto={p.Imagen}
                            titulo_producto={p.Nombre}
                            precio_producto={p.Precio}
                            texto_tarjeta={'Ver'}
                            ruta_tarjeta={'/Ver_Informacion_Producto'}
                        />
                        <p>Cantidad: {p.Cantidad}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Info_Pedido_Cliente