import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Formu_Registro from "../componentes/Formu_Registro";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Registro = () => {

    const navigate = useNavigate()
    
    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);



    // ============ Estados necesarios para registrarse ============
    const [form, setForm] = useState({
        nombre: "",
        telefono: "",
        email: "",
        tipo: "",
        password: ""
    });

    // ============ Funcion para poder escribir en los inputs ============
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ============ Funcion para registrarse ============
    const Registrarse = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:8001/routes/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        if(!data.message){
            alert('No se pudo completar el registro')
            navigate(0)
        }

        alert('¡Cuenta Registrada Correctamente!')
        navigate('/Inicio_Sesion')
    };



    return(
        <div className="contenedor_inicio_sesion">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Formu_Registro
                    Registrarse={Registrarse}
                    form={form}
                    handleChange={handleChange}
                />
            </div>

            <Footer/>
        </div>
    )
}

export default Registro