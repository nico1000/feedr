import React from 'react';
import Menu from './Menu';
import Feeding from './Feeding';

import DateFormat from 'dateformat';

const dispStates = {
  LIST: 'LIST',
  FEEDING: 'FEEDING',
  EDITING: 'EDITING',
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
      activeFeed: undefined,
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

  startFeeding = (e) => {

    let newFeed = {
      side: e.target.dataset['side'],
      startTime: (new Date()).getTime(),
      endTime: (new Date()).getTime(),
    }

    this.setState({
      dispState: dispStates.FEEDING,
      activeFeed: newFeed,
    });

    // update end time every second
    this.interval = setInterval(this.updateTime, 1000);

  }

  updateTime = () => {
    // update endTime to now
    let changedFeed = Object.assign({}, this.state.activeFeed);
    changedFeed.endTime = (new Date()).getTime();
    this.setState({ activeFeed: changedFeed });
  }


  timeChange = (e) => {
    let el = e.target.closest('.feeding__icon');
    let delta = parseInt(el.dataset['timeDelta'], 10);
    let changeStartTime = el.dataset['timeStart'];

    let changedFeed = Object.assign({}, this.state.activeFeed);

    if (changeStartTime) {
      let startTimeNew = new Date(this.state.activeFeed.startTime + delta * 1000 * 60);

      // start time must be smaller than end time
      if (startTimeNew < this.state.activeFeed.endTime) {
        changedFeed.startTime = startTimeNew.getTime();
        this.setState({
          activeFeed: changedFeed,
        });
      }
    }
    else {
      let now = new Date();
      let endTimeNew = new Date(this.state.activeFeed.endTime + delta * 1000 * 60);

      // start time must be smaller than end time of course
      if (endTimeNew > this.state.activeFeed.startTime && endTimeNew < now) {
        changedFeed.endTime = endTimeNew.getTime();
        this.setState({
          activeFeed: changedFeed,
        });
      }
    }
  }

  cancelFeeding = (e) => {
    this.setState({ dispState: dispStates.LIST });
    clearInterval(this.interval);

  }

  saveFeeding = (e) => {
    e.preventDefault();
    clearInterval(this.interval);

    let updatedFeeds = this.state.currentFeeds.slice();

    updatedFeeds.push(this.state.activeFeed);

    updatedFeeds.sort((a,b) => {
      return (a.startTime - b.startTime);
    });

    this.setState({
      currentFeeds: updatedFeeds,
      activeFeed: undefined,
      dispState: dispStates.LIST,
    });
    this.storeFeeds(updatedFeeds);
  }

  editFeed = (e) => {
    let feedIndex = e.target.closest('.feed').dataset['feedIndex'];
    let editingFeed = this.state.currentFeeds.splice(feedIndex, 1)[0];

    this.setState({
      activeFeed: editingFeed,
      dispState: dispStates.EDITING,
    });
  }

  reset = () => {
    if (confirm('Do you really want to delete all stored feeds?')) {
      if (storageAvailable('localStorage')) {
        delete window.localStorage.feeds;
      }

      this.setState({ currentFeeds: this.getStoredFeeds() })
    }

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
      // {
      //   'startTime': (new Date(2017, 0, 18, 10)).getTime(),
      //   'endTime': (new Date(2017, 0, 18, 10, 5)).getTime(),
      //   'side': 'L',
      // },
      // {
      //   'startTime': (new Date(2017, 0, 18, 11, 23)).getTime(),
      //   'endTime': (new Date(2017, 0, 18, 11, 35)).getTime(),
      //   'side': 'R',
      // }
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

    let day = 0;
    let daySeparator = undefined;

    let storedFeeds = this.state.currentFeeds.map((currentFeed, index) => {
      let startDay = new Date(currentFeed.startTime).getDay();
      if (startDay != day) {
        day = startDay;
        daySeparator = <div className="feeds__separator">{ DateFormat(currentFeed.startTime, "ddd, dd. mmm") }</div>;
      } else {
        daySeparator = undefined;
      }

      return (
        <div key={ index } >
        { daySeparator }
        <Feed
          feedIndex={ index }
          startTime={ currentFeed.startTime }
          endTime={ currentFeed.endTime }
          side={ currentFeed.side }
          editFeedFn= { this.editFeed } />
        </div>
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
            <div className="feeds__separator">Add new</div>
            <div className="feeds-add">
              <div className="feeds-add__start feeds-add__start--L" data-side="L" onClick={ this.startFeeding }>L</div>
              <div className="feeds-add__start feeds-add__start--Zzz" data-side="Zzz" onClick={ this.startFeeding }>Zzz</div>
              <div className="feeds-add__start feeds-add__start--R" data-side="R" onClick={ this.startFeeding }>R</div>
            </div>

          </div>
        </div>
      );
    }
    else if (this.state.dispState == dispStates.FEEDING) {
      return (
        <div>
          { false && <Menu>
            <Menu.item title={<span><i className="fa fa-times" ></i> Cancel</span>} onClick={ this.cancelFeeding } />
          </Menu> }
          <Feeding
            feed={ this.state.activeFeed }
            running={ true }
            timeChangeFn={ this.timeChange }
            saveFn={ this.saveFeeding }
            cancelFn={ this.cancelFeeding }
          />
        </div>
      );
    }
    else if (this.state.dispState == dispStates.EDITING) {
      return (
        <div>
          <Menu>
          </Menu>
          <Feeding
            feed={ this.state.activeFeed }
            running={ false }
            timeChangeFn={ this.timeChange }
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
    <div className="feed" data-feed-index={ props.feedIndex } onClick={ props.editFeedFn }>
      <div className="feed__start">{ DateFormat(props.startTime, "HH:MM") }</div>
      <div className={"feed__side feed__side--" + props.side }>{ props.side }</div>
      <div className="feed__duration">{ Feeding.prettyDuration(props.startTime, props.endTime) }</div>
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
