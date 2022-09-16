import Phaser from "phaser";
import GameScene from "./GameScene";
import { Helper } from "./Helper";
import LoaderScene from "./LoaderScene";

export class PhaserGame extends Phaser.Game {
  constructor(parent) {
    console.log("create game in", parent);
    const dim = Helper.screenDimensions;
    const min = Math.min(dim.x, dim.y);

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      zoom: 1,
      autoFocus: true,
      input: {
        keyboard: true,
        gamepad: true,
        mouse: true,
        touch: true,
      },
      transparent: true,
      parent,
      scale: {
        mode: Phaser.Scale.RESIZE,
        min: {
          width: min,
          height: min,
        },
        max: {
          width: 4096,
          height: 4096,
        },
      },
      render: {
        pixelArt: false,
        antialias: true,
        antialiasGL: true,
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      scene: [LoaderScene, GameScene],
    };

    super(config);
  }
  onSceneReady() {
    return new Promise((resolve, reject) => {});
  }
  get gameScene(): GameScene {
    return this.scene.keys.game as GameScene;
  }
}
export default PhaserGame;
