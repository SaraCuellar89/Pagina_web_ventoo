import React from "react";
import '../componentes/css/Mas_Del_Vendedor.css'
import Tarjeta_Producto from "./Tarjeta_Producto";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Mas_Del_Vendedor = ({productos_vendedor}) => {
    return(
        <div className="contenedor_mas_del_vendedor">
            <p>Mas del Vendedor</p>

            <div>
                {productos_vendedor.length === 0 || !productos_vendedor?
                (
                    <p>No hay productos</p>
                ) : 
                (
                    <>
                        {productos_vendedor.map((p) => (
                            <Tarjeta_Producto
                                key={p.Id_producto}
                                id_producto={p.Id_producto}
                                img_prodcuto={p.Imagen}
                                titulo_producto={p.Nombre}
                                precio_producto={p.Precio}
                                texto_tarjeta={'Ver'}
                                ruta_tarjeta={'/Ver_Informacion_Producto'}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Mas_Del_Vendedor