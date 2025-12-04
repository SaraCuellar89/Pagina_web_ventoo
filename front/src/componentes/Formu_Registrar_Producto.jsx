import React from "react";
import img_1 from '../img/foto_prueba.jpg'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Formu_Registrar_Producto = ({Registrar_Productos, form, handleChange, categorias}) => {
    return(
        <form action="" onSubmit={Registrar_Productos} className="contenedor_formu_inicio_sesion">

            <p>Producto</p>

            <img src={form.imagen} alt="" />

            <div>
                <input type="text" name="titulo" placeholder="Titulo" value={form.titulo} onChange={handleChange} required/>
                <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required/>
                <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required/>
                <select name="categoria" value={form.categoria} onChange={handleChange} required>
                    <option value="">Seleccionar categoría</option>
                    {/*OBTENER CATEGORIA DE LA BASE DE DATOS*/}
                    {categorias.map(cat => (
                        <option key={cat.Id_categoria} value={cat.Id_categoria}>
                            {cat.Nombre_categoria}
                        </option>
                    ))}
                </select>
                <input type="text" name="imagen" placeholder="Imagen URL" value={form.imagen} onChange={handleChange} required/>
            </div>

            <div>
                <button>Registrar</button>
            </div>
        </form>
    )
}

export default Formu_Registrar_Producto