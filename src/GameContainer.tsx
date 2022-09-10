import { Game } from "phaser";
import React from "react";

import phaserGame from './game/PhaserGame';

export class GameContainer extends React.Component{
  props:{
    gameDidStart: (g:Game)=>void
  }
  constructor(props){
    super(props);
  }
  render(){
    return <div id="#game"></div>
  }
  componentDidMount(){
    this.props.gameDidStart(phaserGame);
  }
}
export default GameContainer