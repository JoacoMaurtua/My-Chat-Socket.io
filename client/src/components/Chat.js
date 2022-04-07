/* 
  En este componente es donde enviaremos y reciviremos mensajes
  a traves de socket.io
*/
import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  //para enviar mensaje ---> funcion asincronar
  //para resivir mensaje ---> useEffect()

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
      setMessageList((list) => [...list,messageData]) //devuelve los mensajes anteriores y tambien el nuevo mensaje
      setCurrentMessage("")
    }
  };

  //Detectara cada vez que haya un cambio en nuestro socket(comunicacion bidireccional)
  useEffect(() =>{//evento para recivir mensajes(parecido a los del backend)
    socket.on("receive_message",(data)=>{
      setMessageList((list) => [...list,data]) //devuelve los mensajes anteriores y tambien el nuevo mensaje
      //console.log(data);
    }); 

  },[socket])

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
        {messageList.map((messageContent)=>{ //recorre un arreglo de objetos
          return <div className="message" id={userName === messageContent.author ? "you":"other"}>
            <div>
              <div className="message-content">
                  <p>{messageContent.message}</p>
              </div>
              <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
              </div>
            </div>
          </div>
        })};
        </ScrollToBottom>
      </div>
      
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyPress={(event)=>{
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button> {/* error automatico */}
      </div>
    </div>
  );
};

export default Chat;
