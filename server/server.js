/* 
Socket.IO se compone de dos partes:
 -Un servidor que se integra con (o se monta en) el servidor HTTP de Node.JS socket.io
 -Una biblioteca cliente que se carga en el lado del navegador socket.io-client
*/

const express = require('express');

const app = express();

const PORT = 8000;

const http = require('http'); //Construir el server junto a socket.io

const cors = require('cors') //middleware que permite que los recursos restringidos en una página web se soliciten desde otro dominio fuera del dominio desde el que se sirvió el primer recurso. 

const {Server} = require('socket.io')//interfaz de clase


app.use(cors());//acceder a las funcionalidades del middleware 


const server = http.createServer(app); //Express inicializa app para ser un controlador de funciones que puede proporcionar a un servidor HTTP

//instancia del Server
const io = new Server(server, { //conectar nuestro servidor socket.io con el de express
  cors: {
    origin: "http//localhost:3000", //esta bien aceptar la comunicaicon de sockets con esta URL
    methods: ["GET","POST"], // los metodos que acep
  } //especificar las credenciales y configuraciones de cors en nuestro server
});

//sockets se basa en eventos
io.on('connection',(socket)=>{
  console.log(`User Connected: ${socket.id}`) //reconocer que usur se conecto

  socket.on('join_room',(data)=>{ //la funcion joinRoom le envia el nombre de la sala desde el frontend
    socket.join(data);
    console.log(`User whit ID: ${socket.id} joined room: ${data}`)
  });

  socket.on('disconnect',()=>{
    console.log('User Disconnected',socket.id)
  })
}); //evento que detecta si un usuario se conecto al server de socket.io

server.listen(PORT,()=>{
  console.log(`1:Server running in PORT ${PORT}`)
});