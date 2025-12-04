import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Registro_Producto.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Formu_Registrar_Producto from "../componentes/Formu_Registrar_Producto";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Registro_Producto = () => {

    const navigate = useNavigate()

    // ============ Animacion ============ 
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);


    // ============ Estados necesarios ============ 
    const [categorias, setCategorias] = useState([])

    
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        imagen: 'https://i.pinimg.com/1200x/9d/73/13/9d7313cc6b21186ff8d025b8a0124e08.jpg',
        categoria: ""
    });



    // ============ Funcion para poder escribir en los inputs ============ 
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value // siempre string
        });
    };


    // ============ Funcion para registrar productos ============ 
    const Registrar_Productos = async (e) => {
        e.preventDefault()

        //buscar token
        const token = localStorage.getItem("token");
            if (!token) {
                alert("Debes iniciar sesión para registrar un producto");
                navigate('/Inicio_Sesion');
                return;
            }

        try{
            const res = await fetch('http://localhost:3001/registrar_producto', {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify(form)
            })

            const datos = await res.json()

            if(!datos.success){
                return alert('No se pudo completar el registro')
            }

            alert('¡Producto creado!')
            navigate(0)
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    // ============ Obtener las categorias ============ 
    useEffect(() => {
        const Obtener_Categorias = async () => {
            try{
                const res = await fetch('http://localhost:3001/categorias')
                const datos = await res.json()

                setCategorias(datos.categorias)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Categorias()
    }, [])



    return(
        <div className="contenedor_registro_producto">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">

                <Link to={'/Perfil_Vendedor'}>{'<'} Devolverse</Link>

                <div>
                    <Formu_Registrar_Producto
                        Registrar_Productos={Registrar_Productos}
                        form={form}
                        handleChange={handleChange}
                        categorias={categorias}
                    />
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Registro_Producto