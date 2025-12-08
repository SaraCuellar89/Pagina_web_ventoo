import React, { useState } from "react";
import '../componentes/css/Boton_Chatbot.css'
import robot from '../img/logo_bot.png'
import Chat_Bot from "./Chat_Bot";

const Boton_Chatbot = () => {

    const [ver_chat, setVer_Chat] = useState(false)

    return(
        <>
            {ver_chat === false ? 
            (
                <div className="contenedor_boton_chatbot">
                    <div className="caja_boton_chatbot" onClick={() => setVer_Chat(true)}>
                        <img src={robot} alt="" />
                    </div>
                </div>
            ) : 
            (
                <Chat_Bot/>
            )}
        </>
    )
}

export default Boton_Chatbot