import React, { useState } from "react";
import '../componentes/css/Tarjeta_Info_Producto.css'
import img_1 from '../img/foto_prueba.jpg'
import perfil from '../img/avatar.png'
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Tarjeta_Info_Producto = ({info_producto, Disminuir, Aumentar, cantidad, usuario, Agregar_Carrito}) => {
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