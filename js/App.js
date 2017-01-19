import React from 'react';
import Chord from './Chord';
import Menu from './Menu';
import Feeding from './Feeding';

import DateFormat from 'dateformat';

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

  startFeeding = (e) => {
    let side = e.target.dataset['side'];
    let startTime = new Date();
    this.setState({
      dispState: dispStates.FEEDING,
      side: side,
      startTime: startTime,
    });
  }


  showCountdown = (e) => {
    let chordIndex = e.target.closest('.pair').dataset['chordIndex'];
    this.setState({
      dispState: dispStates.PAIR_COUNTDOWN,
      currentFeed: chordIndex,
    });
  }

  cancelFeeding = (e) => {
    this.setState({ dispState: dispStates.LIST });
  }

  saveFeeding = (e) => {
    e.preventDefault();

    let repetitions = parseInt($('.feeding__result').value, 10);
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
          <div className="feeds-add">
            <div className="feeds-add__start feeds-add__start--L" data-side="L" onClick={ this.startFeeding }>Start L</div>
            <div className="feeds-add__start feeds-add__start--R" data-side="R" onClick={ this.startFeeding }>Start R</div>
          </div>
        </div>
      );
    }
    else if (this.state.dispState == dispStates.FEEDING) {
      return (
        <div>
          <Menu>
            <Menu.item title={<span><i className="fa fa-times" ></i> Cancel</span>} onClick={ this.cancelFeeding } />
          </Menu>
          <Feeding
            side={ this.state.side }
            startTime={ this.state.startTime }
            saveFn={ this.saveFeeding }
            cancelFn={ this.cancelFeeding }
          />
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
            <Menu.item title={<span><i className="fa fa-times" ></i> Cancel</span>} onClick={ this.cancelFeeding } />
          </Menu>
          <Countdown
            chord1={ this.state.currentFeeds[this.state.currentFeed].chord1 }
            chord2={ this.state.currentFeeds[this.state.currentFeed].chord2 }
            saveFn={ this.saveFeeding }
            cancelFn={ this.cancelFeeding }
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
      <div className="feed__start">{ DateFormat(props.startTime, "HH:MM") }</div>
      <div className={"feed__side feed__side--" + props.side }>{ props.side }</div>
      <div className="feed__duration">{ props.duration + '’' }</div>
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
