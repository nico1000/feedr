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
      selectedChords: { left: '', right: '' },
    };

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


  allPairs() {
    let allChords = Chord.allChords();
    let allPairs = [];

    for (let i = 0; i < allChords.length - 1; i++ ) {
      for (let j = i + 1; j < allChords.length; j++) {
        allPairs.push({
          chord1: allChords[i],
          chord2: allChords[j]
        });
      }
    }

    return allPairs;
  }

  countPairsWithChord = (pairs, chord) => {
    let count = 0;

    pairs.forEach((pair, index) => {
      if (pair.chord1 == chord || pair.chord2 == chord) {
        count++;
      }
    });

    return count;
  }

  availableChords = () => {
    let availableChords = {
      left: [],
      right: [],
    }

    let allChords = Chord.allChords();

    allChords.forEach((chord, index) => {
      if (this.countPairsWithChord(this.state.currentPairs, chord) < allChords.length - 1 ) {
          if (this.state.selectedChords.right !== chord) {
              availableChords.left.push(chord);
          }
          if (this.state.selectedChords.left !== chord) {
              availableChords.right.push(chord);
          }
      }
    });

    return availableChords;
  }

  chordSelected = (e) => {

    let chordName = e.target.dataset['chordName'];
    let position = e.currentTarget.dataset['displayPosition'];

    // init with previous values
    const newSelection = this.state.selectedChords;

    // if same as already selected do deselect
    if (chordName == this.state.selectedChords[position]) {
      chordName = '';
    }
    else {

    }

    newSelection[position] = chordName;
    this.setState({ selectedChords: newSelection });
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
        'chord1': 'Am',
        'chord2': 'C',
        'records': [24, 26, 33, 49, 55],
      },
      {
        'chord1': 'Fm7',
        'chord2': 'Am',
        'records': [26, 33, 49, 55, 56, 62],
      },
      {
        'chord1': 'Am',
        'chord2': 'G',
        'records': [24, 26, 33, 49, 55],
      },
      {
        'chord1': 'Fm7',
        'chord2': 'G',
        'records': [26, 33, 49, 55, 56, 63, 49, 55, 56, 62],
      },
      // {
      //   'chord1': 'Fm7',
      //   'chord2': 'C',
      //   'records': [26, 33, 49, 55, 56, 62],
      // },
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

      let availableChords = this.availableChords();

      return (
        <div className="pair__new">
          <Chord.chordChoose availableChords={ availableChords.left }  selectedChord={ this.state.selectedChords.left }  onClick={ this.chordSelected.bind(this) } displayPosition={ 'left' } />
          <Chord.chordChoose availableChords={ availableChords.right } selectedChord={ this.state.selectedChords.right } onClick={ this.chordSelected.bind(this) } displayPosition={ 'right' } />
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
