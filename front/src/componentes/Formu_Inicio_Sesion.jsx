import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../componentes/css/Formu_Inicio_Sesion.css'

const Formu_Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        contrasena: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const IniciarSesion = async (e) => {
        e.preventDefault();

        localStorage.removeItem("token");

        const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!data.success) {
            alert('No se pudo iniciar sesion');
            return;
        }

        // guardar token y usuario
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        alert(`¡Hola ${data.usuario.Nombre}!`);
        
        if(data.usuario.Tipo_cliente === 'Cliente'){
            navigate('/Perfil_Cliente')
        }
        else{
            navigate('/Perfil_Vendedor')
        }
    };

    return (
        <form onSubmit={IniciarSesion} className="contenedor_formu_inicio_sesion">
            <p>Inicio de Sesión</p>

            <div>
                <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange}/>

                <input type="password" name="contrasena" placeholder="Contraseña" value={form.contrasena} onChange={handleChange}/>
            </div>

            <div>
                <button>Entrar</button>
                <p>¿No tienes una cuenta? <Link to={'/Registrarse'}>Registrate</Link></p>
            </div>
        </form>
    );
};

export default Formu_Login;
