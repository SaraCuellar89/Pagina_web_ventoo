import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Info_Producto.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import { Link } from "react-router-dom";
import Tarjeta_Info_Producto from "../componentes/Tarjeta_Info_Producto";
import Mas_Del_Vendedor from "../componentes/Mas_Del_Vendedor";
import Formu_Resenas from "../componentes/Formu_Resenas";
import Resenas from "../componentes/Resenas";

const Info_Producto = () => {

    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    return(
        <div className="contenedor_info_tarjeta">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Link to={'/Compra'}>{'<'} Devolverse</Link>

                <div>
                    <Tarjeta_Info_Producto/>
                    <Mas_Del_Vendedor/>

                    <p>Opiniones</p>

                    <div className="caja_resenas">

                        <Formu_Resenas/>

                        <div>
                            <p>5.0</p>
                            <p>★★★★★</p>
                        </div>

                        <Resenas/>
                        <Resenas/>  
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Info_Producto