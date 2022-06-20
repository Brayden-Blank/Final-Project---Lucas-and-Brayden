/* global Phaser */

// Copyright (c) 2022 Brayden Blank all rights reserved
//
// Created by Brayden Blank
// Created on: April 2022
//This is a menu scene

/**
 * This class is the Menu Scene
 */
class InstructionsScene extends Phaser.Scene {
  /**
   * This method is the construtor
   */
  constructor() {
    super({ key: "instructionsScene" })

    this.instructionsSceneBackgroundImage = null
    this.startButton = null
  }

  /**
   * Can be defined on your own Scenes.
   * This method is called by the Scene Manager when the scene starts,
   * before preload() and create().
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  init(data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to load assets.
   */
  preload() {
    console.log("Instructions Scene")
    this.load.image(
      "instructionsSceneBackground",
      "assets/instructionsScene.png"
    )
    this.load.image("startButton", "assets/start.png")
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to create your game objects.
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create(data) {
    this.menuSceneBackgroundImage = this.add
      .sprite(0, 0, "instructionsSceneBackground")
      .setScale(1.2)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add
      .sprite(1920 / 2, 1080 / 2 + 80, "startButton")
      .setScale(0.65)
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.clickButton())
  }

  /**
   * Should be overriden by your own Scenes.
   * This method is called once per game step while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {
    //pass
  }

  /**
   * Load into the game!
   */
  clickButton() {
    this.scene.start("gameScene")
  }
}

export default InstructionsScene
