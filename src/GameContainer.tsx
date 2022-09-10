import { Game } from "phaser";
import React from "react";
import GameScene from "./game/GameScene";
import LoaderScene from "./game/LoaderScene";

export class GameContainer extends React.Component{
  config: Phaser.Types.Core.GameConfig = {
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
  props:{
    gameDidStart: (g:Game)=>void
  }
  render(){
    return <div id="#game"></div>
  }
  componentDidMount(){
    let g = new Phaser.Game(this.config);
    this.props.gameDidStart(g);
  }
}
export default GameContainer