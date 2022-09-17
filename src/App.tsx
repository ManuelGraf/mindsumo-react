import React from 'react';
import './App.css';
import { GameEvents } from './game/Events';
import GameScene from './game/GameScene';
import PhaserGame from './game/PhaserGame';
import { GameContainer } from './GameContainer';
import { Splash } from './Splash';
class App extends React.Component {
  state: {
    game:PhaserGame|null,
    scene:GameScene|null,
    gameStarted: boolean,
    activeMode:string|null
  }

  constructor(props){
    super(props);
    this.state={
      game:null,
      scene:null,
      gameStarted:false,
      activeMode:null
    }
  }
  
  render() {
    return(
      <div className='mindsumo-app'>
        <Splash scene={this.state.scene} onModeSelected={this.onModeSelected.bind(this)}></Splash>
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
      game.events.on(GameEvents.sceneReady,(scene)=>{
        this.setState({scene});

      })
    }
  }
}
export default App;
