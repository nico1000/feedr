require('../scss/main.scss');
require('../node_modules/blissfuljs/bliss.js');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

var WebFont = require('webfontloader');

WebFont.load({
  google: {
    families: ['Raleway:400,700'],
  },
  active: fontsHaveLoaded,
});

$.ready().then(function(){

  console.log('hello there react!');
  ReactDOM.render(<App />, $('#root'));


});

function fontsHaveLoaded() {
  // need to way until fonts are ready
  // so they can be used on canvas
  // drawChords.replace();
}

