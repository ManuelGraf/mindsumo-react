import React from "react";
import { ArenaType } from "./game/Arena";
import './Splash.css';

export class Splash extends React.Component{
  isVisibleModeSelect;
  props: Readonly<{
    onModeSelected:(ArenaType)=>void
  }>;
  render(){
    return <div className="splash">
      <div className="intro">
        <div className="intro__title">
          MIND SUMO
        </div>
        <button className="start-game">

        </button>
      </div>
        { this.isVisibleModeSelect && 
      <div className="mode-select">
      <button onClick={(e)=>this.startModeSelect(ArenaType.Color)}></button>
      <button onClick={(e)=>this.startModeSelect(ArenaType.Multiply)}></button>
      </div>
        
        }
    </div>
  }
  startModeSelect(type:ArenaType){
    switch(type){
      case ArenaType.Color:
        break;
      case ArenaType.Multiply:
        break;
    }
    this.props.onModeSelected(type)
  }
}
export default Splash