import React from 'react';
import Chord from './Chord';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      running: false,
      time: -5
    };
  }
  render() {

    let countdownInfo;

    if (this.state.started == false) {
      countdownInfo = (
        <div className="countdown__info">
          <div className="countdown__icon" onClick={ this.props.saveFn } >
            <i className="fa fa-clock-o" />
          </div>
          <div className="countdown__icon" onClick={ this.props.saveFn } >
            <i className="fa fa-times" />
          </div>
        </div>

      );
    }
    else if (this.state.running == true) {
      countdownInfo = (
        <div className="countdown__info">
          <span className="countdown__time">{ Math.abs(this.state.time) }</span>
        </div>
      );
    }
    else {
      countdownInfo = (
        <div className="countdown__info">
          <form onSubmit={ this.props.saveFn } >
            <input type="number" className="countdown__result" />
          </form>
          <div className="countdown__icon countdown__icon--save" onClick={ this.props.saveFn } >
            <i className="fa fa-floppy-o" />
          </div>
        </div>
      );
    }

    return (
      <div className="countdown">
        <div className="countdown__chords" >
          <Chord chordName={ this.props.chord1 } />
          <Chord chordName={ this.props.chord2 } />
        </div>
        { countdownInfo }
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
    $('.countdown').classList.add('countdown--start-animation');
  }

  componentWillUnmount() {
    console.log('bye');
    clearInterval(this.interval);
  }

  updateTime = () => {
    if (this.state.time >= (process.env.NODE_ENV == 'production' ? 60 : 5)) {
      clearInterval(this.interval);
      this.setState({ running: false });
    }

    this.setState({ time: this.state.time + 1 });
  }
}
