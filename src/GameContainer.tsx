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
  gameContainer;
  constructor(props){
    super(props);
    this.gameContainer = React.createRef();
  }
  render(){
    return <div id="game" ref={this.gameContainer}></div>
  }
  componentDidMount(){
    console.log('make game in', this.gameContainer.current);
    const game = new PhaserGame(this.gameContainer.current);
    this.setState({
      game
    })
    this.props.gameDidStart(game);
  }
  componentWillUnmount(){
    console.log('destroy game')
    this.state.game?.destroy(true);
  }
}
export default GameContainer