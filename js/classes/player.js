class Player extends Sprite{
  constructor({position, collisionBlocks, imageSrc, frameRate, scale = 1.5}) {
    super({imageSrc, frameRate, scale})
    this.position = position
    this.velocity = {
      x: 0,
      y: 1
    }
    
    this.collisionBlocks = collisionBlocks
    }
    

    update() {
      this.updateFrame()

      this.draw()

      this.position.x += this.velocity.x
      this.checkForHorizontalCollision()
      this.applyGravity()
      this.checkForVerticalCollision()
    }

    checkForHorizontalCollision() {
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i]
        if (
          collision({
            object1: this,
            object2: collisionBlock,
          })
        ) {
          if (this.velocity.x > 0) {
            this.velocity.x = 0
            this.position.x = collisionBlock.position.x - this.width - 0.01
            break
          }
  
          if (this.velocity.x < 0) {
            this.velocity.x = 0
            this.position.x = collisionBlock.position.x + collisionBlock.height + 0.01
            break
          }
        }
      }
    }

    applyGravity() {
      this.position.y += this.velocity.y
      this.velocity.y += gravity
  }

  checkForVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y - this.height - 0.01
          break
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
          break
        }
      }
    }
  }

}