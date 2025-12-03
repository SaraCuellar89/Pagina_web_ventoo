import React from "react";
import '../componentes/css/Formu_Resenas.css'

const Formu_Resenas = () => {
    return(
        <form action="" className="contenedor_formu_resenas">
            <input type="text" placeholder="Escribe una reseña"/>

            <select name="" id="">
                <option value="1">1 Estrella</option>
                <option value="2">2 Estrella</option>
                <option value="3">3 Estrella</option>
                <option value="4">4 Estrella</option>
                <option value="5">5 Estrella</option>
            </select>

            <button>Subir</button>
        </form>
    )
}

export default Formu_Resenas