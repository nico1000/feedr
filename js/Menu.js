import React from 'react';

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
      $('.menu__nav').classList.remove('menu__nav--open');
    }
    else {
      $('.menu__nav').classList.remove('menu__nav--open');
    }
  };

  render() {
    return (
      <div className='menu'>
        <div className='menu__title'>{ this.props.title }</div>
        { this.props.children != undefined && <div className='menu__toggle'><i className='fa fa-bars'></i></div> }
        <ul className='menu__nav'>
          { this.props.children }
        </ul>
      </div>
    );
  }

  static item(props) {
    return (
      <li className='menu__item' onClick={ props.onClick } data-cursor={ props.onClick ? 'pointer' : '' } >
        { props.icon && <i className={ props.icon }></i> }
        <span>{ props.title }</span>
      </li>
    )
  }
}
