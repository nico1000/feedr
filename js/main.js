require('../scss/main.scss');
require('../node_modules/font-awesome/scss/font-awesome.scss');

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
  ReactDOM.render(<App />, $('#root'));

});

function fontsHaveLoaded() {
}
