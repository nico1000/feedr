import React from 'react';
import * as Chord from './Chord';

const dispStates = {
  PAIRS: 'PAIRS',
  PAIR_NEW: 'PAIR_NEW',
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <Pairs />
      );
  }

}

class Pairs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dispState: dispStates.PAIRS,
      currentPairs: this.getStoredPairs(),
      selectedChord: '',
    };

  }

  componentDidMount() {
    console.log('Pairs.componentDidMount()');
  }

  // addPair = () => {
  //   this.setState({ dispState: dispStates.PAIR_NEW });
  // }

  createNewPair(chordName1, chordName2) {

    // let newPairs = this.state.currentPairs.slice();
    //
    // newPairs.push({
    //   'chord1': chordName1,
    //   'chord2': chordName2,
    //   'records': [],
    // });
    //
    // this.setState({ currentPairs: newPairs });
    // this.storePairs(newPairs);
  }

  availableChords() {
    let allChords = Chord.allChords();

    let availableChords = {
      left: allChords,
      right: allChords,
    }

    return availableChords;
  }

  storePairs(pairsToStore) {
    if (storageAvailable('localStorage')) {
      console.log('storing into localStorage');
      window.localStorage.setItem('pairs', JSON.stringify(pairsToStore));
    }
    else {
      console.log('localStorage not available');
    }
  }

  getStoredPairs() {
    // default if no saved values available
    let defaultPairs = [
      {
        'chord1': 'Fm7',
        'chord2': 'G',
        'records': [26, 33, 49, 55, 56, 63, 49, 55, 56, 62],
      },
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

    if (storageAvailable('localStorage')) {
      let storedPairsJson = window.localStorage.getItem('pairs');
      if (storedPairsJson) {
        console.log('reading from localStorage');
        return JSON.parse(storedPairsJson);
      }
    }

    return defaultPairs;
  }

  render() {
    let storedPairs = this.state.currentPairs.map((currentPair, index) => {
      return (
        <Pair
          key={ index + '_' + currentPair.chord1 + currentPair.chord2 }
          chord1={ currentPair.chord1 }
          chord2={ currentPair.chord2 }
          records={ currentPair.records } />
      );
    });

    if (this.state.dispState == dispStates.PAIRS) {
      return (
        <div className="pairs">
          { storedPairs }
          <PairAdd onClick={ () => { this.setState({ dispState: dispStates.PAIR_NEW }); } } />
        </div>
      );
    }
    else if (this.state.dispState == dispStates.PAIR_NEW) {
      return (
        <div className="pair__new">
          <Chord.chordChoose availableChords={ this.availableChords().left } />
          <Chord.chordChoose availableChords={ this.availableChords().right } />
        </div>
      );
    }
    else {
      return (
        <span>nothing to display</span>
      );
    }
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
      <div className="pair__chords">
        <div className="pair__add" onClick={ props.onClick }>Add pair!</div>
      </div>
    </div>
  )
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}
