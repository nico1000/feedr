import React from 'react';
import Chord from './Chord';
import Menu from './Menu';

const dispStates = {
  PAIRS: 'PAIRS',
  PAIR_NEW: 'PAIR_NEW',
  PAIR_RECORD: 'PAIR_RECORD',
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
      currentPair: null,
    };

  }

  componentWillMount = () => {
    window.addEventListener('keydown', this.handleKeydown);

    $.delegate(document.body,'animationstart','.pair-record', this.animationEventHandler);
  }

  animationEventHandler = (e) => {
    console.log('animationEventHandler');
    console.log(e.type);

    if (e.animationName == 'record-pair-countdown') {
      setInterval(this.countdown.bind(this, -1, e.elapsedTime), 1000);
    }
  }

  countdown = (direction, elapsedTime) => {
    console.log(direction + ' ' + elapsedTime);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeydown);

    $.unbind(document.body, this.animationEventHandler);
  }

  handleKeydown = (e) => {
    if (e.key == 'Escape' && this.state.dispState == dispStates.PAIR_NEW) {
      this.setState({ dispState: dispStates.PAIRS });
    }
  }

  cancelAddPair = (e) => {
    console.log('cancelAddPair');
    e.stopPropagation();
    this.setState({ dispState: dispStates.PAIRS });
  }

  addPair = () => {
    this.setState({ dispState: dispStates.PAIR_NEW, selectedChords: {left: '', right: ''} });
  }

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


  addRecord = (e) => {
    console.log('addRecord');
    let chordIndex = e.target.closest('.pair').dataset['chordIndex'];
    this.setState({
      dispState: dispStates.PAIR_RECORD,
      currentPair: chordIndex,
    });
  }

  cancelAddRecord = (e) => {
    console.log('cancelAddRecord');
    this.setState({ dispState: dispStates.PAIRS });
  }

  reset = () => {
    if (storageAvailable('localStorage')) {
      delete window.localStorage.pairs;
    }

    this.setState({ currentPairs: this.getStoredPairs() })
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
        'records': [],
      },
      {
        'chord1': 'Fm7',
        'chord2': 'Am',
        'records': [],
      },
      {
        'chord1': 'Am',
        'chord2': 'G',
        'records': [],
      },
      {
        'chord1': 'Fm7',
        'chord2': 'G',
        'records': [],
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

    let storedPairs = this.state.currentPairs.map((currentPair, index) => {
      return (
        <Pair
          key={ index + '_' + currentPair.chord1 + currentPair.chord2 }
          chordIndex={ index }
          chord1={ currentPair.chord1 }
          chord2={ currentPair.chord2 }
          records={ currentPair.records }
          addRecord={ this.addRecord } />
      );
    });

    if (this.state.dispState == dispStates.PAIRS) {
      return (
        <div>
          <Menu>
            <Menu.item title={'Add pair'} onClick={ this.addPair } />
            <Menu.item title={'Reset'} onClick={ this.reset } />
          </Menu>
          <div className="pairs">
            { storedPairs }
          </div>
        </div>
      );
    }
    else if (this.state.dispState == dispStates.PAIR_NEW) {
      return (
        <div>
          <Menu>
            <Menu.item title={'Cancel'} onClick={ this.cancelAddPair } />
          </Menu>
          <div className="columns-container columns-container--select-chords" >
            <Chord.chordsColumn chords={ availableChords.left }  selectedChord={ this.state.selectedChords.left }  onClick={ this.chordSelected } displayPosition={ 'left' } />
            <Chord.chordsColumn chords={ availableChords.right } selectedChord={ this.state.selectedChords.right } onClick={ this.chordSelected } displayPosition={ 'right' } />
          </div>
        </div>
      );
    }
    else if (this.state.dispState == dispStates.PAIR_RECORD) {
      return (
        <div>
          <Menu>
            <Menu.item title={'Cancel'} onClick={ this.cancelAddRecord } />
          </Menu>
          <div className="pair-record" >
            <div className="columns-container pair-record__chords" >
              <Chord.chordsColumn chords={ [this.state.currentPairs[this.state.currentPair].chord1] } displayPosition={ 'left' } />
              <Chord.chordsColumn chords={ [this.state.currentPairs[this.state.currentPair].chord2] } displayPosition={ 'right' } />
            </div>
            <div className="pair-record__info">
              <span className="pair-record__time">hello</span>
            </div>
          </div>
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
    <div className="pair" data-chord-index={ props.chordIndex }>
      <PairChords chord1={ props.chord1 } chord2={ props.chord2 } />
      <PairRecords records={ props.records } addRecord={ props.addRecord } />
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
      <div className="pair__record pair__record--add" onClick={ props.addRecord } ><i className="fa fa-clock-o"></i></div>
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
