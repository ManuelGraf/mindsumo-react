import Phaser from 'phaser';
import GameScene from './GameScene';
import LoaderScene from './LoaderScene';

export class PhaserGame extends Phaser.Game{
  constructor(){
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
    
    super(config);
  }
  onSceneReady(){
    return new Promise((resolve,reject)=>{

    })
  }
  get gameScene():GameScene{
    return this.scene.keys.game as GameScene
  }
}
export default PhaserGame;
