import React from "react";
import '../componentes/css/Formu_Resenas.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Formu_Resenas = ({Subir_Resena, comentario, setComentario, estrellas, setEstrellas, rol_usuario}) => {
    return(
        <form action="" onSubmit={Subir_Resena} className="contenedor_formu_resenas">
            {rol_usuario === 'Vendedor' ? 
            (
                <p>Debes tener una cuenta como 'Cliente' para poder reseñar productos</p>
            ) : 
            (
                <>
                    <input type="text" value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Escribe una reseña"/>

                    <select name="" id="" value={estrellas} onChange={(e) => setEstrellas(e.target.value)}>
                        <option value="1">1 Estrella</option>
                        <option value="2">2 Estrella</option>
                        <option value="3">3 Estrella</option>
                        <option value="4">4 Estrella</option>
                        <option value="5">5 Estrella</option>
                    </select>

                    <button>Subir</button>
                </>
            )}
        </form>
    )
}

export default Formu_Resenas