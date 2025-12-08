import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Productos_Cliente_Carrito from "../componentes/Productos_Cliente_Carrito";
import Modal_Pago from "../componentes/Modal_Pago";
import { useNavigate } from "react-router-dom";
import Boton_Chatbot from "../componentes/Boton_Chatbot";

const Carrito = () => {

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

    // ============ Obtener productos apenas cargue la pagina ============
    useEffect(() => {
        const Obtener_Productos = async () => {

            const token = localStorage.getItem("token");
            if (!token) return;

            try{
                const res = await fetch('http://localhost:3001/carrito', {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                const datos = await res.json()
                setProductos(datos.carrito)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [])



    const [total_carrito, setTotal_carrito] = useState(0); 

    // ============ Obtener total del carrito ============
    useEffect(() => {
        const total = productos.reduce((sum, p) => sum + Number(p.Precio) * Number(p.Cantidad), 0);
        setTotal_carrito(total);
    }, [productos]);



    // ============ Eliminar productos del carrito ============
    const Eliminar_Producto_Carrito = async (id_producto) => {
        const confirmar = confirm('¿Quieres quitar este producto de tu carrito?')
        if(!confirmar) return

        const token = localStorage.getItem("token");

        try{
            const res = await fetch(`http://localhost:3001/carrito/eliminar/${id_producto}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            })

            const datos = await res.json()

            if(!datos.success){
                return alert('No se pudo quitar el producto de tu carrito')
            }

            setProductos(productos.filter(p => p.Id_producto !== id_producto))
        } 
        catch(error){
            console.log('Error: ' + error)
        }
    }



    // ============ Mostrar Modal de pago ============
    const [ver_modal, setVer_modal] = useState(false)

    const Mostrar_Modal_Pago = () => {
        if(ver_modal === false){
            setVer_modal(true)
        }
        else{
            setVer_modal(false)  
        }
    }



    // ============ Realizar Pedido ============

    const [metodoPago, setMetodo_Pago] = useState('')
    const [direccion, setDireccion] = useState('')


    const Pagar_Pedido = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token");

        try{
            const res = await fetch('http://localhost:3001/crear_pedido', {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify({direccion, metodoPago, total: total_carrito, productos})
            })

            const datos = await res.json()

            if(!datos.success){
                return alert('No se pudo realizar el pedido')
            }

            alert('¡Pedido Completado!')

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
                
                <Productos_Cliente_Carrito
                    Mostrar_Modal_Pago={Mostrar_Modal_Pago}
                    productos={productos}
                    Eliminar_Producto_Carrito={Eliminar_Producto_Carrito}
                />
                
            </div>

            <Footer/>

            {ver_modal === false ?
            (
                null
            ) : 
            (
                <Modal_Pago
                    Mostrar_Modal_Pago={Mostrar_Modal_Pago}
                    total={total_carrito}
                    Pagar_Pedido={Pagar_Pedido}
                    metodoPago={metodoPago}
                    setMetodo_Pago={setMetodo_Pago}
                    direccion={direccion}
                    setDireccion={setDireccion}
                />
            )}

            <Boton_Chatbot/>
        </div>
    )
}

export default Carrito