/* global Phaser */

// Copyright (c) 2022 Brayden Blank all rights reserved

// Created on: April-May 2022
// This is the Game Scene

/**
 * gameScene.js
 */
class GameScene extends Phaser.Scene {
  // create an asteroid
  /**
   * Creating enemies
   */
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

  /**
   * constructor
   */
  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.ship = null
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

  /**
   * background
   */
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  /**
   * images
   */
  preload() {
    console.log("Game Scene")

    // images
    this.load.image("deathStarBackground", "./assets/deathStarBackground.png")
    this.load.image("millenniumFalcon", "./assets/millenniumFalcon.png")
    this.load.image("asteroid", "./assets/asteroid.png")
    //sound
    this.load.audio("backgroundMusic", "./assets/backgroundMusic.mp3")
  }

  /**
   * sprites
   */
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
    this.createAsteroid()
    this.createAsteroid()
    this.createAsteroid()

    // Collisions between millenniumFalcon and asteroids
    this.physics.add.collider(
      this.millenniumFalcon,
      this.asteroidGroup,
      function (millenniumFalconCollide, asteroidCollide) {
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
        this.score = 0
        this.time
        this.backgroundMusic.stop()
      }.bind(this)
    )
    //background backgroundMusic
    this.backgroundMusic = this.sound.add("backgroundMusic", {
      volume: 1,
      loop: true,
    })
    this.backgroundMusic.play()
  }

  /**
   * Controls
   */
  update(time, delta) {
    this.timer += delta
    // called 60 times a second, hopefully!

    const keyLeftObj = this.input.keyboard.addKey("A")
    const keyRightObj = this.input.keyboard.addKey("D")
    const keyUpObj = this.input.keyboard.addKey("W")
    const keyDownObj = this.input.keyboard.addKey("S")

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
      this.millenniumFalcon.y -= 13
      if (this.millenniumFalcon.y < 100) {
        this.millenniumFalcon.y = 100
      }
    }

    if (keyDownObj.isDown === true) {
      this.millenniumFalcon.y += 13
      if (this.millenniumFalcon.y > 1080) {
        this.millenniumFalcon.y = 1080
      }
    }

    this.asteroidGroup.children.each(function (item) {
      if (item.y > 1080) {
        item.x = Math.floor(Math.random() * 1920) + 1
        item.y = -100
      }
    }) 

    // https://gamedev.stackexchange.com/questions/182242/phaser-3-how-to-trigger-an-event-every-1-second
    while (time > 1000) {
      this.score = this.score + 1
      this.time = this.time - 1000
      this.scoreText.setText("Score: " + this.score.toString())
    }
  }
}

export default GameScene
