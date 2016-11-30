import React from 'react';

export default class Chord extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='chord'>
        { this.props.chordName }
      </div>
    );
  }

}

export function ChordChoose() {
  return (
    <div className='chord-choose'>
      <Chord chordName='1' />
      <Chord chordName='2' />
      <Chord chordName='3' />
      <Chord chordName='4' />
      <Chord chordName='5' />
      <Chord chordName='6' />
      <Chord chordName='7' />
      <Chord chordName='8' />
      <Chord chordName='9' />
      <Chord chordName='10' />
      <Chord chordName='11' />
      <Chord chordName='12' />
      <Chord chordName='13' />
      <Chord chordName='14' />
    </div>
  );
}