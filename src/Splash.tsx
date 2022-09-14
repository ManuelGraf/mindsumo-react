import React from 'react';
import { ArenaType } from './game/Arena';
import { SceneEvents } from './game/Events';
import PhaserGame from './game/PhaserGame';
import ScoreBoard from './ScoreBoard';
import './Splash.css';
import StorageService from './StorageService';

export class Splash extends React.Component {
  state: Readonly<{
    mode: ArenaType|null,
    currentScore:number,
    isVisibleModeSelect : boolean,
    isVisibleStart : boolean,
    isVisibleScores: boolean,
  }>;  
  props: {
    game: PhaserGame|null,
    onModeSelected: (type: string) => void;
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisibleModeSelect : false,
      isVisibleScores: false,
      isVisibleStart : true,
      currentScore:0,
      mode: null,
    };
  }
  render() {
    return (
      <div className="splash">
        <div className={`intro ${!this.state.isVisibleStart ? 'hidden':''}`}>
          <div className="intro__title">MIND SUMO</div>
          <button onClick={this.startModeSelect.bind(this)} className="button">
            START
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
        {this.state.isVisibleScores && (
        <div className="score-screen">
          <p className="score-screen__score">Your Score: {this.state.currentScore}</p>
          <ScoreBoard/>
          <button className="button"> select mode</button>
        </div>
      )}

      </div>
    );
  }
  startModeSelect() {
    this.setState({
      isVisibleModeSelect: true,
      isVisibleStart: false
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
        this.props.game?.gameScene.startMode(type);

  }
  componentDidUpdate(prevProps){
    console.log('update',prevProps)
    if(prevProps.game && prevProps.game !== this.props.game){
  
      this.props.game?.gameScene?.events.on(SceneEvents.WaveFinished,this.onWaveFinished.bind(this))
    }
  }
  onWaveFinished(score){
    StorageService.saveScore(score); 
    this.setState({
      isVisibleModeSelect:false,
      isVisibleScores:true,
      isVisibleStart:false,
      currentScore:score
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
