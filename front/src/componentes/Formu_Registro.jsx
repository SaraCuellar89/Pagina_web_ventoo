import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Formu_Registro = ({Registrarse, form, handleChange}) => {
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
