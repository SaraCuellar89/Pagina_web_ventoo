import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Info_Pedido_Cliente from "../componentes/Info_Pedido_Cliente";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Boton_Chatbot from "../componentes/Boton_Chatbot";

const Info_Pedido = () => {

    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);



    const id_pedido = useParams().id_pedido

    const [productos, setProductos] = useState([])
    

    // ============ Obtener Todos los productos del pedido ============
    useEffect(() => {
        const Obtener_Info_Producto = async () => {

            const token = localStorage.getItem("token");

            try{
                const res = await fetch(`http://localhost:3001/pedido/${id_pedido}`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                const datos = await res.json()

                setProductos(datos.productos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Producto()
    }, [])

    

    return(
        <div className="contenedor_perfil_cliente">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Info_Pedido_Cliente
                    productos={productos}
                />
            </div>

            <Boton_Chatbot/>

            <Footer/>
        </div>
    )
}

export default Info_Pedido