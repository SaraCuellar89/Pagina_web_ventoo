import React, { useState } from "react";
import '../componentes/css/Tarjeta_Info_Producto.css'
import img_1 from '../img/foto_prueba.jpg'
import perfil from '../img/avatar.png'
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Tarjeta_Info_Producto = () => {

    const navigate = useNavigate()

    const [cantidad, setCantidad] = useState(1)
    const [info_producto, setInfo_producto] = useState(null)
    const [usuario, setUsuario] = useState({})
    
    const id_producto = useParams().id_producto


    // Obtener los datos del usuario 
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
                    setUsuario(data.usuario); // usuario viene desde el token
                } else {
                    setUsuario(null);
                }
            } catch (error) {
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Usuario()

    }, [])



    const Aumentar = () => {
        if(cantidad >= 20) {
            return setCantidad(20)
        }
        setCantidad(cantidad + 1)
    }

    const Disminuir = () => {
        if(cantidad <= 1) {
            return setCantidad(1)
        }
        setCantidad(cantidad - 1)
    }


    //Obtener informacion del producto y del venededor
    useEffect(() => {
        const Obtener_Info_Producto = async () => {
            try{
                const res = await fetch(`http://localhost:3001/producto/${id_producto}`)
                const datos = await res.json()

                setInfo_producto(datos.producto)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Producto()
    }, [id_producto])


    //Agregar al carrito
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

    return(
        <>
            {info_producto && (
                <div className="contenedor_tarjeta_info_producto">
                    <p>Pintura Carisima</p>

                    <div className="caja_info_producto_tarjeta_info_producto">
                        <img src={info_producto.Imagen} alt="" />

                        <div>
                            <p>{info_producto.Descripcion}</p>
                            
                            <p>Cantidad: 10 </p>

                            <div>
                                <p>${info_producto.Precio}</p>

                                <div>
                                    <button onClick={Disminuir}>-</button>
                                    <p>{cantidad}</p>
                                    <button onClick={Aumentar}>+</button>
                                </div>
                            </div>

                            <>
                                {usuario.Rol === 'Vendedor' ? 
                                (
                                    <div>
                                        <button className="boton_desactivado">Agregar</button>
                                    </div>
                                ) : 
                                (
                                    <div>
                                        <button onClick={() => Agregar_Carrito(info_producto.Id_producto)}>Agregar</button>
                                    </div>
                                )}
                            </>
                        </div>
                        
                    </div>

                    <div>
                        <img src={perfil} alt="" />
                        <p>{info_producto.NombreVendedor}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Tarjeta_Info_Producto