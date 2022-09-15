import React from "react";
import { ArenaType } from "./game/Arena";
import { SceneEvents } from "./game/Events";
import GameScene from "./game/GameScene";
import './HUD.css';
export interface HUDProps{
  scene:GameScene|null,
  onBack: ()=>void
}
export interface HUDState{
  scored:boolean,
  leaked:boolean,
  finished:boolean
  mobCount:number,
  mode:ArenaType|null,
  registered:boolean
}
export class HUD extends React.Component<HUDProps,HUDState>{
  state: HUDState = {
    registered:false,
    scored: false,
    leaked: false,
    finished:false,
    mobCount:0,
    mode:null
  };

  render(){
    return (<div className="hud" id="hud">
      {!this.state.finished && (
        <div className="in-game">
          <button onClick={this.back.bind(this)} className="button">BACK</button>
          <span className="score">Wave: {this.props.scene?.mobCount}</span>
          <span className="score">Score: {this.props.scene?.score}</span>
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
    if(this.props.scene && !prevProps.scene){
      console.log('scene changed',this.props.scene);
      this.props.scene.events.on(SceneEvents.Score,this.onScored.bind(this))
      this.props.scene.events.on(SceneEvents.Leak,this.onLeaked.bind(this))
      this.setState({registered:true});
      }
    }
  componentWillUnmount(){
    if(this.props.scene){
      this.props.scene?.events.off(SceneEvents.Score,this.onScored.bind(this))
      this.props.scene?.events.off(SceneEvents.Leak,this.onLeaked.bind(this))
    }
  }
  onScored(){
    console.log('hud scored');
    this.setState({scored:true})
    setTimeout(()=>{
      this.setState({scored:false})
    },1000);
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
    this.setState({leaked:true})
    setTimeout(()=>{
      this.setState({leaked:false})
    },1000);

  }
}
export default HUD;