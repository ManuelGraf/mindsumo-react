import React from "react";
import { ArenaType } from "./game/Arena";
import { SceneEvents } from "./game/Events";
import PhaserGame from "./game/PhaserGame";
import './HUD.css';
export interface HUDProps{
  game:PhaserGame|null,
  onBack: ()=>void
  onFinishScore?: (score:number)=>void
}
export interface HUDState{
  score:number
  finished:boolean
  mobCount:number,
  mode:ArenaType|null,
  registered:boolean
}
export class HUD extends React.Component<HUDProps,HUDState>{
  state: HUDState = {
    registered:false,
    score: 0,
    finished:false,
    mobCount:0,
    mode:null
  };

  render(){
    return (<div className="hud" id="hud">
      {!this.state.finished && (
        <div className="in-game">
          <button onClick={this.back.bind(this)} className="back">BACK</button>
          <span className="score">Score: {this.props.game?.gameScene?.score}</span>
        </div>
      )}
    </div>)
  }
  back(){
    this.props.onBack();
  }
  componentWillUpdate(){
    console.log('will update hud')
  }
  componentDidUpdate(prevProps){
    console.log('change',prevProps,this.props)
    if(this.props.game && !prevProps.game){
      console.log('scene changed',this.props.game.gameScene);
      this.props.game?.gameScene?.events.on(SceneEvents.Score,this.onScored.bind(this))
      this.props.game?.gameScene?.events.on(SceneEvents.Leak,this.onLeaked.bind(this))
      this.props.game?.gameScene?.events.on(SceneEvents.WaveFinished,this.onFinish.bind(this))
      this.props.game?.gameScene?.events.on(SceneEvents.WaveStarted,this.onWaveStarted.bind(this))
      this.setState({registered:true});
      }
    }
  componentWillUnmount(){
    if(this.props.game){
      this.props.game?.gameScene?.events.off(SceneEvents.Score,this.onScored.bind(this))
      this.props.game?.gameScene?.events.off(SceneEvents.Leak,this.onLeaked.bind(this))
      this.props.game?.gameScene?.events.off(SceneEvents.WaveFinished,this.onFinish.bind(this))
      this.props.game?.gameScene?.events.off(SceneEvents.WaveStarted,this.onWaveStarted.bind(this)) 
    }
  }
  onScored(){
    console.log('hud scored');
    this.increment('score');
  }
  increment(key){
    this.setState((prevState,props)=>{
      let obj = {};
      obj[key] = prevState[key]+1
      return obj 
    })
  }
  decrement(key){
    this.setState((prevState,props)=>{
      let obj = {};
      obj[key] = prevState[key]-1
      return obj 
    })
  }
  onLeaked(){
    this.decrement('score');
  }
  onFinish(){
    if(this.props.onFinishScore){
      this.setState({finished:true});
      this.props.onFinishScore(this.state.score)  
    }
  }
  onWaveStarted({count,mode}){
    this.setState({finished:false,mobCount:count,mode});
  }
}
export default HUD;