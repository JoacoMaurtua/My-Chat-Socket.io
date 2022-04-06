/* 
  En este componente es donde enviaremos y reciviremos mensajes
  a traves de socket.io
*/
import React, { useState } from 'react';

const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');

  const sendMessage = async () => {
    //Esta funcion permitira enviar mensajes a traves de nuestro servidor socket.io
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      //emitir un socket message a traves de socket.io
      await socket.emit("send_message", messageData);
    }
  };

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button> {/* error automatico */}
      </div>
    </div>
  );
};

export default Chat;