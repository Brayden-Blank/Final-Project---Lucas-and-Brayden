/* global Phaser */

// Copyright (c) 2022 Brayden Blank all rights reserved

// Created on: April-May 2022
// This is the Game Scene

class GameScene extends Phaser.Scene {
  // create an asteroid
  createAsteroid() {
    const asteroidXLocation = Math.floor(Math.random() * 1920) + 1
    let asteroidXVelocity = Math.floor(Math.random() * 5) + 1
    asteroidXVelocity *= Math.round(Math.random()) ? 1 : -1
    const anAsteroid = this.physics.add.sprite(
      asteroidXLocation,
      -100,
      "asteroid"
    )
    anAsteroid.body.velocity.y = 200
    anAsteroid.body.velocity.x = asteroidXVelocity
    this.asteroidGroup.add(anAsteroid)
  }

  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.ship = null
    this.fireMissile = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
    }
    this.gameOverTextStyle = {
      font: "65px Arial",
      fill: "#ff0000",
      align: "center",
    }
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log("Game Scene")

    // images
    this.load.image("deathStarBackground", "assets/deathStarBackground.png")
    this.load.image("millenniumFalcon", "assets/millenniumFalcon.png")
    this.load.image("asteroid", "assets/asteroid.png")
    //sound
    this.load.audio("backgroundMusic", "assets/backgroundMusic.mp3")
    this.load.audio("shipExploding", "assets/shipExploding.wav")
  }

  create(data) {
    this.background = this.add.image(0, 0, "deathStarBackground").setScale(2.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(
      10,
      10,
      "Score: " + this.score.toString(),
      this.scoreTextStyle
    )

    this.millenniumFalcon = this.physics.add.sprite(
      1920 / 2,
      1080 - 100,
      "millenniumFalcon"
    )

    // create a group for the asteroids
    this.asteroidGroup = this.add.group()
    this.createAsteroid()

    // Collisions between millenniumFalcon and asteroids
    this.physics.add.collider(
      this.millenniumFalcon,
      this.asteroidGroup,
      function (millenniumFalconCollide, asteroidCollide) {
        this.sound.play("shipExploding")
        this.physics.pause()
        asteroidCollide.destroy()
        millenniumFalconCollide.destroy()
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over!\nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.score = 0
        this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
      }.bind(this)
    )
  }

  update(time, delta) {
    // called 60 times a second, hopefully!

    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keyUpObj = this.input.keyboard.addKey("UP")
    const keyDownObj = this.input.keyboard.addKey("DOWN")

    if (keyLeftObj.isDown === true) {
      this.millenniumFalcon.x -= 15
      if (this.millenniumFalcon.x < 0) {
        this.millenniumFalcon.x = 0
      }
    }

    if (keyRightObj.isDown === true) {
      this.millenniumFalcon.x += 15
      if (this.millenniumFalcon.x > 1920) {
        this.millenniumFalcon.x = 1920
      }
    }

    if (keyUpObj.isDown === true) {
      this.millenniumFalcon.y -= 6
      if (this.millenniumFalcon.y < 700) {
        this.millenniumFalcon.y = 700
      }
    }

    if (keyDownObj.isDown === true) {
      this.millenniumFalcon.y += 6
      if (this.millenniumFalcon.y > 1080) {
        this.millenniumFalcon.y = 1080
      }
    }
  }
}

export default GameScene