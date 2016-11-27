import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <Pair />
    );
  }
  
}

function Pair(props) {
  return (
    <div className="pair">
      <PairChords />
      <PairRecords />
    </div>
  );
}

function PairChords(props) {
  return (
    <div className="pair__chords">
      <PairChord value='Am' />
      <PairChord value='C' />
    </div>
  );
}

function PairChord(props) {
  return (
    <div className="pair__chord pair__chord--{ props.value }">{ props.value }</div>
  )
}

function PairRecords(props) {
  return (
    <div className="pair__records">
      <PairRecord value='1' />
      <PairRecord value='2' />
      <PairRecord value='3' />
      <PairRecord value='4' />
    </div>
  );
}

function PairRecord(props) {
  return (
    <div className="pair__record pair__chord--{ props.value }">{ props.value }</div>
  )
}
