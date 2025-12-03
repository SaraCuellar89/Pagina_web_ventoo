import React from "react";
import '../componentes/css/Formu_Editar_Producto.css'
import img_1 from '../img/foto_prueba.jpg'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Formu_Editar_Producto = () => {

    const navigate = useNavigate()

    const [categorias, setCategorias] = useState([])
    const [producto, setProducto] = useState(null)
    
    const id_producto = useParams().id_producto



    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        imagen: "",
        categoria: ""
    });

    // MANEJAR CAMBIOS
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value // siempre string
        });
    };


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


        //Obtener datos del producto
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


    //Registrar Productos
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


    //Cancelar Edicion
    const Cancelar_Edicion = () => {
        const confirmar = confirm('Quieres dejar de editar?')
        if(!confirmar) return
        else navigate('/Perfil_Vendedor')
    }

    return(
        <form action="" onSubmit={Editar_Producto} className="contenedor_formu_editar_producto">

            <p>Producto</p>

            <img src={form.imagen || img_1} alt="" />

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
                <button>Editar</button>
                <button type="button" onClick={Cancelar_Edicion}>Cancelar</button>
            </div>
        </form>
    )
}

export default Formu_Editar_Producto