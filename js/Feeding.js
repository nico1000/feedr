import React from 'react';
import DateFormat from 'dateformat';

export default class Feeding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let endTime = (
      <div className="feeding__end-time">
        <div className="feeding__icon feeding__icon--minus" data-time-end data-time-delta="-1" onClick={ this.props.timeChangeFn }><i className="fa fa-minus-circle" /></div>
        <div>{ DateFormat(this.props.feed.endTime, "HH:MM") }</div>
        <div className="feeding__icon feeding__icon--plus" data-time-end data-time-delta="1" onClick={ this.props.timeChangeFn }><i className="fa fa-plus-circle" /></div>
      </div>
    );

    return (
      <div className={ "feeding feeding--" + (this.props.running ? 'running' : 'editing') }>
        <div className={ "feeding__side feeding__side--" + this.props.feed.side }>{ this.props.feed.side }</div>
        <div className="feeding__start-time">
          <div className="feeding__icon feeding__icon--minus" data-time-start data-time-delta="-1" onClick={ this.props.timeChangeFn }><i className="fa fa-minus-circle" /></div>
          <div>{ DateFormat(this.props.feed.startTime, "HH:MM") }</div>
          <div className="feeding__icon feeding__icon--plus" data-time-start data-time-delta="1" onClick={ this.props.timeChangeFn }><i className="fa fa-plus-circle" /></div>
        </div>

        <div className="feeding__duration">{ Feeding.prettyDuration(this.props.feed.startTime, this.props.feed.endTime) }</div>

        { !this.props.running && endTime }

        <div className="feeding__icons">
          <div className="feeding__icon feeding__icon--cancel" onClick={ this.props.cancelFn } >
            <i className="fa fa-trash" />
          </div>
          <div className="feeding__icon feeding__icon--save" onClick={ this.props.saveFn } >
            <i className="fa fa-check" />
          </div>
        </div>
      </div>
    );
  }

  static prettyDuration(startTime, endTime) {
    let duration = Math.floor((endTime - startTime) / 1000);

    if (Math.abs(duration) < 60) {
      return duration + '’’';
    } else {
      return Math.floor(duration / 60) + '’';
    }
  }
}
