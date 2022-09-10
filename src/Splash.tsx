import { Game } from 'phaser';
import React from 'react';
import { ArenaType } from './game/Arena';
import './Splash.css';

export class Splash extends React.Component {
  state: Readonly<{
    isVisibleModeSelect : boolean,
    isVisibleStart : boolean,
    game: Game|null,
    mode: ArenaType|null
  }>;  
  props: {
    onModeSelected: (type: string) => void;
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisibleModeSelect : false,
      isVisibleStart : true,
      game: null,
      mode: null,
    };
  }
  render() {
    return (
      <div className="splash">
        {this.state.isVisibleStart && (
          <div className="intro">
            <div className="intro__title">MIND SUMO</div>
            <button onClick={this.startModeSelect.bind(this)} className="button">
              START
            </button>
          </div>
        )}
        {this.state.isVisibleModeSelect && (
          <div className="intro">
            <div className="intro__title">mode</div>
            <button className="button"
              onClick={(e) => this.onModeSelect(ArenaType.Color)}>Color</button>
            <button className="button"
              onClick={(e) => this.onModeSelect(ArenaType.Multiply)}>Multiply</button>
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
  }
}
export default Splash;
