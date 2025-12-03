import React from "react";
import '../componentes/css/Filtros_Busqueda.css'
import { useState } from "react";
import { useEffect } from "react";

const Filtros_Busqueda = ({setProductos}) => {

    const [categorias, setCategorias] = useState([])
    const [id_categoria, setId_categoria] = useState('')
    const [orden, setOrden] = useState('')
    const [nombre, setNombre] = useState('')

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
            setId_categoria('')
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }



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

    return(
        <div className="contenedor_filtros_busqueda">
            <form action="" onSubmit={Buscar_Nombre}>
                <input type="search" value={nombre} onChange={e => setNombre(e.target.value)}/>

                <button type="submit">Buscar</button>
            </form>

            <form onSubmit={e => {
                e.preventDefault();

                if (id_categoria && orden) {
                    alert("Solo puedes filtrar por precio o por categoría, no ambos.");
                    return;
                }

                if (id_categoria) {
                    Filtrar_Categoria();
                } else if (orden) {
                    Filtrar_Precio();
                } else {
                    alert("Selecciona una categoría o un orden de precio para filtrar.");
                }
            }}>
                <select value={orden} onChange={e => setOrden(e.target.value)}>
                    <option value="" hidden>Precio</option>
                    <option value="asc" >Menor-Mayor Precio</option>
                    <option value="desc" >Mayor-Menor Precio</option>
                </select>

                <select value={id_categoria} onChange={e => setId_categoria(e.target.value)}>
                    <option value="" hidden>Seleccionar categoría</option>
                    {/*OBTENER CATEGORIA DE LA BASE DE DATOS*/}
                    {categorias.map(cat => (
                        <option key={cat.Id_categoria} value={cat.Id_categoria}>
                            {cat.Nombre_categoria}
                        </option>
                    ))}
                </select>

                <button>Filtrar</button>
            </form>
        </div>
    )
}

export default Filtros_Busqueda