import React from 'react';
import Chord from './Chord';
import Menu from './Menu';
import Feeding from './Feeding';

const dispStates = {
  LIST: 'LIST',
  FEEDING: 'FEEDING',
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
        <Feedr />
      );
  }

}


class Feedr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dispState: dispStates.LIST,
      currentFeeds: this.getStoredFeeds(),
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
    // if (e.key == 'Escape' && this.state.dispState == dispStates.PAIR_NEW) {
    //   this.setState({ dispState: dispStates.PAIRS });
    // }
  }

  cancelAddPair = (e) => {
    e.stopPropagation();
    this.setState({ dispState: dispStates.PAIRS });
  }

  addPair = () => {
    this.setState({ dispState: dispStates.PAIR_NEW, selectedChords: {left: '', right: ''} });
  }

  createNewPair = (chordName1, chordName2) => {
    let newPairs = this.state.currentFeeds.slice();

    newPairs.push({
      'chord1': chordName1,
      'chord2': chordName2,
      'records': [],
    });

    this.setState({ currentFeeds: newPairs });
    this.storeFeeds(newPairs);
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
    this.state.currentFeeds.forEach((pair) => {
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
      let pairsWithChord = this.countPairsWithChord(this.state.currentFeeds, chord);
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

    const updatedPairs = this.state.currentFeeds.slice();
    updatedPairs[chordIndex].records.splice(recordIndex, 1);

    // if it was the last record, delete the pair as well
    if (updatedPairs[chordIndex].records.length == 0) {
        updatedPairs.splice(chordIndex, 1);
    }

    this.setState({
      currentFeeds: updatedPairs
    });
  }

  showCountdown = (e) => {
    let chordIndex = e.target.closest('.pair').dataset['chordIndex'];
    this.setState({
      dispState: dispStates.PAIR_COUNTDOWN,
      currentFeed: chordIndex,
    });
  }

  cancelCountdown = (e) => {
    this.setState({ dispState: dispStates.PAIRS });
  }

  saveCountdown = (e) => {
    e.preventDefault();

    let repetitions = parseInt($('.countdown__result').value, 10);
    if (repetitions > 0) {
      const updatedPairs = this.state.currentFeeds.slice();
      updatedPairs[this.state.currentFeed].records.push(repetitions);

      this.setState({
        currentFeeds: updatedPairs,
        dispState: dispStates.PAIRS
      });
      this.storeFeeds(updatedPairs);
    }
  }

  reset = () => {
    if (storageAvailable('localStorage')) {
      delete window.localStorage.feeds;
    }

    this.setState({ currentFeeds: this.getStoredFeeds() })
  }

  storeFeeds(feedsToStore) {
    if (storageAvailable('localStorage')) {
      console.log('storing into localStorage');
      window.localStorage.setItem('feeds', JSON.stringify(feedsToStore));
    }
    else {
      console.log('localStorage not available');
    }
  }

  getStoredFeeds() {
    // default if no saved values available
    let defaultFeeds = [
      {
        'startTime': new Date(2017, 1, 18, 10),
        'side': 'L',
        'duration': 30,
      },
      {
        'startTime': new Date(2017, 1, 18, 11,),
        'side': 'R',
        'duration': 25,
      }

    ];

    if (storageAvailable('localStorage')) {
      let storedFeedsJson = window.localStorage.getItem('feeds');
      if (storedFeedsJson) {
        console.log('reading from localStorage');
        return JSON.parse(storedFeedsJson);
      }
    }

    return defaultFeeds;
  }

  render() {

    let storedFeeds = this.state.currentFeeds.map((currentFeed, index) => {
      return (
        <Feed
          key={ index }
          feedIndex={ index }
          startTime={ currentFeed.startTime }
          side={ currentFeed.side }
          duration={ currentFeed.duration } />
      );
    });

    if (this.state.dispState == dispStates.LIST) {
      return (
        <div>
          <Menu>
            <Menu.item title={<span><i className="fa fa-ban" ></i> Reset</span>} onClick={ this.reset } />
          </Menu>
          <div className="feeds">
            { storedFeeds }
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
            <Chord.chordsColumn chords={ availableChords.left }  selectedChord={ this.state.selectedChords.left }  chordSelectedFn={ this.chordSelected } displayPosition={ 'left' } />
            <Chord.chordsColumn chords={ availableChords.right } selectedChord={ this.state.selectedChords.right } chordSelectedFn={ this.chordSelected } displayPosition={ 'right' } />
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
            chord1={ this.state.currentFeeds[this.state.currentFeed].chord1 }
            chord2={ this.state.currentFeeds[this.state.currentFeed].chord2 }
            saveFn={ this.saveCountdown }
            cancelFn={ this.cancelCountdown }
          />
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

function Feed(props) {
  return (
    <div className="feed" data-feed-index={ props.feedIndex }>
      <div>Start: { props.startTime.toString() }</div>
    </div>
  );
}

function PairChords(props) {

  return (
    <div className="pair__chords">
      <div className="pair__chord">{ Chord.nicePrint(props.chord1) }</div>
      <div className="pair__chord">{ Chord.nicePrint(props.chord2) }</div>
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
      <div className="pair__record pair__record--add" ><i className="fa fa-clock-o"></i></div>
    </div>
  );
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
