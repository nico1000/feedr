import React from 'react';

export default class Feeding extends React.Component {
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
          <div className="countdown__icon" onClick={ this.startCountdown } >
            <i className="fa fa-clock-o" />
          </div>
          <div className="countdown__icon" onClick={ this.props.cancelFn } >
            <i className="fa fa-times" />
          </div>
        </div>

      );
    }
    else if (this.state.running == true) {
      countdownInfo = (
        <div className="countdown__info">
          <div className="countdown__time">{ Math.abs(this.state.time) }</div>
        </div>
      );
    }
    else {
      let selectOptions = Array(80).fill(1).map((index, item) => {
        return (
          <option key={ item } value={ item } >{ item }</option>
        );
      });

      countdownInfo = (
        <div className="countdown__info">
          <form onSubmit={ this.props.saveFn } >
            <select className="countdown__result" defaultValue="40">
              { selectOptions }
            </select>
          </form>
          <div className="countdown__icon countdown__icon--save" onClick={ this.props.saveFn } >
            <i className="fa fa-floppy-o" />
          </div>
          <audio autoPlay="true" src={`media/countdown-over-${ Math.floor(Math.random() * 14) + 1 }.mp3`}></audio>
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
  }

  componentWillUnmount() {
    console.log('bye');
    clearInterval(this.interval);
  }

  startCountdown = () => {
    this.interval = setInterval(this.updateTime, 1000);
    $('.countdown').classList.add('countdown--start-animation');

    this.setState({
      started: true,
      running: true,
    })
  }

  updateTime = () => {
    if (this.state.time >= (process.env.NODE_ENV == 'production' ? 60 : 5)) {
      clearInterval(this.interval);
      this.setState({ running: false });
    }

    this.setState({ time: this.state.time + 1 });
  }
}
