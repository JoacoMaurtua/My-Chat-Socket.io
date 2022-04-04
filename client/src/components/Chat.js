/* 
  En este componente es donde enviaremos y reciviremos mensajes
  a traves de socket.io
*/
import React from 'react';

const Chat = ({socket, userName, room}) => {
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input type="text" placeholder="Hey..."/>
        <button>&#9658;</button> {/* error automatico */}
      </div>
    </div>
  );
}

export default Chat;
