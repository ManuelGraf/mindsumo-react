import React from "react";

import PhaserGame from './game/PhaserGame';
export interface GameContainerProps{
  gameDidStart: (g:PhaserGame)=>void
}
export interface GameContainerState{
  game:PhaserGame|null
}

export class GameContainer extends React.Component<GameContainerProps,GameContainerState>{
  game:PhaserGame;
  constructor(props){
    super(props);
    console.log('make game');
    this.state = {
      game:new PhaserGame()
    }
  }
  render(){
    return <div id="game"></div>
  }
  componentDidMount(){
    if(this.state.game){
      console.log('game container mounted')
      this.props.gameDidStart(this.state.game);
    }
  }
  componentWillUnmount(){
    console.log('destroy game')
    this.state.game?.destroy(true);
  }
}
export default GameContainer