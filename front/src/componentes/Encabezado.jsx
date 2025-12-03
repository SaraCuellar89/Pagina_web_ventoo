import React from "react";
import { Link, NavLink } from "react-router-dom";
import titulo from "../img/titulo.png"
import '../componentes/css/Encabezado.css'
import { useState } from "react";
import { useEffect } from "react";

const Encabezado = () => {

    const [usuario, setUsuario] = useState(null)

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

    const [ver_menu, setVer_menu] = useState(false)

    const Mostrar_Menu = () => {
        if(ver_menu === false){
            setVer_menu(true)
        }
        else{
            setVer_menu(false)
        }
    }

    return(
        <div className="contenedor_encabezado">
            <img src={titulo} alt="" />

            <button onClick={Mostrar_Menu}>Menú</button>

            {ver_menu === false ? 
            (
                <nav className="navbar">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Inicio</NavLink>

                    <NavLink to="/Compra" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Compra</NavLink>

                    {!usuario ? (
                        <>
                            <NavLink to="">Carrito</NavLink>
                            <NavLink to="/Inicio_Sesion" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Iniciar Sesion</NavLink>
                        </>
                    ) : usuario.Rol === 'Cliente' ? (
                        <>
                            <NavLink to="/Carrito" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Carrito</NavLink>
                            <NavLink to="/Perfil_Cliente" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Perfil</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="">Carrito</NavLink>
                            <NavLink to="/Perfil_Vendedor" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Perfil</NavLink>
                        </>
                    )}
                </nav>
            ) : 
            (
                null
            )}
        </div>
    )
}

export default Encabezado