import React from 'react';
import './App.css';
import GameScene from './game/GameScene';
import PhaserGame from './game/PhaserGame';
import { GameContainer } from './GameContainer';
import HUD from './HUD';
import { Splash } from './Splash';
class App extends React.Component {
  state: {
    game:PhaserGame|null,
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
          <div className={(this.state.game && this.state.activeMode ? "": "hidden")}>
            <HUD  game={this.state.game} onBack={this.back.bind(this)}></HUD>
          </div>
          <div className={(!this.state.activeMode ? "": "hidden")}>
            <Splash game={this.state.game} onModeSelected={this.onModeSelected.bind(this)}></Splash>
          </div>
        <GameContainer gameDidStart={this.onGameStarted.bind(this)} ></GameContainer>
      </div>
    );

  }
  componentDidMount(){
    console.log('app mounted')
  }

  back(){
    this.setState({activeMode:null,gameStarted:false});
    const scene = this.state.game?.scene.keys.game as GameScene;
    scene.clear();
  }
  onModeSelected(mode){
    this.setState({activeMode:mode,gameStarted:true});
  }
  onGameStarted(game:PhaserGame){
    if(game){
      console.log('game created',game,JSON.stringify(game.scene.keys));
      this.setState({game});
    }
  }
}
export default App;
