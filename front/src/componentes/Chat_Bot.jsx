import React, { useState } from "react";
import '../componentes/css/Chat_Bot.css'
import x from '../img/x.png'
import user from '../img/avatar.png'
import robot from '../img/logo_bot.png'
import flecha from '../img/abajo.png'
import Boton_Chatbot from "./Boton_Chatbot";

const Chat_Bot = () => {

    const [cerrar_chat, setCerrar_Chat] = useState(false)
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);
    const [escribiendo, setEscribiendo] = useState(false);

const enviarMensaje = async () => {
    if (!mensaje) return;

    setMensajes(prev => [...prev, { autor: "user", texto: mensaje }]);
    setMensaje(""); 
    
    setEscribiendo(true);

    const res = await fetch("https://chat-2v4b.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            mensaje: mensaje
        })
    });

    const data = await res.json();
    
    setEscribiendo(false);

    setMensajes(prev => [...prev, { autor: "bot", texto: data.respuesta }]);
};


    return(
        <>
            {cerrar_chat === false ?
            (
                <div className="contenedor_chat_bot">
                    <div>
                        <div className="encabezado_chat_bot">
                            <p>Chat Bot</p>
                            <img src={x} alt="" onClick={() => setCerrar_Chat(true)}/>
                        </div>

                        <div className="caja_chat_bot">
                            {mensajes.map((msg, i) => (
                                msg.autor === "user" ? (
                                    <div className="chat_usuario" key={i}>
                                        <div><p>{msg.texto}</p></div>
                                        <img src={user} alt="" />
                                    </div>
                                ) : (
                                    <div className="chat_robot" key={i}>
                                        <img src={robot} alt="" />
                                        <div><p>{msg.texto}</p></div>
                                    </div>
                                )
                            ))}
                            {escribiendo && (
                                <div className="chat_robot typing">
                                    <img src={robot} alt="" />
                                    <div><p>...</p></div>
                                </div>
                            )}
                        </div>

                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                enviarMensaje();
                            }}
                        >
                            <input 
                                type="text" 
                                value={mensaje}
                                onChange={(e) => setMensaje(e.target.value)}
                                placeholder="Escribe tu mensaje..."
                            />
                            <img src={flecha} alt=""  onClick={enviarMensaje}/>
                        </form>
                    </div>
                </div>
            ) : 
            (
                <Boton_Chatbot/>
            )} 
        </>
    )
}

export default Chat_Bot