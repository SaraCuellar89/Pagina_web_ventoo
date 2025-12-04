import React, { useState } from "react";
import '../componentes/css/Resenas.css';

const Resenas = ({ id_resena, nombre_usuario, estrellas, comentario, Editar_Resena, Eliminar_Resena, id_usuario_resena,id_usuario_logueado }) => {

    const [editando, setEditando] = useState(false);
    const [nuevoComentario, setNuevoComentario] = useState(comentario);
    const [nuevasEstrellas, setNuevasEstrellas] = useState(estrellas);

    const guardar = () => {
        Editar_Resena(id_resena, nuevoComentario, nuevasEstrellas);
        setEditando(false);
    };

    return (
        <div className="contenedor_resenas">

            <div>
                <p>{nombre_usuario}</p>
                <p>{"★".repeat(estrellas) + "☆".repeat(5 - estrellas)}</p>
            </div>

            {editando ? (
                <div className="caja_editar_resena">
                    <input
                        type="text"
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                    />

                    <select
                        value={nuevasEstrellas}
                        onChange={(e) => setNuevasEstrellas(Number(e.target.value))}
                    >
                        <option value="1">1 Estrella</option>
                        <option value="2">2 Estrellas</option>
                        <option value="3">3 Estrellas</option>
                        <option value="4">4 Estrellas</option>
                        <option value="5">5 Estrellas</option>
                    </select>
                </div>
            ) : (
                <p>{comentario}</p>
            )}

            { id_usuario_logueado === id_usuario_resena ? (
                editando ? (
                    <div>
                        <button onClick={guardar}>Guardar</button>
                        <button onClick={() => setEditando(false)}>Cancelar</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setEditando(true)}>Editar</button>
                        <button onClick={() => Eliminar_Resena(id_resena)}>Eliminar</button>
                    </div>
                )
            ) : <div></div> }

        </div>
    );
};

export default Resenas;
