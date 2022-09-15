import Moment from 'moment';
import React from "react";
import "./ScoreBoard.css";
import StorageService from "./StorageService";
export interface ScoreBoardProps{
}
export interface ScoreBoardState{
  savedScores:{score:number,date:number}[]
}
export class ScoreBoard extends React.Component<ScoreBoardProps,ScoreBoardState>{
  state: ScoreBoardState = {
    savedScores:[]
  };
  constructor(props:ScoreBoardProps){
    super(props);
    this.state={
      savedScores:StorageService.getHighScores(100)
    }
  }
  render(){
    return (<div className="score-board">
      <h2>Highscores:</h2>
      <ul className="scores">
        {this.state.savedScores.map((e, i) => { return(
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