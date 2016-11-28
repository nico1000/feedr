import React from 'react';

const dispStates = {
  PAIRS: 'PAIRS',
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispState: dispStates.PAIRS,
    };
  }
  render() {
    if (this.state.dispState == dispStates.PAIRS) {
      return (
        <Pairs />
      );
    } else {
      return (
        <span>nothing to display</span>
      );
    }
  }

}

class Pairs extends React.Component {
  constructor(props) {
    super(props);
  }

  addPair() {
    console.log('addPair()');
  }

  getSavedPairs() {
    return [
      {
        'chord1': 'Am',
        'chord2': 'C',
        'records': [24, 26, 33, 49, 55],
      },
      {
        'chord1': 'Fm7',
        'chord2': 'G',
        'records': [26, 33, 49, 55, 56, 62],
      },
    ];
  }

  render() {
    let savedPairs = this.getSavedPairs().map((currentPair, index) => {
      return (
        <Pair
          key={ currentPair.chord1 + currentPair.chord2 }
          chord1={ currentPair.chord1 }
          chord2={ currentPair.chord2 }
          records={ currentPair.records } />
      );
    });

    return (
      <div className="pairs">
        { savedPairs }
        <PairAdd onClick={this.addPair} />
      </div>
    );
  }

}

function Pair(props) {
  return (
    <div className="pair">
      <PairChords chord1={ props.chord1 } chord2={ props.chord2 } />
      <PairRecords records={ props.records }/>
    </div>
  );
}

function PairChords(props) {
  return (
    <div className="pair__chords">
      <PairChord chordName={ props.chord1 } />
      <PairChord chordName={ props.chord2 } />
    </div>
  );
}

function PairChord(props) {
  return (
    <div className="pair__chord">{ props.chordName }</div>
  )
}

function PairRecords(props) {
  let records = props.records.map((repetitions, index) => {
    return (
      <PairRecord key={ index } repetitions={ repetitions } />
    );
  });

  return (
    <div className="pair__records">
      { records }
    </div>
  );
}

function PairRecord(props) {
  return (
    <div className="pair__record">{ props.repetitions }</div>
  )
}

function PairAdd(props) {
  return (
    <div className="pair">
      <div className="pair__add" onClick={ props.onClick }>Add pair!</div>
    </div>
  )
}
