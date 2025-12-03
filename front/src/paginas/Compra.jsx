import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Compra.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Filtros_Busqueda from "../componentes/Filtros_Busqueda";
import Tarjeta_Producto from "../componentes/Tarjeta_Producto";
import { useState } from "react";

const Compra = () => {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);


    //Obtener productos
    useEffect(() => {
        const Obtener_Productos = async () => {
            try{
                const res = await fetch('http://localhost:3001/productos')

                const datos = await res.json()
                
                setProductos(datos.productos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [])

    return(
        <div className="contenedor_compra">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <div>
                    <Filtros_Busqueda
                        setProductos={setProductos}
                    />
                </div>

                <div className="caja_productos">
                    <p>Todo</p>

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
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Compra