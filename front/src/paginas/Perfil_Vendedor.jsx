import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../componentes/Footer";
import Encabezado from "../componentes/Encabezado";
import Encabezado_Usuarios from "../componentes/Encabezado_Usuarios";
import Productos_Vendedor from "../componentes/Productos_Vendedor";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Boton_Chatbot from "../componentes/Boton_Chatbot";

const Perfil_Vendedor = () => {

    const navigate = useNavigate()

    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);


    const [productos, setProductos] = useState([])

    // ============ Obtener todos los productos del vendedor ============
    useEffect(() => {

        const Obtener_Productos = async () => {

            const token = localStorage.getItem("token");

            try{
                const res = await fetch('http://localhost:3001/productos_vendedor', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    }
                });

                const datos = await res.json()

                setProductos(datos.productos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [])


    // ============ Funcion para eliminar productos ============
    const Eliminar_Producto = async (id_producto) => {
        const confirmar = confirm('¿Quieres eliminar este producto de forma permantente?')
        if(!confirmar) return

        const token = localStorage.getItem("token");

        try{
            const res = await fetch(`http://localhost:3001/eliminar_producto/${id_producto}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            })

            const datos = await res.json()

            if(!datos.success){
                alert('No se pudo eliminar el producto')
            }

            alert('Producto Eliminado')
            navigate(0)
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }




    return(
        <div className="contenedor_perfil_cliente">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Encabezado_Usuarios/>

                <Link to={'/Registrar_Producto'} className="boton_registrar_producto">Registrar</Link>
                
                <Productos_Vendedor
                    productos={productos}
                    Eliminar_Producto={Eliminar_Producto}
                />
            </div>

            <Boton_Chatbot/>

            <Footer/>
        </div>
    )
}

export default Perfil_Vendedor