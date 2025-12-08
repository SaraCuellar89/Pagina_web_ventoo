import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Inicio_Sesion.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Formu_Inicio_Sesion from "../componentes/Formu_Inicio_Sesion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Boton_Chatbot from "../componentes/Boton_Chatbot";

const Inicio_Sesion = () => {

    const navigate = useNavigate();

    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);



    // ============ Estados necesarios para el formulario de inicio de sesion ============
    const [form, setForm] = useState({
        email: "",
        contrasena: ""
    });

    // ============ Funcion para poder escribir en los inputs ============
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    // ============ Funcion para Iniciar Sesion ============
    const IniciarSesion = async (e) => {
        e.preventDefault();

        localStorage.removeItem("token");

        const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!data.success) {
            alert('No se pudo iniciar sesion');
            return;
        }

        // guardar token y usuario
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        alert(`¡Hola ${data.usuario.Nombre}!`);
        
        if(data.usuario.Tipo_cliente === 'Cliente'){
            navigate('/Perfil_Cliente')
        }
        else{
            navigate('/Perfil_Vendedor')
        }
    };


    
    return(
        <div className="contenedor_inicio_sesion">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Formu_Inicio_Sesion
                    IniciarSesion={IniciarSesion}
                    form={form}
                    handleChange={handleChange}
                />
            </div>

            <Boton_Chatbot/>

            <Footer/>
        </div>
    )
}

export default Inicio_Sesion