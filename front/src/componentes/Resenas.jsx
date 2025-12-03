import React, { useState } from "react";
import '../componentes/css/Resenas.css'
import { useNavigate } from "react-router-dom";

const Resenas = () => {

    const navigate = useNavigate()

    const [input_editar, setInput_editar] = useState(false)

    const Editar_Resena = () => {
        if(input_editar === true){
            setInput_editar(false)
        }
        else{
            setInput_editar(true)
        }
    }

    const Cancelar_Edicion = () => {
        let confirmar = confirm('¿Quiere dejar de editar?')
        if(confirmar) navigate(0)
    }

    return(
        <div className="contenedor_resenas">
            <div>
                <p>User_4343</p>
                <p>★★★★★</p>
            </div>

            <>
                {input_editar === false ? 
                (
                    <p>Muy buen producto</p>
                ) : 
                (
                    <div className="caja_editar_resena">
                        <input type="text"/>
                        <select name="" id="">
                            <option value="1">1 Estrella</option>
                            <option value="2">2 Estrella</option>
                            <option value="3">3 Estrella</option>
                            <option value="4">4 Estrella</option>
                            <option value="5">5 Estrella</option>
                        </select>
                    </div>
                )}
            </>

            <>
            {input_editar === false ? 
            (
                <div>
                    <button onClick={Editar_Resena}>Editar</button>
                    <button>Eliminar</button>
                </div>
            ) : 
            (
                <div>
                    <button>Editar</button>
                    <button onClick={Cancelar_Edicion}>Cancelar</button>
                </div>
            )}
            </>
        </div>
    )
}

export default Resenas