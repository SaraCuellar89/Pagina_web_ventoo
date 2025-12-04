import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../componentes/css/Modal_Pago.css'

const Modal_Pago = ({Mostrar_Modal_Pago, total, Pagar_Pedido, metodoPago, setMetodo_Pago, direccion, setDireccion}) => {
 
    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    return(
        <div className="contenedor_modal_pago">

            <div data-aos="fade-up" data-aos-duration="1000">
                <div>
                    <p>Total a Pagar:</p>
                    <p>${total}</p>
                </div>
                
                <form action="" onSubmit={Pagar_Pedido}>
                    <p>Meotodo de Pago</p>

                    <select name="" id="" value={metodoPago} onChange={(e) => setMetodo_Pago(e.target.value)}>
                        <option value="" hidden>Seleccionar...</option>
                        <option value="Nequi">Nequi</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Daviplata">Daviplata</option>
                    </select>

                    <p>Direccion de Envio</p>

                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Ej: Carrera 45 #2-C 56"/>

                    <button>Finalizar Compra</button>
                </form>

                <button onClick={Mostrar_Modal_Pago}>Cancelar</button>
            </div>

        </div>
    )
}

export default Modal_Pago