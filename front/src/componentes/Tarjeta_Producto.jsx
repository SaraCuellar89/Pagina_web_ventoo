import React from "react";
import '../componentes/css/Tarjeta_Producto.css'
import img_1 from '../img/foto_prueba.jpg'
import { Link } from "react-router-dom";

const Tarjeta_Producto = ({id_producto, img_prodcuto, titulo_producto, precio_producto, texto_tarjeta, ruta_tarjeta}) => {
    return(
        <div className="contenedor_tarjeta_producto">
            <img src={img_prodcuto} alt="" />

            <div>
                <p>{titulo_producto}</p>
                <p>${precio_producto}</p>
            </div>

            <Link to={`${ruta_tarjeta}/${id_producto}`}>{texto_tarjeta}</Link>
        </div>
    )
}

export default Tarjeta_Producto