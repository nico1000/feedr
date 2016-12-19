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
      return (
        <div className="countdown">
          <div className="countdown__chords" >
            <Chord chordName={ this.props.chord1 } />
            <Chord chordName={ this.props.chord2 } />
          </div>
          <div className="countdown__info">
            { this.state.running ? (
              <span className="countdown__time">{ Math.abs(this.state.time) }</span>
            ) : (
              <span className="countdown__finished">fertig</span>
            )}
          </div>
        </div>
      );
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    console.log('bye');
    clearInterval(this.interval);
  }

  updateTime = () => {
    if (this.state.time >= 10) {
      clearInterval(this.interval);
      this.setState({ running: false });
    }

    this.setState({ time: this.state.time + 1 });
  }
}
