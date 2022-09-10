import { Game } from "phaser";
import React from "react";

import phaserGame from './game/PhaserGame';
export interface GameContainerProps{
  gameDidStart: (g:Game)=>void
}
export interface GameContainerState{
  game:Game
}

export class GameContainer extends React.Component<GameContainerProps,GameContainerState>{
  render(){
    return <div id="#game"></div>
  }
  componentDidMount(){
    const game = phaserGame;
    this.setState({game})
    this.props.gameDidStart(game);
  }
}
export default GameContainer