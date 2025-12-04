import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Compra.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Filtros_Busqueda from "../componentes/Filtros_Busqueda";
import Tarjeta_Producto from "../componentes/Tarjeta_Producto";
import { useState } from "react";

const Compra = () => {

    // ============ Animacion ============
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);



    const [productos, setProductos] = useState([])



    // ============ Estados necesarios para los filtros ============
    const [categorias, setCategorias] = useState([])
    const [id_categoria, setId_categoria] = useState('')
    const [orden, setOrden] = useState('')
    const [nombre, setNombre] = useState('')



    // ============ Obtener Todas las categorias para el select ============
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



    // ============ Buscar producto por el nombre ============
    const Buscar_Nombre = async (e) => {
        e.preventDefault()

        if(nombre === ''){
            return
        }

        try{
            const res = await fetch('http://localhost:3001/buscar_nombre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombre})
            })

            const datos = await res.json()

            setProductos(datos.productos)
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }



    // ============ Filtrar productos por su categoria ============
    const Filtrar_Categoria = async () => {
        try{
            const res = await fetch('http://localhost:3001/filtrar_categoria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id_categoria})
            })

            const datos = await res.json()

            setProductos(datos.productos)
            setId_categoria('')
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    // ============ Filtrar productos por su precio ============
    const Filtrar_Precio = async () => {
        try{
            const res = await fetch('http://localhost:3001/filtrar_precio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({orden})
            })

            const datos = await res.json()

            setProductos(datos.productos)
            setOrden('')
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }



    // ============ Obtener todos los productos apensas cargue la pagina ============
    useEffect(() => {
        const Obtener_Productos = async () => {
            try{
                const res = await fetch('http://localhost:3001/productos')

                const datos = await res.json()
                
                setProductos(datos.productos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [])




    return(
        <div className="contenedor_compra">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <div>
                    <Filtros_Busqueda
                        Buscar_Nombre={Buscar_Nombre}
                        nombre={nombre}
                        setNombre={setNombre}
                        Filtrar_Categoria={Filtrar_Categoria}
                        Filtrar_Precio={Filtrar_Precio}
                        orden={orden}
                        setOrden={setOrden}
                        id_categoria={id_categoria}
                        setId_categoria={setId_categoria}
                        categorias={categorias}
                    />
                </div>

                <div className="caja_productos">
                    <p>Todo</p>

                    <div>
                        {productos.length === 0 || !productos?
                        (
                            <p>No hay productos</p>
                        ) : 
                        (
                            <>
                                {productos.map((p) => (
                                    <Tarjeta_Producto
                                        key={p.Id_producto}
                                        id_producto={p.Id_producto}
                                        img_prodcuto={p.Imagen}
                                        titulo_producto={p.Nombre}
                                        precio_producto={p.Precio}
                                        texto_tarjeta={'Ver'}
                                        ruta_tarjeta={'/Ver_Informacion_Producto'}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Compra