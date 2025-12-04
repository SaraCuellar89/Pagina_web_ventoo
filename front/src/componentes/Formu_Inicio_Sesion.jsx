import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../componentes/css/Formu_Inicio_Sesion.css'

const Formu_Login = ({IniciarSesion, form, handleChange}) => {
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
