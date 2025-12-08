import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Info_Producto.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Tarjeta_Info_Producto from "../componentes/Tarjeta_Info_Producto";
import Mas_Del_Vendedor from "../componentes/Mas_Del_Vendedor";
import Formu_Resenas from "../componentes/Formu_Resenas";
import Resenas from "../componentes/Resenas";
import { useState } from "react";
import Boton_Chatbot from "../componentes/Boton_Chatbot";

const Info_Producto = () => {

    const navigate = useNavigate()

    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);


    const [resenas, setResenas] = useState([])

    const id_producto = useParams().id_producto



    const [cantidad, setCantidad] = useState(1)
    const [info_producto, setInfo_producto] = useState(null)
    const [usuario, setUsuario] = useState({})
    



    // ============ Obtener Informacion del usuario ============
    useEffect(() => {

        const Obtener_Info_Usuario = async () => {
            //Buscar el token
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:3001/usuario_logueado", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                const data = await res.json();

                console.log(data.usuario.Rol)

                if (data.success) {
                    setUsuario(data.usuario);
                } else {
                    setUsuario(null);
                }
            } catch (error) {
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Usuario()

    }, [])



    // ============ Funcion para aumentar la cantidad de productos ============
    const Aumentar = () => {
        if(cantidad >= 20) {
            return setCantidad(20)
        }
        setCantidad(cantidad + 1)
    }

    // ============ Funcion para disminuir la cantidad de productos ============
    const Disminuir = () => {
        if(cantidad <= 1) {
            return setCantidad(1)
        }
        setCantidad(cantidad - 1)
    }


    // ============ Obtener la informacion del producto ============
    useEffect(() => {
        const Obtener_Info_Producto = async () => {
            try{
                const res = await fetch(`http://localhost:3001/producto/${id_producto}`)
                const datos = await res.json()

                setInfo_producto(datos.producto)
                setCantidad(1)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Producto()
    }, [id_producto])




    // ============ funcion para agregar productos al carrito ============
    const Agregar_Carrito = async (id_producto) => {

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debes iniciar sesión para agregar al carrito");
            navigate('/Inicio_Sesion');
            return;
        }

        try{
            const res = await fetch('http://localhost:3001/carrito/agregar', {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify({Id_producto:id_producto, Cantidad:cantidad})
            })

            const datos = await res.json()

            if(!datos.success){
                alert('No se pudo agregar el producto al carrito')
            }

            alert('¡Producto agregado a tu carrito!')
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }



    // ============ Obtener todas las reseñas de un producto apenas cargue la pagina ============
    useEffect(() => {
        const Obtener_Resenas = async () => {
            try{
                const res = await fetch(`http://localhost:3001/resenas/${id_producto}`)
                const datos = await res.json()

                setResenas(datos.resenas)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Resenas()
    }, [id_producto])



    // ============ Obtener todos los productos del vendedor ============
    const [productos_vendedor, setProducos_vendedor] = useState([])

    useEffect(() => {
        const Obtener_Info_Producto = async () => {
            try{
                const res = await fetch(`http://localhost:3001/producto/${id_producto}`)
                const datos = await res.json()

                setProducos_vendedor(datos.masDelVendedor)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Producto()
    }, [id_producto])



    // ============ Subir una reseña ============
    const [comentario, setComentario] = useState('')
    const [estrellas, setEstrellas] = useState(1)

    const Subir_Resena = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token");

        try{
            const res = await fetch('http://localhost:3001/resena', {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify({Id_producto: id_producto, Comentario: comentario, Estrellas: estrellas})
            })

            const datos = await res.json()

            if(!datos.success){
                return alert('No se pudo subir la reseña')
            }

            alert('¡Reseña Subida!')
            navigate(0)
        }
        catch(error){
            console.error('Error: ' + error)
        }
    }



    // ============ Estados necesarios para editar una reseña ============
    const [nuevoComentario, setNuevoComentario] = useState(comentario)
    const [nuevasEstrellas, setNuevasEstrellas] = useState(estrellas)

    const [input_editar, setInput_editar] = useState(false)


    // ============ Funcion Para editar una reseña ============
    const Editar_Resena = async (id_resena, nuevoComentario, nuevasEstrellas) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:3001/resena/${id_resena}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token 
                },
                body: JSON.stringify({
                    Comentario: nuevoComentario,
                    Estrellas: nuevasEstrellas
                })
            });

            const datos = await res.json();

            if(!datos.success){
                alert("No se pudo editar la reseña");
            }

            alert("¡Reseña Editada!");
            navigate(0)
        }
        catch (error) {
            console.log('Error: ' + error)
        }
    }


    // ============ Funcion para eliminar una reseña ============
    const Eliminar_Resena = async (id_resena) => {
        const confirmar = confirm('¿Quieres eliminar esta reseña?')
        if(!confirmar) return

        const token = localStorage.getItem("token");

        try{
            const res = await fetch(`http://localhost:3001/resena/${id_resena}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token 
                }
            });

            const datos = await res.json()

            if(!datos.success){
                return alert('No se pudo eliminar la reseña')
            }

            alert('Reseña Eliminada')
            navigate(0)
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }



    // ============ Promedio de estrellas ============
    const promedio =
        resenas.length > 0
            ? (resenas.reduce((acc, r) => acc + r.Estrellas, 0) / resenas.length).toFixed(1)
            : 0;

    const estrellasVisuales =
        "★".repeat(Math.round(promedio)) +
        "☆".repeat(5 - Math.round(promedio));



    return(
        <div className="contenedor_info_tarjeta">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Link to={'/Compra'}>{'<'} Devolverse</Link>

                <div>
                    <Tarjeta_Info_Producto
                        info_producto={info_producto}
                        Disminuir={Disminuir}
                        Aumentar={Aumentar}
                        cantidad={cantidad}
                        usuario={usuario}
                        Agregar_Carrito={Agregar_Carrito}
                    />
                    <Mas_Del_Vendedor
                        productos_vendedor={productos_vendedor}
                    />

                    <p>Opiniones</p>

                    <div className="caja_resenas">

                        <Formu_Resenas
                            Subir_Resena={Subir_Resena}
                            comentario={comentario}
                            setComentario={setComentario}
                            estrellas={estrellas}
                            setEstrellas={setEstrellas}
                            rol_usuario={usuario.Rol}
                        />

                        <div>
                            <p>{promedio}</p>
                            <p>{estrellasVisuales}</p>
                        </div>

                        {resenas.length === 0 ?
                        (
                            <p>No hay reseñas</p>
                        ) : 
                        (
                            <>
                                {resenas.map((r) => (
                                    <Resenas
                                        key={r.Id_resena}
                                        id_resena={r.Id_resena}
                                        nombre_usuario={r.NombreUsuario}
                                        estrellas={r.Estrellas}
                                        comentario={r.Comentario}
                                        Editar_Resena={Editar_Resena}
                                        Eliminar_Resena={Eliminar_Resena}
                                        id_usuario_resena={r.Id_usuario}
                                        id_usuario_logueado={usuario.Id_usuario}
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

export default Info_Producto