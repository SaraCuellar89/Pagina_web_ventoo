import React, { useState } from "react";
import '../componentes/css/Chat_Bot.css'
import x from '../img/x.png'
import user from '../img/avatar.png'
import robot from '../img/logo_bot.png'
import flecha from '../img/abajo.png'
import Boton_Chatbot from "./Boton_Chatbot";

const Chat_Bot = () => {

    const [cerrar_chat, setCerrar_Chat] = useState(false)

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
                            <div className="chat_usuario">
                                <div>
                                    <p>Hola</p>
                                </div>
                                <img src={user} alt="" />
                            </div>

                            <div className="chat_robot">
                                <img src={robot} alt="" />
                                <div>
                                    <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
                                </div>
                            </div>
                        </div>

                        <form action="">
                            <input type="text" />
                            <img src={flecha} alt="" />
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