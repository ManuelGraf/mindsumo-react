import { Game } from 'phaser';
import React from 'react';
import './App.css';
import GameScene from './game/GameScene';
import { GameContainer } from './GameContainer';
import { Splash } from './Splash';

class App extends React.Component {
  state: {
    game:Game|null,
    gameStarted: boolean,
    activeMode:string|null
  }

  constructor(props){
    super(props);
    this.state={
      game:null,
      gameStarted:false,
      activeMode:null
    }
  }
  
  render() {
    return(
      <div className='mindsumo-app'>
        <button className="back">

        </button>
        <Splash onModeSelected={this.onModeSelected.bind(this)}></Splash>
        <GameContainer gameDidStart={this.onGameStarted.bind(this)} ></GameContainer>

      </div>
    );

  }
  onModeSelected(mode){
    if(this.state.game){
      let scene = this.state.game.scene.keys.game as GameScene;
      scene.startMode(mode);
    }
  }
  onGameStarted(g:Game){
    this.setState((state)=>{
      return {game:g}
    });
  }
}
export default App;
