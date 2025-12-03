import React from "react";
import '../componentes/css/Productos_Vendedor.css'
import Tarjeta_Producto from "./Tarjeta_Producto";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Productos_Vendedor = () => {

    const navigate = useNavigate()

    const [productos, setProductos] = useState([])

    //Obtener productos
    useEffect(() => {

        const Obtener_Productos = async () => {

            const token = localStorage.getItem("token");

            try{
                const res = await fetch('http://localhost:3001/productos_vendedor', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    }
                });

                const datos = await res.json()

                setProductos(datos.productos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [])


    //Eliminar productos
    const Eliminar_Producto = async (id_producto) => {
        const confirmar = confirm('¿Quieres eliminar este producto de forma permantente?')
        if(!confirmar) return

        const token = localStorage.getItem("token");

        try{
            const res = await fetch(`http://localhost:3001/eliminar_producto/${id_producto}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            })

            const datos = await res.json()

            if(!datos.success){
                alert('No se pudo eliminar el producto')
            }

            alert('Producto Eliminado')
            navigate(0)
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }

    return(
        <div className="contenedor_productos_vendedor">
            <p>Tus Productos</p>

            <div>
                {productos.length === 0 ?
                (
                    <p>No hay productos</p>
                ) : 
                (
                    <>
                        {productos.map((p) => (
                            <div key={p.Id_producto}>
                                <Tarjeta_Producto
                                    id_producto={p.Id_producto}
                                    img_prodcuto={p.Imagen}
                                    titulo_producto={p.Nombre}
                                    precio_producto={p.Precio}
                                    texto_tarjeta={'Editar'}
                                    ruta_tarjeta={'/Editar_Producto'}
                                />
                                <button onClick={() => Eliminar_Producto(p.Id_producto)}>Eliminar</button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Productos_Vendedor