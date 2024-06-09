// Mauricio Quiñones (Tulkas)

// -------------------BACKEND -----------------------------
/*
npm install express
npm install cors
*/
// Import in project: Using require, allow us use libraries
// express: create server app, code to receive client request and respond to them
//Initializations
// Server instance

const express = require("express")
const cors = require("cors")
const app = express()

//app.use(express.static('public'))
app.use(cors())
app.use(express.json())

//Public files
const players = []

// Camel Class name
class Player {
  constructor(id) {
    this.id = id
  }
  // Method metroidAssign. Metroid assign to id player  
  metroidAssign(metroid) {
    this.metroid = metroid 
  }
  // Method updatePosition
  updatePosition(x, y) {
    this.x = x
    this.y = y
  }
  // Method attacksAssign. Attacks list
  attacksAssign(attacks) {
    this.attacks = attacks
  }
}

class Metroid {
  constructor(name) {
    this.name = name
  }
}

// Run Server. node index.js
// Crl + C: turn off server
// Var: req (petition), res (handle responses to the users) 

// Routes:
// Endpoint
app.get("/join", (req, res) => {
  const id = `${Math.random()}` // Template string. Convert the number in string
  const player = new Player(id)
  players.push(player) // Add to players list. End point
  res.setHeader("Access-Control-Allow-Origin", "*") // Allow that call type. Allow all the origins 
  res.send(id)
})

// Port. Listen client request:
// post, petition to receive json data, idPlayer (params type). End point IdPlayer
app.post("/metroid/:idPlayer", (req, res) => {
  const idPlayer = req.params.idPlayer || ""
  const name = req.body.metroid || "" // Var name. Extract from metroid body
  const metroid = new Metroid(name) // Var metroid to assign to user 
  
  const indexPlayer = players.findIndex((player) => idPlayer === player.id) // Var to get player inside the list with validation. findIndex: to get some list element and return that element.
  //Assign metroid to player
  if (indexPlayer >= 0) {
    players[indexPlayer].metroidAssign(metroid)
  }

  console.log(players)
  console.log(idPlayer)
  res.end()
})

// post, petition to receive json data, Metroid position. End point position
app.post("/metroid/:idPlayer/position", (req, res) => {
  const idPlayer = req.params.idPlayer || ""
  const x = req.body.x || 0 // Var x. Extract from metroid body
  const y = req.body.y || 0 // Var y. Extract from metroid body

  const indexPlayer = players.findIndex((player) => idPlayer === player.id) // Var to get player inside the list with validation  
  //Assign metroid to player
  if (indexPlayer >= 0) {
    players[indexPlayer].updatePosition(x, y)
  }
  
  // Filter the players list of all idPlayers minus the actual request idPlayer
  const enemies = players.filter((player) => idPlayer !== player.id)
  
  res.send({
    enemies
  })
})

// post, petition to receive json data, idPlayer (params type)
app.post("/metroid/:idPlayer/attacks", (req, res) => {
  const idPlayer = req.params.idPlayer || ""
  const attacks = req.body.attacks || [] // Var attacks. Extract from metroid body
  
  const indexPlayer = players.findIndex((player) => idPlayer === player.id) // Var to get player inside the list with validation  
  //Assign attacks to metroid
  if (indexPlayer >= 0) {
    players[indexPlayer].attacksAssign(attacks)
  }

  res.end()
})  

app.get("/metroid/:idPlayer/attacks", (req, res) => {
  const idPlayer = req.params.idPlayer || ""
  const player = players.find((player) => player.id === idPlayer)
  res.send({
    attacks: player.attacks || []
  })
})

app.listen(8080, () => {
  console.log("Server running")
})

//Settings:
//Middlewares:

/* La conexión a una página se rerealiza por medio de una dirección electrónica (https://platzi)
URI Uniform Resource Identifier, forma en que se conecta desde cualquier sitio. URI se compone de URL + URN
URL Uniform Resource Locator, identificador de recusro, ocalización específica de un recurso
URN, Uniform Resource Name, nombre de un recurso 

Partes de URI
https://    blabla.com:   44/       search?  search=js            #title      
esquema     dominio       puerto    ruta     cadena de búsqueda   nombre  

Esquema: estandar (http, https, ftp) por el cual se intercambian mensajes
Dominios: cada sitio tiene su dominio que tambien se accede medio la IP. Desde mi PC es localhost
Puerto: número que indica a cual programa nos vamos a conectar. 
Ruta: ercurso que se quiere obtener del sitio
Cadena de búsqueda: opcional, enviar datos para filtar la búsqueda
URN: nombre de recurso

Cada página web tiene su propio servidor y nombre de dominio
En localhost (computadora en si mismo, servidor en si mismo) se pueden obtener muchos puertos. Cada puerto puede estar dedicado a una cosa distinta por medio de los estándares: 80= web, 443= puerto de seguridad en https, 587= correo, 8080= NodeJS.

Http: protocolo que nos permite enviar peticiones  y recibir respuestas. Las formas que se hacen las peticiones son variadas, hay peticiones para para solicitarle datos al servidor y para enviarle datos al servidor o que elimine recursos.

Verbos de http: 
get: solicitar recursos. Se reciben en la URL del navegador. 
post: eviar datos. Van se segundo plano.
put/patch: modifica un recurso existente. put: sustutuye por completo un recurso, patch: actualiza algunos elementos del recurso
delete: para eleminar recursos
*/

/*
JSON: Java Script Objec Notation, tipo de dato dentro de JS, Tipo de objeto donde se define su estructura y a tráves de ella, con datos realies se define cual es el objeto. Se define estructura y datos. Forma común de comunicar el frontend con el backend, paquete de datos que lleva la info. desde el cliente al servidor o viceversa. Forma común de realizar APIs

{"clave":"valor"} clave: nombre de variable. valor: valor de varuiable    

clave":"valor noe permite definir estructura con cualquier tipo de información

{
  "Nombre":"Tulkas", 
  "Edad":"38"
}

El jugador envía datos al servidor, id del jugador, nombre de Metroid
*/