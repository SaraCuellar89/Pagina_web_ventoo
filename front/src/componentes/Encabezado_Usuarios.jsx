import React from "react";
import '../componentes/css/Encabezado_Cliente.css'
import perfil from '../img/avatar.png'
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Encabezado_Usuarios = () => {

    const navigate = useNavigate()

    const [usuario, setUsuario] = useState({})

    // Obtener los datos del usuario 
    useEffect(() => {

        const Obtener_Info_Usuario = async () => {
            //Buscar el token
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:3001/usuario_logueado", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                const data = await res.json();

                if (data.success) {
                    setUsuario(data.usuario); // usuario viene desde el token
                } else {
                    setUsuario(null);
                }
            } catch (error) {
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Usuario()

    }, [])


    // Eliminar Token
    const Cerrar_Sesion = () => {
        const confirmar = confirm('¿Quieres salir de tu cuenta?')
        if(!confirmar) return

        try{
            localStorage.removeItem("token");

            alert('¡Cierre de sesion exitoso!')
            navigate('/')
        }
        catch(error){
            console.log('Error: ' + error)
            alert('No se pudo cerrar sesion')
        }
    }


    return(
        <div className="contenedor_encabezado_cliente">
            <div>
                <img src={perfil} alt="" />

                <div>
                    <p>{usuario.Nombre}</p>
                    <p>{usuario.Email}</p>
                </div>
            </div>

            <button onClick={Cerrar_Sesion}>Salir</button>
        </div>
    )
}

export default Encabezado_Usuarios