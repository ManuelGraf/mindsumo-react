import Phaser from 'phaser';
import GameScene from './GameScene';
import LoaderScene from './LoaderScene';


const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  zoom: 1,
  autoFocus: true,
  input: {
    keyboard: true,
    gamepad: true,
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    min: {
      width: 600,
      height: 600,
    },
    max: {
      width: 4096,
      height: 2600,
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
      debug: true,
    },
  },
  scene: [LoaderScene, GameScene],
};

export default new Phaser.Game(config)