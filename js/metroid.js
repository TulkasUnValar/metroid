// Mauricio Quiñones (Tulkas)

// const: constant, won´t change
// From starGame function
const metroidPlayerButton = document.getElementById('select-buttom')
const sectionRestart = document.getElementById('restart')
const restartBottom = document.getElementById('restart-bottom')
sectionRestart.style.display = 'none' // Hide restart section

// From metroidSelectPlayer function
const fightSelectSection = document.getElementById('fighter-select')
const attackSelectSection = document.getElementById('attack-select')
const spanPlayerFighter = document.getElementById('player-fighter')

// From metroidSelectEnemy function 
const spanEnemyFighter = document.getElementById('enemy-fighter')

// From fight function 
const spanPlayerLife = document.getElementById('player-life')
const spanEnemyLife = document.getElementById('enemy-life')

// From createMessage
const messageSection = document.getElementById('result')
const playerAttacks = document.getElementById('player-attack')
const enemyAttacks = document.getElementById('enemy-attack')

// Cards container
const cardsContainer = document.getElementById('cards-container')
// Attacks container
const attacksContainer = document.getElementById('attacks-container')

// Map
const viewMapSection = document.getElementById('view-map')
const map = document.getElementById('map')

// Declare var, are called from other function
let idPlayer = null
let idEnemy = null
let metroids = [] // array
let enemiesMetroids = []
let playerAttack = [] // array
let enemyAttack = [] // array
let metroidOption
let inputSamus
let inputMother
let inputSamusX
let inputRidley
let metroidPlayer
let metroidPlayerObject
let metroidAttacks
let enemyMetroidAttack
let fireButton
let iceButton
let waveButton
let bottoms = [] // array
let playerAttackIndex
let enemyAttackIndex
let playerVictory = 0
let enemyVictory = 0
let playerLife = 3
let enemyLife = 3
let canvas = map.getContext("2d")
let interval
let backgroundMap = new Image()
backgroundMap.src = './public/img/map2.jpg'
let searchedHeight // Searched height map
let mapWidth = window.innerWidth - 20 // New map width
const maxMapWidth = 700 // Max map width

// New mapWidth if mapWidth > maxMapWidth
if (mapWidth > maxMapWidth) {
  mapWidth = maxMapWidth - 20
}

searchedHeight = mapWidth * 600 / 800

map.width = mapWidth
map.height = searchedHeight

// The Class name begin with capital letter 
// this = this same thing, the class itself
// this.name = name : the metroid name will be the same name that will be given 
class Metroid {
  constructor(name, picture, minipicture, life, id = null) {
    this.id = id // Each Metroid has the IdPlayer
    this.name = name
    this.picture = picture
    this.minipicture = minipicture
    this.life = life
    this.attacks = [] // Array attacks, add the each metroid attack 
    this.heightY = 90 // Metroid image height in map. If want default put value number  
    this.widthX = 90 // Metroid image width in map
    this.x = aleatorio(0, map.width - this.widthX) // Map image x aleatory position
    this.y = aleatorio(0, map.height - this.heightY) // Map image y aleatory position
    this.pictureMap = new Image() // Insert image in map 
    this.pictureMap.src = minipicture
    this.speedX = 0
    this.speedY = 0
  }

  paintMetroid() {
    // Method to paint player metroids and player metroids in map
    canvas.drawImage(
      this.pictureMap,
      this.x,
      this.y,
      this.heightY,
      this.widthX
    )
  }
}

// Player objects
let samus = new Metroid('SAMUS', './public/img/samus5.1.png', './public/img/samusRun.png', 5)
let mother = new Metroid('M.BRAIN', './public/img/motherBrain2.png', './public/img/mbRun.png', 5)
let samusX = new Metroid('SA-X', './public/img/sAX4.1.png', './public/img/saXRun.png', 5)
let ridley = new Metroid('RIDLEY', './public/img/ridley2.png', './public/img/ridleyRun.png', 5)

// Arrays
// push, inject values in metroids array, to populate arrays
// Push attacks in each metroid´s attack
// Using (...) get value attacks not the list 
const SAMUS_ATTACKS = [
  { name: 'PLASMA BEAM', id: 'fire-buttom' }, // literal objects, saves attacks info 
  { name: 'PLASMA BEAM', id: 'fire-buttom' },
  { name: 'PLASMA BEAM', id: 'fire-buttom' },
  { name: 'ICE BEAM', id: 'ice-buttom' },
  { name: 'WAVE BEAM', id: 'wave-buttom' },
]
// ...SAMUS_ATTACKS give values no list
samus.attacks.push(...SAMUS_ATTACKS) // Player

const MOTHER_ATTACKS = [
{ name: 'PLASMA BEAM', id: 'fire-buttom' }, // literal objects, saves attacks info
{ name: 'PLASMA BEAM', id: 'fire-buttom' },
{ name: 'ICE BEAM', id: 'ice-buttom' },
{ name: 'ICE BEAM', id: 'ice-buttom' },
{ name: 'WAVE BEAM', id: 'wave-buttom' },
]

mother.attacks.push(...MOTHER_ATTACKS) // Player

const SAMUSX_ATTACKS = [
  { name: 'PLASMA BEAM', id: 'fire-buttom' }, // literal objects, saves attacks info
  { name: 'PLASMA BEAM', id: 'fire-buttom' },
  { name: 'PLASMA BEAM', id: 'fire-buttom' },
  { name: 'ICE BEAM', id: 'ice-buttom' },
  { name: 'WAVE BEAM', id: 'wave-buttom' },
]

samusX.attacks.push(...SAMUSX_ATTACKS) // Player

const RIDLEY_ATTACKS = [
  { name: 'WAVE BEAM', id: 'wave-buttom' }, // literal objects, saves attacks info
  { name: 'WAVE BEAM', id: 'wave-buttom' },
  { name: 'WAVE BEAM', id: 'wave-buttom' },
  { name: 'PLASMA BEAM', id: 'fire-buttom' },
  { name: 'PLASMA BEAM', id: 'fire-buttom' },
]

ridley.attacks.push(...RIDLEY_ATTACKS) // Player

// Push attacks in each metroid´s attack
metroids.push(samus, mother, samusX, ridley)

// Call select buttom and metroidSelectPlayer
function startGame() {
  attackSelectSection.style.display = 'none' // Hide attackSelectSection
  viewMapSection.style.display = 'none' // Hide map

  // forEach: for each metroid in metroid array do the next
  metroids.forEach((metroid) => {
    metroidOption = `
    <input type="radio" name="figther" id=${metroid.name} />
    <label class="figther-card" for=${metroid.name}>
      <p>${metroid.name}</p>
      <img src=${metroid.picture} alt=${metroid.name}>
    </label>
    ` // Literary templates: with inverted comma, allows you to implement HTML with js variable values, HTML and JS mix.

    cardsContainer.innerHTML += metroidOption // Inject value of metroidOption structure, visualize each metroid to choose

    inputSamus = document.getElementById('SAMUS')
    inputMother = document.getElementById('M.BRAIN')
    inputSamusX = document.getElementById('SA-X')
    inputRidley = document.getElementById('RIDLEY')
  })

  // EventListener from metroidPlayerBottom   
  metroidPlayerButton.addEventListener('click', metroidSelectPlayer)

  // EventListener from restartBottom
  restartBottom.addEventListener('click', restartGame)

  joinGame()
}

// Petition to server . Fetch: call another services. In post case use: method : "post"
function joinGame() {
  fetch("http://localhost:8080/join") // Asynchronous petition
    .then(function (res) {
      if (res.ok) {
        res.text()
          // then: when waiting response. Response promise 
          .then(function(answer) {
            console.log(answer)
            idPlayer = answer
          })
      }    
    })
}

// Select metroid 
function metroidSelectPlayer() {  
  if (inputSamus.checked) {
    spanPlayerFighter.innerHTML = inputSamus.id // Print the name given in inputSamusInnerHTML changes to inputSamus.id 
    metroidPlayer = inputSamus.id // Saves metroid name in metroidPlayer var 
  } else if (inputMother.checked) {
    spanPlayerFighter.innerHTML = inputMother.id
    metroidPlayer = inputMother.id
  } else if (inputSamusX.checked) {
    spanPlayerFighter.innerHTML = inputSamusX.id
    metroidPlayer = inputSamusX.id
  } else if (inputRidley.checked) {
    spanPlayerFighter.innerHTML = inputRidley.id
    metroidPlayer = inputRidley.id
  } else {
    alert('SELECT FIGHTER')
    return
  }

  fightSelectSection.style.display = 'none' // Hide fightSelectSection

  metroidSelect(metroidPlayer) // Send data to Backend

  extractAttacks(metroidPlayer)
  viewMapSection.style.display = 'flex' // Shows viewMapSection
  startMap() // Calls function startMap()
}

// Send data to Backend     // JSON configuration object. `` template strings.
function metroidSelect(metroidPlayer) {
  fetch(`http://localhost:8080/metroid/${idPlayer}`, { 
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      metroid: metroidPlayer
    }) // value to send to server, there´s no necessary "then" cause is not waiting response 
  }) 
}

// Extract attacks from each metroid pick
function extractAttacks(metroidPlayer) {
  let attacks
  // Iterate 
  for (let i = 0; i < metroids.length; i++) {
    if (metroidPlayer === metroids[i].name) {
      attacks = metroids[i].attacks
    }
  }
  // Return attacks to showAttacks  
  showAttacks(attacks)
}

// Populate attack bottoms 
function showAttacks(attacks) {
  attacks.forEach((attack) => {
    metroidAttacks = `<button id=${attack.id} class="attack-buttoms aButtons">${attack.name}</button>`

    attacksContainer.innerHTML += metroidAttacks
  })
  
  fireButton = document.getElementById('fire-buttom')
  iceButton = document.getElementById('ice-buttom')
  waveButton = document.getElementById('wave-buttom')

  // querySelectorAll: select all elements that have something (class). It doesn't use id, is bad practice, the id can´t repeat
  bottoms = document.querySelectorAll('.aButtons') // Select all bottoms from aBottoms class
}

function attackSequence() {
  // For each buttom in button array add the event click and validate the value selected
  bottoms.forEach((buttom) => {
    buttom.addEventListener('click', (event) => {
      // Each event have an EventListener that is a click, the "e" it´s a event itself. Print which event are clicking
      if (event.target.textContent === 'PLASMA BEAM') {
        playerAttack.push('PLASMA BEAM')
        console.log(playerAttack)
        buttom.style.background = '#112f58'
        buttom.disabled = true
      } else if (event.target.textContent === 'ICE BEAM') {
        playerAttack.push('ICE BEAM')
        console.log(playerAttack)
        buttom.style.background = '#112f58'
        buttom.disabled = true
      } else {
        playerAttack.push('WAVE BEAM')
        console.log(playerAttack)
        buttom.style.background = '#112f58'
        buttom.disabled = true
      }
      
      // If player attacks = 5 sendAttacks() 
      if (playerAttack.length === 5) {
        sendAttacks()
      }
    })
  })
}

// Using fetch and post to upload attacks into the server
function sendAttacks() {
  fetch(`http://localhost:8080/metroid/${idPlayer}/attacks`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      attacks: playerAttack
    })
  })
  interval = setInterval(getAttacks, 50)
}

// Get petition does not need, method, headers, body
function getAttacks () {
  fetch(`http://localhost:8080/metroid/${idEnemy}/attacks`)
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({ attacks }) {
            if (attacks.length === 5) {
              enemyAttack = attacks
              fight()
            }
          })
      }
    })
}

// Get enemy name and attack
function metroidSelectEnemy(enemy) {
  spanEnemyFighter.innerHTML = enemy.name // Get enemy name  
  enemyMetroidAttack = enemy.attacks // Get enemy attack
  attackSequence() // Call function attackSequence()
}

// Random enemy attack 
function randomEnemyAttack() {
  console.log('Ataque enemigo', enemyMetroidAttack);
  let randomAttack = aleatorio(0, enemyMetroidAttack.length - 1)

  if (randomAttack == 0 || randomAttack == 1) {
    enemyAttack.push('PLASMA BEAM')
  } else if (randomAttack == 3 || randomAttack == 4) {
    enemyAttack.push('ICE BEAM')
  } else {
    enemyAttack.push('WAVE BEAM')
  }
  console.log(enemyAttack)

  startFight() // Call function startFight
}

// Call fight() function when player pick 5 attacks
function startFight() {
  if (playerAttack.length === 5) {
    fight()
  }
}

// Save attacks
function bothOpponentIndex(player, enemy) {
  playerAttackIndex = playerAttack[player]
  enemyAttackIndex = enemyAttack[enemy]
}

// Fighting comparing attacks 
function fight() {
  clearInterval(interval)
  // Print in separate way each attacks
  // i: each attack number 
  for (let i = 0; i < playerAttack.length; i++) {
    if (playerAttack[i] === enemyAttack[i]) {
      bothOpponentIndex(i, i)
      createMessage("TIE")
    } else if (playerAttack[i] === 'PLASMA BEAM' && enemyAttack[i] === 'WAVE BEAM') {
      bothOpponentIndex(i, i)
      createMessage("YOU WIN")
      playerVictory++
      spanPlayerLife.innerHTML = playerVictory
    } else if (playerAttack[i] === 'ICE BEAM' && enemyAttack[i] === 'PLASMA BEAM') {
      bothOpponentIndex(i, i)
      createMessage("YOU WIN")
      playerVictory++
      spanPlayerLife.innerHTML = playerVictory
    } else if (playerAttack[i] === 'WAVE BEAM' && enemyAttack[i] === 'ICE BEAM') {
      bothOpponentIndex(i, i)
      createMessage("YOU WIN")
      playerVictory++
      spanPlayerLife.innerHTML = playerVictory
    } else {
      bothOpponentIndex(i, i)
      createMessage("YOU LOSE")
      enemyVictory++
      spanEnemyLife.innerHTML = enemyVictory
    }
  }
  
  lifeReview() // Call check 0 life 
}

// Check 0 life
function lifeReview() {
  if (playerVictory === enemyVictory) {
    createFinalMessage("¡TIEEE!")
  } else if (playerVictory > enemyVictory) {
    createFinalMessage("¡WEEEE ARE THE CHAMPIONS MY FRIEND!")
  } else {
    createFinalMessage("¡LOOOSEEER!")
  }
}

// Create combat message 
function createMessage(result) {
  // Call id results, HTML player-attack and HTML enemy-attack 

  // Create paragraph, type p element,introducing tex
  let newPlayerAttack = document.createElement('p')
  let newEnemyAttack = document.createElement('p')

  // messageSection elements sons, playerAttacks and enemyAttacks
  messageSection.innerHTML = result
  newPlayerAttack.innerHTML = playerAttackIndex
  newEnemyAttack.innerHTML = enemyAttackIndex

  // Adhere tex to message section
  playerAttacks.appendChild(newPlayerAttack)
  enemyAttacks.appendChild(newEnemyAttack)
}

// Create final message
function createFinalMessage(finalResult) {
  
  messageSection.innerHTML = finalResult // Create paragraph, type p element,introducing tex

  // Disable buttons after pick each one
  metroidPlayerButton.disabled = true
  fireButton.disabled = true
  iceButton.disabled = true
  waveButton.disabled = true

  sectionRestart.style.display = 'block' // Appear restart button after pick 5 attacks
}

// restartGame Function
function restartGame() {
  location.reload()
}

// Aleatory
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Paint metroid in map
function paintCanvas() {
  metroidPlayerObject.x = metroidPlayerObject.x + metroidPlayerObject.speedX
  metroidPlayerObject.y = metroidPlayerObject.y + metroidPlayerObject.speedY
  canvas.clearRect(0, 0, map.width, map.height)
  // canvas Background 
  canvas.drawImage(
    backgroundMap,
    0,
    0,
    map.width,
    map.height
  )
  metroidPlayerObject.paintMetroid() // Call method class object metroidPlayerObject.paintMetroid() from Metroid Class 
  
  sendPosition(metroidPlayerObject.x, metroidPlayerObject.y)
  
  // paintMetroid() by forEach using enemiesMetroids, Collision between metroids 
  enemiesMetroids.forEach(function (metroid) {
    metroid.paintMetroid()
    checkCollision(metroid)
  })
}

function sendPosition(x, y) {
  fetch(`http://localhost:8080/metroid/${idPlayer}/position`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x, // Short form when use the same var for key and value
      y
    })
  })
  // Receive coordinates answer
  // Then: response promise
  .then(function (res) {
    if (res.ok) {
      res.json()
        .then(function ({ enemies }) {
          console.log(enemies)
          // Iterate enemy list and identify what is the Metroid that is using the enemy. Use enemy objects in the if conditional.
          // Map: similar forEach execute and return value (new list)
          enemiesMetroids = enemies.map(function (enemy) {
            let enemyMetroid  = null // Generic var to use in forEach enemy
            const metroidName =  enemy.metroid.name || ""
            if (metroidName === "SAMUS") {
              enemyMetroid = new Metroid('SAMUS', './public/img/samus5.1.png', './public/img/samusRun.png', 5, enemy.id)    
            } else if (metroidName === "M.BRAIN") {
              enemyMetroid = new Metroid('M.BRAIN', './public/img/motherBrain2.png', './public/img/mbRun.png', 5, enemy.id)
            } else if (metroidName === "SA-X") {
              enemyMetroid = new Metroid('SA-X', './public/img/sAX4.1.png', './public/img/saXRun.png', 5, enemy.id)
            } else if (metroidName === "RIDLEY") {
              enemyMetroid = new Metroid('RIDLEY', './public/img/ridley2.png', './public/img/ridleyRun.png', 5, enemy.id)    
            }
            
            // Enemy coordinates
            enemyMetroid.x = enemy.x
            enemyMetroid.y = enemy.y

            // Return new enemy list
            return enemyMetroid
          })
        })
    }
  }) 
}

// Movement functions
// Up
function moveUp() {
  metroidPlayerObject.speedY = -5
}
// Down
function moveDown() {
  metroidPlayerObject.speedY = 5
}
// Left
function moveLeft() {
  metroidPlayerObject.speedX = -5
}
// Right
function moveRight() {
  metroidPlayerObject.speedX = 5
}
// Stop movement, speed 0
function stopMove() {
  metroidPlayerObject.speedX = 0
  metroidPlayerObject.speedY = 0
}

// event (e): in addEventListeners many times return an event (e), in that case the key was pressed 
function keyPressed(event) {
  //switch: if conditional. When press key call movement function 
  switch (event.key) {
    case 'ArrowUp':
      moveUp()
      break // terminate the execution if applicable
    case 'ArrowDown':
      moveDown()
      break
    case 'ArrowLeft':
      moveLeft()
      break
    case 'ArrowRight':
      moveRight()
      break
    default:
      break
  }
  //console.log(e.key); // Shows the key pressed in console
}

// Start the map 
function startMap() {
  // Map size
  //map.width = 700
  //map.height = 450

  // Var metroidPlayerObject return metroid object from getMetroidObject() 
  metroidPlayerObject = getMetroidObject(metroidPlayer)
  console.log(metroidPlayerObject, metroidPlayer);

  //setInterval: constantly call a function in a time interval. Call paintMetroid() in 50 mil seconds for the metroid move whe hold the buttom pressed
  interval = setInterval(paintCanvas, 50)

  window.addEventListener('keydown', keyPressed) // addEventListener Keydown (execute when holding pressed a key) and keyPressed function
  window.addEventListener('keyup', stopMove) // addEventListener keyup (execute when release a key) and keyPressed function
}

// getMetroidObject() return complete object from metroid Array
function getMetroidObject() {
  for (let i = 0; i < metroids.length; i++) {
    if (metroidPlayer === metroids[i].name) {
      return metroids[i]
    }
  }
}

// Collision between metroids
function checkCollision(enemy) {
  // Enemy
  const topEnemyMetroid = enemy.y
  const underEnemyMetroid = enemy.y + enemy.heightY
  const leftEnemyMetroid = enemy.x
  const rightEnemyMetroid = enemy.x + enemy.widthX
  // Metroid player
  const topMetroid = metroidPlayerObject.y
  const underMetroid = metroidPlayerObject.y + metroidPlayerObject.heightY
  const leftMetroid = metroidPlayerObject.x
  const rightMetroid = metroidPlayerObject.x + metroidPlayerObject.widthX
  if (
    underMetroid < topEnemyMetroid ||
    topMetroid > underEnemyMetroid ||
    rightMetroid < leftEnemyMetroid ||
    leftMetroid > rightEnemyMetroid
  ) {
    return // Return nothing. No collision
  }

  stopMove()
  clearInterval(interval)
  console.log('Se detectó una colisión');

  // Assign Metroid Class enemy id
  idEnemy = enemy.id
  attackSelectSection.style.display = 'flex'
  viewMapSection.style.display = 'none'
  metroidSelectEnemy(enemy) // Call function metroidSelectEnemy()
  //alert("---WARNING---  HERE COMES " + enemy.name) // In collision
}

// Browser load all the HTML, Call startGame()
window.addEventListener('load', startGame)