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

    this.state = this.getStoredState();

    if (this.state.dispState == 'FEEDING') {
      // update end time every second
      this.interval = setInterval(this.updateTime, 1000);
    }
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
    }, this.storeState);

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
    this.setState({ dispState: dispStates.LIST }, this.storeState);
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
    }, this.storeState);
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
        delete window.localStorage.feedr_state;
      }

      this.setState(this.getStoredState());
    }
  }

  storeState = () => {
    console.log('storeState()');

    if (storageAvailable('localStorage')) {
      console.log('storing into localStorage');
      window.localStorage.setItem('feedr_state', JSON.stringify(this.state));
    }
    else {
      console.log('localStorage not available');
    }

  };

  getStoredState = () => {
    if (storageAvailable('localStorage')) {
      let storedFeedrJson = window.localStorage.getItem('feedr_state');
      if (storedFeedrJson) {
        console.log('reading from localStorage');
        return JSON.parse(storedFeedrJson);
      }
      else {
        return {
          dispState: dispStates.LIST,
          currentFeeds: [],
          activeFeed: undefined,
        };
      }
    }
  };

  render() {
    let day = 0;
    let daySeparator = undefined;

    // let test = groupArrayByFn(this.state.currentFeeds.reverse(), (item) => {
    //   console.log(DateFormat(item.startTime, "dd.mm.yy"));
    //   return DateFormat(item.startTime, "dd.mm.yy");
    // });
    //
    // console.log(test);
    // window.test = test;
    // window.currentFeeds = this.state.currentFeeds;

    let storedFeeds = this.state.currentFeeds.slice().reverse().map((currentFeed, index) => {
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
          feedIndex={ this.state.currentFeeds.length - index - 1 }
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
            <div className="feeds-add">
              <div className="feeds-add__start feeds-add__start--L" data-side="L" onClick={ this.startFeeding }><i className='fa fa-plus-circle'></i> L</div>
              <div className="feeds-add__start feeds-add__start--Zzz" data-side="Zzz" onClick={ this.startFeeding }><i className='fa fa-plus-circle'></i> Zzz</div>
              <div className="feeds-add__start feeds-add__start--R" data-side="R" onClick={ this.startFeeding }><i className='fa fa-plus-circle'></i> R</div>
            </div>
            { storedFeeds }
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

// http://codereview.stackexchange.com/questions/37028/grouping-elements-in-array-by-multiple-properties
function groupArrayByFn(array, fn)
{
  var groups = {};
  array.forEach( function(item)
  {
    var group = JSON.stringify(fn(item));
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  return Object.keys(groups).map((group) =>
  {
    return groups[group];
  });
}

window.groupArrayByFn = groupArrayByFn;
