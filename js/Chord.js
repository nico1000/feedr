import React from 'react';
import drawChords from './drawChords';

export default class Chord extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var chordImage = (
      <div
        className='chord__image'
        ref={ this.drawChord }
        data-chord-name={ this.props.chordName }
        data-positions={ Chord.allChords()[this.props.chordName].positions }
        data-fingers={ Chord.allChords()[this.props.chordName].fingers }
        data-size="4"
      />
    );

    return (
      <div className={ 'chord ' + this.props.chordName} data-chord-name={ this.props.chordName } >
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
    // thanks to
    // https://www.justinguitar.com/en/CH-000-Chords.php

    return {
      // beginner open chords
      'D':      { positions: 'xx0232', fingers: '---132' },
      'A':      { positions: 'x02220', fingers: '--213-' },
      'E':      { positions: '022100', fingers: '-231--' },
      'G':      { positions: '320003', fingers: '21---3' },
      'C':      { positions: 'x32010', fingers: '-32-1-' },
      'Am':     { positions: 'x02210', fingers: '--321-' },
      'Em':     { positions: '022000', fingers: '-23---' },
      'Dm':     { positions: 'xx0231', fingers: '---231' },

      // dominant 7th open chords
      'G_7':    { positions: '320001', fingers: '32---1' },
      'C_7':    { positions: 'x32310', fingers: '-3241-' },
      'B_7':    { positions: 'x21202', fingers: '-213-4' },
      'A_7':    { positions: 'x02020', fingers: '--1-2-' },
      'D_7':    { positions: 'xx0212', fingers: '---213' },
      'E_7':    { positions: '020100', fingers: '-2-1--' },

      'F':      { positions: '133211', fingers: '134211' },
      'Fmaj_7': { positions: 'xx3210', fingers: '--321-' },

      // suspended open chords

    }
  }

  static allChordNames() {
    let allChords = this.allChords();
    return Object.keys(allChords);
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
