import React from "react";
import '../componentes/css/Barra_Busqueda.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Barra_Busqueda = ({Buscar_Nombre, nombre, setNombre}) => {
    return(
        <form onSubmit={Buscar_Nombre} className="contenedor_barra_busqueda">
            <input type="search" value={nombre} onChange={e => setNombre(e.target.value)}/>
            <button>Buscar</button>
        </form>
    )
}

export default Barra_Busqueda