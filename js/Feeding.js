import React from 'react';
import DateFormat from 'dateformat';

export default class Feeding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
    }
  }

  render() {
    return (
      <div className="feeding">
        <div className={ "feeding__side feeding__side--" + this.props.side }>{ this.props.side }</div>
        <div className="feeding__start-time">
          <div className="feeding__icon feeding__icon--plus" data-start-time-delta="1" onClick={ this.props.startTimeChangeFn }><i className="fa fa-plus-circle" /></div>
          <div>{ DateFormat(this.props.startTime, "HH:MM") }</div>
          <div className="feeding__icon feeding__icon--minus" data-start-time-delta="-1" onClick={ this.props.startTimeChangeFn }><i className="fa fa-minus-circle" /></div>
        </div>

        <div className="feeding__duration">{ this.prettyDuration() }</div>
        <div className="feeding__icons">
          <div className="feeding__icon feeding__icon--save" onClick={ this.props.saveFn } >
            <i className="fa fa-check" />
          </div>
          <div className="feeding__icon feeding__icon--cancel" onClick={ this.props.cancelFn } >
            <i className="fa fa-times" />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime = () => {
    // calculate duration in seconds from milliseconds
    let duration = Math.floor((new Date() - this.props.startTime) / 1000) ;
    this.setState({ duration: duration });
  }

  prettyDuration = () => {
    let duration = this.state.duration;
    if (duration < 60) {
      return duration + '’’';
    } else {
      return Math.floor(duration / 60) + '’';
    }
  }
}
