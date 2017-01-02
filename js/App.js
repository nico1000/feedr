import React from 'react';
import Chord from './Chord';
import Menu from './Menu';
import Countdown from './Countdown';

const dispStates = {
  PAIRS: 'PAIRS',
  PAIR_NEW: 'PAIR_NEW',
  PAIR_COUNTDOWN: 'PAIR_COUNTDOWN',
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
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('touchstart', this.touchstart);
    window.addEventListener('touchend', this.touchend);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('touchstart', this.touchstart);
    window.removeEventListener('touchend', this.touchend);
  }

  keydown = (e) => {
    if (e.key == 'Escape' && this.state.dispState == dispStates.PAIR_NEW) {
      this.setState({ dispState: dispStates.PAIRS });
    }
  }

  cancelAddPair = (e) => {
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
    let allChords = Chord.allChordNames();
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

    let allChords = Chord.allChordNames();

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
    let chordName = e.target.closest('.chord').dataset['chordName'];
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

  touchstart = (e) => {
    this.longTouch = false;
    this.longTouchTimeout = setTimeout(() => {
      this.longTouch = true;
    }, 1000);
  }

  touchend = (e) => {
    if (this.longTouch) {
      if (e.target.classList.contains('pair__record') && e.target.dataset.hasOwnProperty('recordIndex')) {
          this.deleteRepetition(e);
      }

    }
    this.longTouch = false;
    clearTimeout(this.longTouchTimeout);
  }

  deleteRepetition = (e) => {
    let recordIndex = e.target.dataset['recordIndex'];
    let chordIndex = e.target.closest('.pair').dataset['chordIndex'];

    const updatedPairs = this.state.currentPairs.slice();
    updatedPairs[chordIndex].records.splice(recordIndex, 1);

    this.setState({
      currentPairs: updatedPairs
    });
  }

  startCountdown = (e) => {
    let chordIndex = e.target.closest('.pair').dataset['chordIndex'];
    this.setState({
      dispState: dispStates.PAIR_COUNTDOWN,
      currentPair: chordIndex,
    });
  }

  cancelCountdown = (e) => {
    this.setState({ dispState: dispStates.PAIRS });
  }

  saveCountdown = (e) => {
    e.preventDefault();

    let repetitions = parseInt($('.countdown__result').value, 10);
    if (repetitions > 0) {
      const updatedPairs = this.state.currentPairs.slice();
      updatedPairs[this.state.currentPair].records.push(repetitions);

      this.setState({
        currentPairs: updatedPairs,
        dispState: dispStates.PAIRS
      });
      this.storePairs(updatedPairs);
    }
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
      // {
      //   'chord1': 'Am',
      //   'chord2': 'C',
      //   'records': [],
      // },
      // {
      //   'chord1': 'Fm7',
      //   'chord2': 'Am',
      //   'records': [],
      // },
      // {
      //   'chord1': 'Am',
      //   'chord2': 'G',
      //   'records': [],
      // },
      // {
      //   'chord1': 'Fm7',
      //   'chord2': 'G',
      //   'records': [],
      // },
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
          startCountdown={ this.startCountdown } />
      );
    });

    if (this.state.dispState == dispStates.PAIRS) {
      return (
        <div>
          <Menu>
            <Menu.item title={<span><i className="fa fa-plus" ></i> Add pair</span>} onClick={ this.addPair } />
            <Menu.item title={<span><i className="fa fa-ban" ></i> Reset</span>} onClick={ this.reset } />
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
            <Menu.item title={<span><i className="fa fa-times" ></i> Cancel</span>} onClick={ this.cancelAddPair } />
          </Menu>
          <div className="columns-container columns-container--select-chords" >
            <Chord.chordsColumn chords={ availableChords.left }  selectedChord={ this.state.selectedChords.left }  onClick={ this.chordSelected } displayPosition={ 'left' } />
            <Chord.chordsColumn chords={ availableChords.right } selectedChord={ this.state.selectedChords.right } onClick={ this.chordSelected } displayPosition={ 'right' } />
          </div>
        </div>
      );
    }
    else if (this.state.dispState == dispStates.PAIR_COUNTDOWN) {
      return (
        <div>
          <Menu>
            <Menu.item title={<span><i className="fa fa-times" ></i> Cancel</span>} onClick={ this.cancelCountdown } />
          </Menu>
          <Countdown
            chord1={ this.state.currentPairs[this.state.currentPair].chord1 }
            chord2={ this.state.currentPairs[this.state.currentPair].chord2 }
            saveFn={ this.saveCountdown } />
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
      <PairRecords records={ props.records } startCountdown={ props.startCountdown } />
    </div>
  );
}

function PairChords(props) {
  return (
    <div className="pair__chords">
      <div className="pair__chord">{ props.chord1 }</div>
      <div className="pair__chord">{ props.chord2 }</div>
    </div>
  );
}


function PairRecords(props) {
  let records = props.records.map((repetitions, index) => {
    return (
      <div key={ index } data-record-index={ index } className="pair__record">{ repetitions }</div>
    );
  });

  return (
    <div className="pair__records">
      { records }
      <div className="pair__record pair__record--add" onClick={ props.startCountdown } ><i className="fa fa-clock-o"></i></div>
    </div>
  );
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
