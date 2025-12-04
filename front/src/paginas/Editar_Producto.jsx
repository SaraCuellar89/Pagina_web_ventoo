import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import { Link, useNavigate, useParams } from "react-router-dom";
import Formu_Editar_Producto from "../componentes/Formu_Editar_Producto";
import Footer from "../componentes/Footer";
import { useState } from "react";

const Editar_Producto = () => {

    const navigate = useNavigate()

    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);



    // ============ Estados necesaros para obtener categorias e informacion del producto ============
    const [categorias, setCategorias] = useState([])
    const [producto, setProducto] = useState(null)
    
    const id_producto = useParams().id_producto


    // ============ Estados para editar el producto ============
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        imagen: "",
        categoria: ""
    });

    // ============ Funcion para escribir en los inputs ============
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value // siempre string
        });
    };


    
    useEffect(() => {

        // ============ Obtener categorias apenas cargue la pagina  ============
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


        // ============ Obtener datos del producto apenas cargue la pagina ============
        const Obtener_Info_Producto = async () => {

            const token = localStorage.getItem("token");

            try{
                const res = await fetch(`http://localhost:3001/producto_id/${id_producto}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    }
                })
                const datos = await res.json()

                setProducto(datos.producto)
                setForm({
                    titulo: datos.producto.Nombre,
                    descripcion: datos.producto.Descripcion,
                    precio: datos.producto.Precio,
                    imagen: datos.producto.Imagen,
                    categoria: datos.producto.Id_categoria
                });
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Producto()
    }, [])




    // ============ Funcion para editar un producto  ============
    const Editar_Producto = async (e) => {
        e.preventDefault()

        //buscar token
        const token = localStorage.getItem("token");
            if (!token) {
                navigate('/');
                return;
            }

        try{
            const res = await fetch(`http://localhost:3001/editar_producto/${id_producto}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify(form)
            })

            const datos = await res.json()

            if(!datos.success){
                return alert('No se pudo editar el producto')
            }

            alert('¡Producto editado!')
            navigate('/Perfil_Vendedor')
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    // ============ Funcion para cancelar la edicion ============
    const Cancelar_Edicion = () => {
        const confirmar = confirm('Quieres dejar de editar?')
        if(!confirmar) return
        else navigate('/Perfil_Vendedor')
    }



    return(
        <div className="contenedor_registro_producto">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">

                <Link to={'/Perfil_Vendedor'}>{'<'} Devolverse</Link>

                <div>
                    <Formu_Editar_Producto
                        Editar_Producto={Editar_Producto}
                        form={form}
                        handleChange={handleChange}
                        categorias={categorias}
                        Cancelar_Edicion={Cancelar_Edicion}
                    />
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Editar_Producto