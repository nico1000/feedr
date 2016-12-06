import React from 'react';

export default class Chord extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='chord' >
        { this.props.chordName }
      </div>
    );
  }

}

export function allChords() {
  return [
    // 'A',
    // 'B',
    // 'C',
    // 'D',
    // 'E',
    'Am',
    'Fm7',
    'C',
    'G',
    // 'B7',
    // 'C',
    // 'C7',
    // 'D',
    // 'Dm',
    // 'E',
    // 'Em',
    // 'F',
    // 'Fm7',
    // 'G',
    // 'G7'
  ];
}

export function chordChoose(props) {

  let availableChords = props.availableChords.map((chord, index) => {
    return (
      <Chord
        key={ index + '_' + chord }
        chordName={ chord } />
    );
  });

  return (
    <div className='chord-choose' onClick={ props.onClick }>
    { availableChords }
    </div>
  );
}
