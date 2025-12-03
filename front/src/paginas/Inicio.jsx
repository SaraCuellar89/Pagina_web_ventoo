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
import { Link } from "react-router-dom";
import Footer from "../componentes/Footer";
import { useState } from "react";

const Inicio = () => {

    const [productos, setProductos] = useState([])
 
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    const info_tarjetas_inicio = [
        {
            id: 1,
            ruta_tarjeta_inicio: "/Inicio_Sesion",
            titulo: "Entra a tu cuenta",
            logo: img1
        },
        {
            id: 2,
            ruta_tarjeta_inicio: "/Compra",
            titulo: "Compra algo",
            logo: img2
        },
        {
            id: 3,
            ruta_tarjeta_inicio: "/Inicio_Sesion",
            titulo: "Vende tu mismo",
            logo: img3
        }
    ];



    //Obtener 3 productos de manera aleatoria
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
                    <Barra_Busqueda/>
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

            <Footer/>
        </div>
    )
}

export default Inicio