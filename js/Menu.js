import React from 'react';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className='menu'>
        <li className='menu__item menu__item--title'>Chord trainer</li>
        { this.props.children }
      </ul>
    );
  }

  static item(props) {
    return (
      <li className='menu__item' onClick={ props.onClick } >{ props.title}</li>
    )
  }
}
