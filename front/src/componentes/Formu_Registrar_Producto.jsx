import React from "react";
import img_1 from '../img/foto_prueba.jpg'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Formu_Registrar_Producto = () => {

    const [categorias, setCategorias] = useState([])

    const navigate = useNavigate()

    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        imagen: img_1,
        categoria: ""
    });

    // MANEJAR CAMBIOS
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value // siempre string
        });
    };


    //Registrar Productos
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