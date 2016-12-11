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

  componentWillMount = () => {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.key == 'Escape' && this.state.dispState == dispStates.PAIR_NEW) {
      this.setState({ dispState: dispStates.PAIRS });
    }
  }

  // addPair = () => {
  //   this.setState({ dispState: dispStates.PAIR_NEW });
  // }

  createNewPair = (chordName1, chordName2) => {
    let newPairs = this.state.currentPairs.slice();

    newPairs.push({
      'chord1': chordName1,
      'chord2': chordName2,
      'records': [],
    });

    this.setState({ currentPairs: newPairs });
    this.storePairs(newPairs);
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

    pairs.forEach((pair) => {
      if (pair.chord1 == chord || pair.chord2 == chord) {
        count++;
      }
    });

    return count;
  }

  pairExists = (chord1, chord2) => {
    // if one of the chords is empty, return immediately
    if (chord1 == '' || chord2 == '') {
      return false;
    }

    let result = false;
    this.state.currentPairs.forEach((pair) => {
        if ((pair.chord1 == chord1 && pair.chord2 == chord2) ||
            (pair.chord2 == chord1 && pair.chord1 == chord2) ) {
          result = true;
        }
    });

    return result;
  }

  availableChords = () => {
    let availableChords = {
      left: [],
      right: [],
    }

    let allChords = Chord.allChords();

    allChords.forEach((chord, index) => {
      let pairsWithChord = this.countPairsWithChord(this.state.currentPairs, chord);
      if (pairsWithChord < allChords.length - 1 ) {
          if (this.state.selectedChords.right !== chord && !this.pairExists(this.state.selectedChords.right, chord)) {
              availableChords.left.push(chord);
          }
          if (this.state.selectedChords.left !== chord && !this.pairExists(this.state.selectedChords.left, chord)) {
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
    let newSelection = this.state.selectedChords;
    let newDispState = this.state.dispState;

    // if same as already selected do deselect
    if (chordName == this.state.selectedChords[position]) {
      chordName = '';
    }

    newSelection[position] = chordName;

    // check if now complete pair is selected
    if (newSelection.left != '' && newSelection.right != '') {
        this.createNewPair(newSelection.left, newSelection.right);
        newSelection = { left: '', right: '' };
        newDispState = dispStates.PAIRS;
    }

    this.setState({
      selectedChords: newSelection,
      dispState: newDispState,
    });
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

    let availableChords = this.availableChords();
    let addPair;
    if (availableChords.left.length >= 2) {
      addPair = <PairAdd onClick={ () => { this.setState({ dispState: dispStates.PAIR_NEW, selectedChords: {left: '', right: ''} }); } } />
    }

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
          { addPair }
        </div>
      );
    }
    else if (this.state.dispState == dispStates.PAIR_NEW) {

      return (
        <div className="pair__new" >
          <Chord.chordChoose availableChords={ availableChords.left }  selectedChord={ this.state.selectedChords.left }  onClick={ this.chordSelected } displayPosition={ 'left' } />
          <Chord.chordChoose availableChords={ availableChords.right } selectedChord={ this.state.selectedChords.right } onClick={ this.chordSelected } displayPosition={ 'right' } />
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
