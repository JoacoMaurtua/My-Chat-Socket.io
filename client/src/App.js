/* 
Socket.IO se compone de dos partes:
 -Un servidor que se integra con (o se monta en) el servidor HTTP de Node.JS socket.io
 -Una biblioteca cliente que se carga en el lado del navegador socket.io-client
*/
import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './components/Chat';

const socket = io.connect('http://localhost:8000', {
  transports: ['websocket'],
}); //segundo parametro es un metodo de transporte neutral para todos los navegadores

function App() {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    //conectar al usuario con la sala de socket.io
    if (userName !== '' && room !== '') {
      socket.emit('join_room', room); //enviamos la data de room al backend
      setShowChat(true);
    }
  }; //NOTA: Los eventos que queremos usar en el front end deben ser primero implementados en el backend

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 style={{ marginLeft: '-1rem' }}>Únete al chat!</h3>
          <input
            type="text"
            placeholder="Joaquin..."
            onChange={(event) => setUserName(event.target.value)}
          ></input>
          <input
            type="text"
            placeholder="ID SALA..."
            onChange={(event) => setRoom(event.target.value)}
          ></input>{' '}
          {/* Una sala es un espacio comun y cerrado de intercambio de datos */}
          <button onClick={joinRoom}>Únete a la sala</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
