import React from 'react';
import { ArenaType } from './game/Arena';
import { SceneEvents } from './game/Events';
import GameScene from './game/GameScene';
import ScoreBoard from './ScoreBoard';
import './Splash.css';
import StorageService from './StorageService';

export class Splash extends React.Component {
  state: Readonly<{
    mode: ArenaType|null,
    highscores,
    isVisibleModeSelect : boolean,
    isVisibleStart : boolean,
    isVisibleScores: boolean,
  }>;  
  props: {
    scene: GameScene|null,
    onModeSelected: (type: string) => void;
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisibleModeSelect : false,
      isVisibleScores: false,
      isVisibleStart : true,
      highscores: StorageService.getHighScores(50),
      mode: null,
    };
  }
  render() {
    return (
      <div className={`splash ${!(this.state.isVisibleStart || this.state.isVisibleModeSelect || this.state.isVisibleScores) ? 'hidden':''}`}>
        <div className={`intro ${!this.state.isVisibleStart ? 'hidden':''}`}>
          <div className="intro__title">MIND SUMO</div>
          <button onClick={this.startModeSelect.bind(this)} className="button">
            START
          </button>
          <button onClick={this.showScores.bind(this)} className="button">
            scores
          </button>
        </div>
        {this.state.isVisibleModeSelect && (
          <div className="mode-select">
            <div className="intro__title">mode</div>
            <button className="button"
              onClick={(e) => this.onModeSelect(ArenaType.Color)}>Color</button>
            <button className="button"
              onClick={(e) => this.onModeSelect(ArenaType.Multiply)}>Multiply</button>
          </div>
        )}
        <div className={`score-screen ${this.state.isVisibleScores ? '' : 'hidden'}`}>
          <div className="score-screen__scores">
          <p className="score-screen__score">Score: {this.props.scene?.score}</p>
          <ScoreBoard scores={this.state.highscores}/>
          </div>
          <button className="button" onClick={this.startModeSelect.bind(this)}>new</button>
        </div>

      </div>
    );
  }
  startModeSelect() {
    this.setState({
      isVisibleModeSelect: true,
      isVisibleStart: false,
      isVisibleScores:false
    })
  }
  showScores(){
    this.setState({
      isVisibleModeSelect:false,
      isVisibleStart: false,
      isVisibleScores:true
    })
  }
  onModeSelect(type: ArenaType) {
    this.setState({score:0});
    switch (type) {
      case ArenaType.Color:
        break;
        case ArenaType.Multiply:
          break;
        }
        this.props.onModeSelected(type);
        this.setState({
          mode:type,
          isVisibleModeSelect: false,
        })
        this.props.scene?.startMode(type,50);

  }
  componentDidUpdate(prevProps){
    if(this.props.scene && prevProps.scene !== this.props.scene){
      this.props.scene?.events.on(SceneEvents.WaveFinished,this.onWaveFinished,this)
    }
  }
  onWaveFinished(score){
    console.log('wave finished')
    StorageService.saveScore(this.props.scene?.score); 
    this.setState({
      isVisibleModeSelect:false,
      isVisibleScores:true,
      isVisibleStart:false
    })
  }
  resume(){
    this.setState({
      isVisibleModeSelect:true,
      isVisibleScores:false,
      isVisibleStart:false,
    })
  }
}
export default Splash;
