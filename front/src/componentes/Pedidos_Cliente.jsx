import React from "react";
import '../componentes/css/Pedidos_Cliente.css'
import { Link } from "react-router-dom";

const Pedidos_Cliente = ({estado, fecha, total, id_pedido}) => {
    return(
        <div className="contenedor_pedidos_cliente">
            <p>{estado}</p>
            <p>{fecha}</p>
            <p>${total}</p>
            <Link to={`/Informacion_Pedido/${id_pedido}`}>Ver</Link>
        </div>
    )
}

export default Pedidos_Cliente