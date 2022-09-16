import Moment from 'moment';
import React from "react";
import "./ScoreBoard.css";
export interface ScoreBoardProps{
  scores:{score:number,date:number}[]
}
export interface ScoreBoardState{
}
export class ScoreBoard extends React.Component<ScoreBoardProps,ScoreBoardState>{
  state: ScoreBoardState = {
    savedScores:[]
  };
  constructor(props:ScoreBoardProps){
    super(props);
  }
  render(){
    return (<div className="score-board">
      <h2>Highscores:</h2>
      <ul className="scores">
        {this.props.scores.map((e, i) => { return(
          <li className="score-item" key={i}>
            <span>{e.score}</span>
            <span> 
              {Moment(e.date).calendar()}</span>
          </li>
        )})}
      </ul>
    </div>)
  }
  componentDidUpdate(prevProps){
  }
}
export default ScoreBoard;