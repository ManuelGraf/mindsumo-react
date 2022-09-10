import React from "react";
import "./ScoreBoard.css";
export interface ScoreBoardProps{
}
export interface ScoreBoardState{
  savedScores:{score:number,date:number}[]
}
export class ScoreBoard extends React.Component<ScoreBoardProps,ScoreBoardState>{
  state: ScoreBoardState = {
    savedScores:[]
  };

  render(){
    return (<div className="score-board">
      <ul className="scores">
        {this.state.savedScores.map((e, i) => { return(
          <li className="score-item" key={i}>
            <span>{e.score}</span>
            <span>{new Date(e.date).toISOString()}</span>
          </li>
        )})}
      </ul>
    </div>)
  }
  componentDidUpdate(prevProps){
  }
}
export default ScoreBoard;