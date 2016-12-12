require('./scss/main.scss');
require('./node_modules/font-awesome/scss/font-awesome.scss');
require('./node_modules/blissfuljs/bliss.js');

import { Chords } from './js/Chords';

var drawChords = require('./js/drawChords.js');
var WebFont = require('webfontloader');

WebFont.load({
  google: {
    families: ['Raleway:400,700'],
  },
  active: fontsHaveLoaded,
  
});

$.ready().then(function(){

  console.log('hello there');

  console.log(Chords.renderChords());

});

function fontsHaveLoaded() {
  // need to way until fonts are ready
  // so they can be used on canvas
  drawChords.replace();
}