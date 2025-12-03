import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Formu_Registro = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        nombre: "",
        telefono: "",
        email: "",
        tipo: "",
        password: ""
    });

    // MANEJAR CAMBIOS
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ENVIAR FORMULARIO
    const Registrarse = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:8001/routes/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        if(!data.message){
            alert('No se pudo completar el registro')
            navigate(0)
        }

        alert('¡Cuenta Registrada Correctamente!')
        navigate('/Inicio_Sesion')
    };

    return(
        <form onSubmit={Registrarse} className="contenedor_formu_inicio_sesion">

            <p>Registro</p>

            <div>
                <input type="text" name="nombre" placeholder="Nombre Completo" value={form.nombre} onChange={handleChange} required />
                <input type="number" name="telefono" placeholder="Telefono" value={form.telefono} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
                <select name="tipo" value={form.tipo} onChange={handleChange} required>
                    <option value="" hidden>Rol</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                </select>
                <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
            </div>

            <div>
                <button>Registrarse</button>
                <p>¿Ya tienes una cuenta? <Link to={'/Inicio_Sesion'}>Inicia Sesión</Link></p>
            </div>
        </form>
    );
};

export default Formu_Registro;
