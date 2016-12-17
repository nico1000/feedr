import React from 'react';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className='menu'>
        <li className='menu__item menu__item--title'>Chord trainer</li>
        <li className='menu__item' onClick={ this.props.addPairFn }>Add pair</li>
        <li className='menu__item' onClick={ this.props.resetFn }>Reset</li>
      </ul>
    );
  }

}
