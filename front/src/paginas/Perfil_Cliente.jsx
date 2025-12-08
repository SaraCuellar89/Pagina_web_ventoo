import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Perfil_Cliente.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Pedidos_Cliente from "../componentes/Pedidos_Cliente";
import Encabezado_Usuarios from "../componentes/Encabezado_Usuarios";
import { useState } from "react";
import Boton_Chatbot from "../componentes/Boton_Chatbot";

const Perfil_Cliente = () => {

    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);



    const [pedidos, setPedidos] = useState([])

    // ============ Obtener todos los pedidos del cliente ============
    useEffect(() => {
        const Obtener_Pedidos = async () => {

            const token = localStorage.getItem("token");

            try{
                const res = await fetch('http://localhost:3001/pedidos_cliente', {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                const datos = await res.json()
                setPedidos(datos.pedidos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Pedidos()
    }, [])



    return(
        <div className="contenedor_perfil_cliente">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Encabezado_Usuarios/>
                
                <div className="caja_pedidos_cliente_perfil_cliente">
                    <p>Pedidos</p>
                    <div>
                        {pedidos.length === 0 ?
                        (
                            <p>No hay pedidos</p>
                        ) : 
                        (
                            <>
                                {pedidos.map((p) => (
                                    <Pedidos_Cliente
                                        key={p.Id_pedido}
                                        estado={p.Estado_pedido}
                                        fecha={p.Fecha_pedido.slice(0, 10)}
                                        total={p.Total}
                                        id_pedido={p.Id_pedido}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Boton_Chatbot/>

            <Footer/>
        </div>
    )
}

export default Perfil_Cliente