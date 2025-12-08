import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import '../paginas/css/General.css'
import '../paginas/css/Inicio.css'
import Carrusel from "../componentes/Carrusel";
import Tarjeta_Inicio from "../componentes/Tarjeta_Inicio";
import img1 from "../img/perfil-del-usuario.png"
import img2 from "../img/anadir-a-la-cesta.png"
import img3 from "../img/no-se-vende.png"
import Barra_Busqueda from "../componentes/Barra_Busqueda";
import Tarjeta_Producto from "../componentes/Tarjeta_Producto";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../componentes/Footer";
import { useState } from "react";
import Boton_Chatbot from "../componentes/Boton_Chatbot";

const Inicio = () => {

    const navigate = useNavigate()

    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);



    // ============ Estado necesario para renderizar los productos ============
    const [productos, setProductos] = useState([])




    const [usuario, setUsuario] = useState({})
    // ============ Obtener Informacion del usuario ============
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
                    setUsuario(data.usuario);
                } else {
                    setUsuario(null);
                }
            } catch (error) {
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Usuario()

    }, [])



    // ============ Informacion Tarjetas Inicio ============
    let info_tarjetas_inicio = [];

    if(usuario.Rol === "Cliente") {
        info_tarjetas_inicio = [
            { id: 1, ruta_tarjeta_inicio: "/Perfil_Cliente", titulo: "Entra a tu cuenta", logo: img1 },
            { id: 2, ruta_tarjeta_inicio: "/Compra", titulo: "Compra algo", logo: img2 },
            { id: 3, ruta_tarjeta_inicio: "/Registrarse", titulo: "Vende tu mismo", logo: img3 }
        ];
    }
    else if(usuario.Rol === "Vendedor") {
        info_tarjetas_inicio = [
            { id: 1, ruta_tarjeta_inicio: "/Perfil_Vendedor", titulo: "Entra a tu cuenta", logo: img1 },
            { id: 2, ruta_tarjeta_inicio: "/Compra", titulo: "Compra algo", logo: img2 },
            { id: 3, ruta_tarjeta_inicio: "/Registrar_Producto", titulo: "Vende tu mismo", logo: img3 }
        ];
    }
    else{
        info_tarjetas_inicio = [
            { id: 1, ruta_tarjeta_inicio: "/Inicio_Sesion", titulo: "Entra a tu cuenta", logo: img1 },
            { id: 2, ruta_tarjeta_inicio: "/Compra", titulo: "Compra algo", logo: img2 },
            { id: 3, ruta_tarjeta_inicio: "/Inicio_Sesion", titulo: "Vende tu mismo", logo: img3 }
        ];
    }


    // ============ Obtener 3 productos aleatoriamente ============
    useEffect(() => {
        const Obtener_Productos = async () => {
            try{
                const res = await fetch('http://localhost:3001/productos')

                const datos = await res.json()

                // Mezclar productos aleatoriamente
                const productosAleatorios = datos.productos
                .sort(() => 0.5 - Math.random())  // mezcla
                .slice(0, 3); 
                
                setProductos(productosAleatorios)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [])



    // ============ Buscar Productos por su nombre ============
    const [nombre, setNombre] = useState('')

    const Buscar_Nombre = async (e) => {
        e.preventDefault()

        if(nombre === ''){
            navigate(0)
        }

        try{
            const res = await fetch('http://localhost:3001/buscar_nombre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombre})
            })

            const datos = await res.json()

            setProductos(datos.productos.slice(0, 3))
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }



    return(
        <div className="contenedor_inicio">
            <Encabezado/>
            <div data-aos="fade-up" data-aos-duration="1000">
                <Carrusel/>

                <div className="caja_tarjetas_inicio_inicio">
                    {info_tarjetas_inicio.map((t) => (
                        <Tarjeta_Inicio
                            key={t.id}
                            ruta_tarjeta_inicio={t.ruta_tarjeta_inicio}
                            titulo={t.titulo}
                            logo={t.logo}
                        />
                    ))}
                </div>

                <div className="caja_barra_busqueda_inicio">
                    <p>¡Descubre tu mismo!</p>
                    <Barra_Busqueda
                        Buscar_Nombre={Buscar_Nombre}
                        nombre={nombre}
                        setNombre={setNombre}
                    />
                </div>

                <div className="caja_productos_inicio">
                    <div>
                        {productos.length === 0 || !productos?
                        (
                            <p>No hay productos</p>
                        ) : 
                        (
                            <>
                                {productos.map((p) => (
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
                    <Link to={'/Compra'}>Encuentra mas {'>>'}</Link>
                </div>
            </div>

            <Boton_Chatbot/>

            <Footer/>
        </div>
    )
}

export default Inicio