import React from 'react';
import drawChords from './drawChords';

export default class Chord extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var chordImage = <div className='chord__image' ref={ this.drawChord } data-chord-name={ this.props.chordName } data-positions="xx0232" data-fingers="---132" data-size="4" />;

    return (
      <div className={ 'chord ' + this.props.className} data-chord-name={ this.props.chordName } >
        { chordImage }
      </div>
    );
  }

  drawChord(element) {
    if (element) {
      drawChords.replace(element);
    }
  }

  static allChords() {
    return [
      'Am',
      'B7',
      'C',
      'C7',
      'D',
      'Dm',
      'E',
      'Em',
      'F',
      'Fm7',
      'G',
      'G7'
    ];
  }

  static chordsColumn(props) {
    let chords = props.chords.map((chord, index) => {
      return (
        <Chord
          key={ index + '_' + chord }
          chordName={ chord }
          className={ props.selectedChord == chord ? 'chord--selected' : '' } />
      );
    });

    return (
      <div className='chords-column' onClick={ props.onClick } data-display-position={ props.displayPosition }>
        { chords }
      </div>
    );
  }

}
