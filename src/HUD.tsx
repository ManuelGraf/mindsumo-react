import React from "react";
import { SceneEvents } from "./game/Events";
import GameScene from "./game/GameScene";
import ScoreBoard from "./ScoreBoard";
import StorageService from "./StorageService";
export interface HUDProps{
  scene:GameScene,
  onBack: ()=>void
}
export interface HUDState{
  score:number
  finished:boolean
}
export class HUD extends React.Component<HUDProps,HUDState>{
  state: HUDState = {
    score: 0,
    finished:false
  };

  render(){
    return (<div className="hud" id="hud">
      {!this.state.finished && (
        <div className="score-screen">
          <p className="score-screen__score">Your Score: {this.state.score}</p>
          <ScoreBoard currentScore={this.state.score}/>
        </div>
      )}
      {this.state.finished && (
        <div className="in-game">
          <button onClick={this.back} className="back">BACK</button>
          <span className="score">Score: {this.state.score}</span>
        </div>
      )}
    </div>)
  }
  back(){
    this.props.onBack();
  }

  componentDidUpdate(prevProps){
    if(prevProps.scene !== this.props.scene){
      this.props.scene.events.on(SceneEvents.Score,this.onScored.bind(this))
      this.props.scene.events.on(SceneEvents.Leak,this.onLeaked.bind(this))
      this.props.scene.events.on(SceneEvents.WaveFinished,this.onFinish.bind(this))
    }
  }
  onScored(){
    this.setState((prev,props)=>({
      score: prev.score+1
    }));
  }
  onLeaked(){
    this.setState((prev,props)=>({
      score: prev.score-1
    }));
  }
  onFinish(){
    StorageService.saveScore(this.state.score); 
    this.back();   
  }

}
export default HUD;