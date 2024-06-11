const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1800;
canvas.height = 1000;

const scaledCanvas = {
  width: canvas.width / 1,
  height: canvas.height / 1
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 149) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 149))
}


const collisionBlocks = []
floorCollisions2D.forEach((row, y) =>{
  row.forEach((symbol, x) => {
    if (symbol === 12666) {
      
      collisionBlocks.push(
        new collisionBlock({
        position: {
          x: x * 12,
          y: y * 12,
        },
      }))
    }
  })
})

const platformBlocks = []
const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 149) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 149))
}

const platformCollisionBlocks = []
platformCollisionBlocks.forEach((row, y) =>{
  row.forEach((symbol, x) => {
    if (symbol === 12666) {
      
      platformBlocks.push(
        new collisionBlock({
        position: {
          x: x * 12,
          y: y * 12,
        },
      }))
    }
  })
})

console.log(collisionBlocks)

const gravity = 0.13


const player = new Player({
  position: {
    x:600,
    y:0, 
  },
  collisionBlocks,
  imageSrc: './img/warrior/idle.png',
  frameRate: 8, 


})


const key = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
}

const background = new Sprite ({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png',
})


function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  c.save()
  c.scale(1, 1)
   //c.translate(0, -background.image.height + scaledCanvas.height )
  background.update()
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update()
  })

  platformCollisionBlocks.forEach((block) => {
    block.update()
  })

  player.update()
 

  player.velocity.x = 0
  if (key.d.pressed) player.velocity.x = 2
    else if (key.a.pressed) player.velocity.x = -2
  
  c.restore()
  
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      key.d.pressed = true
    break

    case 'a':
      key.a.pressed = true
    break

    case 'w':
      player.velocity.y = -6
    break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      key.d.pressed = false
    break

    case 'a':
      key.a.pressed = false
    break
  }
})