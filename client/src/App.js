/* 
Socket.IO se compone de dos partes:
 -Un servidor que se integra con (o se monta en) el servidor HTTP de Node.JS socket.io
 -Una biblioteca cliente que se carga en el lado del navegador socket.io-client
*/
import React, {useState} from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000",{ transports : ['websocket'] }); //segundo parametro es un metodo de transporte neutral para todos los navegadores

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] =  useState("");

  const joinRoom = ()=>{ //cpnectar al usuario con la sala de socket.io

  };

  return (
    <div className="App">
      <h1>Primer Chat con Socket.io</h1>
      <h3>Únete al chat!</h3>
      <input 
        type="text" 
        placeholder="Joaquin..."
        onChange = {(event) => setUserName(event.target.value)}
      ></input>
      <input 
        type="text" 
        placeholder="ID SALA..."
        onChange = {(event) => setRoom(event.target.value)}
      ></input>  {/* Una sala es un espacio comun y cerrado de intercambio de datos */}
      <button>Únete a la sala</button>

     
    </div>
  );
}

export default App;
