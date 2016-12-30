import React from 'react';
import Chord from './Chord';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true,
      time: -5
    };
  }
  render() {

    const countdownInfo = this.state.running ? (
      <div className="countdown__info">
        <span className="countdown__time">{ Math.abs(this.state.time) }</span>
      </div>
    ) : (
      <div className="countdown__info">
        <form onSubmit={ this.props.saveFn } >
          <input type="number" className="countdown__result" />
        </form>
        <div className="countdown__icon countdown__icon--save" onClick={ this.props.saveFn } >
          <i className="fa fa-floppy-o" />
        </div>
      </div>
    );

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
    if (this.state.time >= 5) {
      clearInterval(this.interval);
      this.setState({ running: false });
    }

    this.setState({ time: this.state.time + 1 });
  }
}
