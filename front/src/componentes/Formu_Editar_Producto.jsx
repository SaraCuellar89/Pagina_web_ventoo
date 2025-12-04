import React from "react";
import '../componentes/css/Formu_Editar_Producto.css'
import img_1 from '../img/foto_prueba.jpg'

const Formu_Editar_Producto = ({Editar_Producto, form, handleChange, categorias, Cancelar_Edicion}) => {
    return(
        <form action="" onSubmit={Editar_Producto} className="contenedor_formu_editar_producto">

            <p>Producto</p>

            <img src={form.imagen || img_1} alt="" />

            <div>
                <input type="text" name="titulo" placeholder="Titulo" value={form.titulo} onChange={handleChange} required/>
                <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required/>
                <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required/>
                <select name="categoria" value={form.categoria} onChange={handleChange} required>
                    <option value="" hidden>Seleccionar categoría</option>
                    {categorias.map(cat => (
                        <option key={cat.Id_categoria} value={cat.Id_categoria}>
                            {cat.Nombre_categoria}
                        </option>
                    ))}
                </select>
                <input type="text" name="imagen" placeholder="Imagen URL" value={form.imagen} onChange={handleChange} required/>
            </div>

            <div>
                <button>Editar</button>
                <button type="button" onClick={Cancelar_Edicion}>Cancelar</button>
            </div>
        </form>
    )
}

export default Formu_Editar_Producto