import React from 'react';
import pckg from '../package.json';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    document.addEventListener('click', this.menuClickHandler)
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.menuClickHandler)
  };

  menuClickHandler = (e) => {
    if (e.target.closest('.menu__toggle')) {
      $('.menu__nav').classList.toggle('menu__nav--open');
    }
    else if (e.target.closest('.menu__nav')) {
      // do nothing
    }
    else {
      $('.menu__nav').classList.remove('menu__nav--open');
    }
  };

  render() {
    return (
      <div className='menu'>
        <div className='menu__title'>Feedr</div>
        <div className='menu__toggle'><i className='fa fa-bars'></i></div>
        <ul className='menu__nav'>
          <li className='menu__item'>v.{ pckg.version }</li>
          { this.props.children }
        </ul>
      </div>
    );
  }

  static item(props) {
    return (
      <li className='menu__item' onClick={ props.onClick } >{ props.title}</li>
    )
  }
}
