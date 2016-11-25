/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	// require('./js/chords.js');

	console.log('hello there');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/* http://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation */\nhtml {\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n  font: 16px/1 sans-serif; }\n\n*, *:after, *:before {\n  box-sizing: inherit; }\n\nbody {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased; }\n\nh1,\nh2,\nh3,\nh4,\np,\nblockquote,\nfigure,\nol,\nul {\n  margin: 0;\n  padding: 0; }\n\nmain,\nli {\n  display: block; }\n\nh1,\nh2,\nh3,\nh4 {\n  font-size: inherit; }\n\nstrong {\n  font-weight: bold; }\n\na,\nbutton {\n  color: inherit;\n  transition: .3s; }\n\na {\n  text-decoration: none; }\n\nbutton {\n  overflow: visible;\n  border: 0;\n  font: inherit;\n  -webkit-font-smoothing: inherit;\n  letter-spacing: inherit;\n  background: none;\n  cursor: pointer; }\n\n::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\n:focus {\n  outline: 0; }\n\nimg {\n  max-width: 100%;\n  height: auto;\n  border: 0; }\n\n/**\n * Foundation for Sites by ZURB\n * Version 6.2.4\n * foundation.zurb.com\n * Licensed under MIT Open Source\n */\n.row {\n  max-width: 75rem;\n  margin-left: auto;\n  margin-right: auto;\n  display: flex;\n  flex-flow: row wrap; }\n  .row .row {\n    margin-left: -0.625rem;\n    margin-right: -0.625rem; }\n    @media screen and (min-width: 40em) {\n      .row .row {\n        margin-left: -0.9375rem;\n        margin-right: -0.9375rem; } }\n  .row.expanded {\n    max-width: none; }\n  .row.collapse > .column, .row.collapse > .columns {\n    padding-left: 0;\n    padding-right: 0; }\n  .row.is-collapse-child,\n  .row.collapse > .column > .row,\n  .row.collapse > .columns > .row {\n    margin-left: 0;\n    margin-right: 0; }\n\n.column, .columns {\n  flex: 1 1 0px;\n  padding-left: 0.625rem;\n  padding-right: 0.625rem;\n  min-width: initial; }\n  @media screen and (min-width: 40em) {\n    .column, .columns {\n      padding-left: 0.9375rem;\n      padding-right: 0.9375rem; } }\n\n.column.row.row, .row.row.columns {\n  float: none;\n  display: block; }\n\n.row .column.row.row, .row .row.row.columns {\n  padding-left: 0;\n  padding-right: 0;\n  margin-left: 0;\n  margin-right: 0; }\n\n.small-1 {\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.small-offset-0 {\n  margin-left: 0%; }\n\n.small-2 {\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.small-offset-1 {\n  margin-left: 8.33333%; }\n\n.small-3 {\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.small-offset-2 {\n  margin-left: 16.66667%; }\n\n.small-4 {\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.small-offset-3 {\n  margin-left: 25%; }\n\n.small-5 {\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.small-offset-4 {\n  margin-left: 33.33333%; }\n\n.small-6 {\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.small-offset-5 {\n  margin-left: 41.66667%; }\n\n.small-7 {\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.small-offset-6 {\n  margin-left: 50%; }\n\n.small-8 {\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.small-offset-7 {\n  margin-left: 58.33333%; }\n\n.small-9 {\n  flex: 0 0 75%;\n  max-width: 75%; }\n\n.small-offset-8 {\n  margin-left: 66.66667%; }\n\n.small-10 {\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.small-offset-9 {\n  margin-left: 75%; }\n\n.small-11 {\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.small-offset-10 {\n  margin-left: 83.33333%; }\n\n.small-12 {\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n.small-offset-11 {\n  margin-left: 91.66667%; }\n\n.small-order-1 {\n  order: 1; }\n\n.small-order-2 {\n  order: 2; }\n\n.small-order-3 {\n  order: 3; }\n\n.small-order-4 {\n  order: 4; }\n\n.small-order-5 {\n  order: 5; }\n\n.small-order-6 {\n  order: 6; }\n\n.small-up-1 {\n  flex-wrap: wrap; }\n  .small-up-1 > .column, .small-up-1 > .columns {\n    flex: 0 0 100%;\n    max-width: 100%; }\n\n.small-up-2 {\n  flex-wrap: wrap; }\n  .small-up-2 > .column, .small-up-2 > .columns {\n    flex: 0 0 50%;\n    max-width: 50%; }\n\n.small-up-3 {\n  flex-wrap: wrap; }\n  .small-up-3 > .column, .small-up-3 > .columns {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n\n.small-up-4 {\n  flex-wrap: wrap; }\n  .small-up-4 > .column, .small-up-4 > .columns {\n    flex: 0 0 25%;\n    max-width: 25%; }\n\n.small-up-5 {\n  flex-wrap: wrap; }\n  .small-up-5 > .column, .small-up-5 > .columns {\n    flex: 0 0 20%;\n    max-width: 20%; }\n\n.small-up-6 {\n  flex-wrap: wrap; }\n  .small-up-6 > .column, .small-up-6 > .columns {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n\n.small-up-7 {\n  flex-wrap: wrap; }\n  .small-up-7 > .column, .small-up-7 > .columns {\n    flex: 0 0 14.28571%;\n    max-width: 14.28571%; }\n\n.small-up-8 {\n  flex-wrap: wrap; }\n  .small-up-8 > .column, .small-up-8 > .columns {\n    flex: 0 0 12.5%;\n    max-width: 12.5%; }\n\n.small-collapse > .column, .small-collapse > .columns {\n  padding-left: 0;\n  padding-right: 0; }\n\n.small-uncollapse > .column, .small-uncollapse > .columns {\n  padding-left: 0.625rem;\n  padding-right: 0.625rem; }\n\n@media screen and (min-width: 40em) {\n  .medium-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .medium-offset-0 {\n    margin-left: 0%; }\n  .medium-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .medium-offset-1 {\n    margin-left: 8.33333%; }\n  .medium-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .medium-offset-2 {\n    margin-left: 16.66667%; }\n  .medium-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .medium-offset-3 {\n    margin-left: 25%; }\n  .medium-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .medium-offset-4 {\n    margin-left: 33.33333%; }\n  .medium-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .medium-offset-5 {\n    margin-left: 41.66667%; }\n  .medium-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .medium-offset-6 {\n    margin-left: 50%; }\n  .medium-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .medium-offset-7 {\n    margin-left: 58.33333%; }\n  .medium-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .medium-offset-8 {\n    margin-left: 66.66667%; }\n  .medium-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .medium-offset-9 {\n    margin-left: 75%; }\n  .medium-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .medium-offset-10 {\n    margin-left: 83.33333%; }\n  .medium-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .medium-offset-11 {\n    margin-left: 91.66667%; }\n  .medium-order-1 {\n    order: 1; }\n  .medium-order-2 {\n    order: 2; }\n  .medium-order-3 {\n    order: 3; }\n  .medium-order-4 {\n    order: 4; }\n  .medium-order-5 {\n    order: 5; }\n  .medium-order-6 {\n    order: 6; }\n  .medium-up-1 {\n    flex-wrap: wrap; }\n    .medium-up-1 > .column, .medium-up-1 > .columns {\n      flex: 0 0 100%;\n      max-width: 100%; }\n  .medium-up-2 {\n    flex-wrap: wrap; }\n    .medium-up-2 > .column, .medium-up-2 > .columns {\n      flex: 0 0 50%;\n      max-width: 50%; }\n  .medium-up-3 {\n    flex-wrap: wrap; }\n    .medium-up-3 > .column, .medium-up-3 > .columns {\n      flex: 0 0 33.33333%;\n      max-width: 33.33333%; }\n  .medium-up-4 {\n    flex-wrap: wrap; }\n    .medium-up-4 > .column, .medium-up-4 > .columns {\n      flex: 0 0 25%;\n      max-width: 25%; }\n  .medium-up-5 {\n    flex-wrap: wrap; }\n    .medium-up-5 > .column, .medium-up-5 > .columns {\n      flex: 0 0 20%;\n      max-width: 20%; }\n  .medium-up-6 {\n    flex-wrap: wrap; }\n    .medium-up-6 > .column, .medium-up-6 > .columns {\n      flex: 0 0 16.66667%;\n      max-width: 16.66667%; }\n  .medium-up-7 {\n    flex-wrap: wrap; }\n    .medium-up-7 > .column, .medium-up-7 > .columns {\n      flex: 0 0 14.28571%;\n      max-width: 14.28571%; }\n  .medium-up-8 {\n    flex-wrap: wrap; }\n    .medium-up-8 > .column, .medium-up-8 > .columns {\n      flex: 0 0 12.5%;\n      max-width: 12.5%; } }\n\n@media screen and (min-width: 40em) and (min-width: 40em) {\n  .medium-expand {\n    flex: 1 1 0px; } }\n\n.row.medium-unstack > .column, .row.medium-unstack > .columns {\n  flex: 0 0 100%; }\n  @media screen and (min-width: 40em) {\n    .row.medium-unstack > .column, .row.medium-unstack > .columns {\n      flex: 1 1 0px; } }\n\n@media screen and (min-width: 40em) {\n  .medium-collapse > .column, .medium-collapse > .columns {\n    padding-left: 0;\n    padding-right: 0; }\n  .medium-uncollapse > .column, .medium-uncollapse > .columns {\n    padding-left: 0.9375rem;\n    padding-right: 0.9375rem; } }\n\n@media screen and (min-width: 64em) {\n  .large-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .large-offset-0 {\n    margin-left: 0%; }\n  .large-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .large-offset-1 {\n    margin-left: 8.33333%; }\n  .large-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .large-offset-2 {\n    margin-left: 16.66667%; }\n  .large-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .large-offset-3 {\n    margin-left: 25%; }\n  .large-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .large-offset-4 {\n    margin-left: 33.33333%; }\n  .large-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .large-offset-5 {\n    margin-left: 41.66667%; }\n  .large-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .large-offset-6 {\n    margin-left: 50%; }\n  .large-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .large-offset-7 {\n    margin-left: 58.33333%; }\n  .large-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .large-offset-8 {\n    margin-left: 66.66667%; }\n  .large-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .large-offset-9 {\n    margin-left: 75%; }\n  .large-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .large-offset-10 {\n    margin-left: 83.33333%; }\n  .large-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .large-offset-11 {\n    margin-left: 91.66667%; }\n  .large-order-1 {\n    order: 1; }\n  .large-order-2 {\n    order: 2; }\n  .large-order-3 {\n    order: 3; }\n  .large-order-4 {\n    order: 4; }\n  .large-order-5 {\n    order: 5; }\n  .large-order-6 {\n    order: 6; }\n  .large-up-1 {\n    flex-wrap: wrap; }\n    .large-up-1 > .column, .large-up-1 > .columns {\n      flex: 0 0 100%;\n      max-width: 100%; }\n  .large-up-2 {\n    flex-wrap: wrap; }\n    .large-up-2 > .column, .large-up-2 > .columns {\n      flex: 0 0 50%;\n      max-width: 50%; }\n  .large-up-3 {\n    flex-wrap: wrap; }\n    .large-up-3 > .column, .large-up-3 > .columns {\n      flex: 0 0 33.33333%;\n      max-width: 33.33333%; }\n  .large-up-4 {\n    flex-wrap: wrap; }\n    .large-up-4 > .column, .large-up-4 > .columns {\n      flex: 0 0 25%;\n      max-width: 25%; }\n  .large-up-5 {\n    flex-wrap: wrap; }\n    .large-up-5 > .column, .large-up-5 > .columns {\n      flex: 0 0 20%;\n      max-width: 20%; }\n  .large-up-6 {\n    flex-wrap: wrap; }\n    .large-up-6 > .column, .large-up-6 > .columns {\n      flex: 0 0 16.66667%;\n      max-width: 16.66667%; }\n  .large-up-7 {\n    flex-wrap: wrap; }\n    .large-up-7 > .column, .large-up-7 > .columns {\n      flex: 0 0 14.28571%;\n      max-width: 14.28571%; }\n  .large-up-8 {\n    flex-wrap: wrap; }\n    .large-up-8 > .column, .large-up-8 > .columns {\n      flex: 0 0 12.5%;\n      max-width: 12.5%; } }\n\n@media screen and (min-width: 64em) and (min-width: 64em) {\n  .large-expand {\n    flex: 1 1 0px; } }\n\n.row.large-unstack > .column, .row.large-unstack > .columns {\n  flex: 0 0 100%; }\n  @media screen and (min-width: 64em) {\n    .row.large-unstack > .column, .row.large-unstack > .columns {\n      flex: 1 1 0px; } }\n\n@media screen and (min-width: 64em) {\n  .large-collapse > .column, .large-collapse > .columns {\n    padding-left: 0;\n    padding-right: 0; }\n  .large-uncollapse > .column, .large-uncollapse > .columns {\n    padding-left: 0.9375rem;\n    padding-right: 0.9375rem; } }\n\n.shrink {\n  flex: 0 0 auto;\n  max-width: 100%; }\n\n.column.align-top, .align-top.columns {\n  align-self: flex-start; }\n\n.column.align-bottom, .align-bottom.columns {\n  align-self: flex-end; }\n\n.column.align-middle, .align-middle.columns {\n  align-self: center; }\n\n.column.align-stretch, .align-stretch.columns {\n  align-self: stretch; }\n\n.hide {\n  display: none !important; }\n\n.invisible {\n  visibility: hidden; }\n\n@media screen and (max-width: 39.9375em) {\n  .hide-for-small-only {\n    display: none !important; } }\n\n@media screen and (max-width: 0em), screen and (min-width: 40em) {\n  .show-for-small-only {\n    display: none !important; } }\n\n@media screen and (min-width: 40em) {\n  .hide-for-medium {\n    display: none !important; } }\n\n@media screen and (max-width: 39.9375em) {\n  .show-for-medium {\n    display: none !important; } }\n\n@media screen and (min-width: 40em) and (max-width: 63.9375em) {\n  .hide-for-medium-only {\n    display: none !important; } }\n\n@media screen and (max-width: 39.9375em), screen and (min-width: 64em) {\n  .show-for-medium-only {\n    display: none !important; } }\n\n@media screen and (min-width: 64em) {\n  .hide-for-large {\n    display: none !important; } }\n\n@media screen and (max-width: 63.9375em) {\n  .show-for-large {\n    display: none !important; } }\n\n@media screen and (min-width: 64em) and (max-width: 74.9375em) {\n  .hide-for-large-only {\n    display: none !important; } }\n\n@media screen and (max-width: 63.9375em), screen and (min-width: 75em) {\n  .show-for-large-only {\n    display: none !important; } }\n\n.show-for-sr,\n.show-on-focus {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0); }\n\n.show-on-focus:active, .show-on-focus:focus {\n  position: static !important;\n  height: auto;\n  width: auto;\n  overflow: visible;\n  clip: auto; }\n\n.show-for-landscape,\n.hide-for-portrait {\n  display: block !important; }\n  @media screen and (orientation: landscape) {\n    .show-for-landscape,\n    .hide-for-portrait {\n      display: block !important; } }\n  @media screen and (orientation: portrait) {\n    .show-for-landscape,\n    .hide-for-portrait {\n      display: none !important; } }\n\n.hide-for-landscape,\n.show-for-portrait {\n  display: none !important; }\n  @media screen and (orientation: landscape) {\n    .hide-for-landscape,\n    .show-for-portrait {\n      display: none !important; } }\n  @media screen and (orientation: portrait) {\n    .hide-for-landscape,\n    .show-for-portrait {\n      display: block !important; } }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-center {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.clearfix::before, .clearfix::after {\n  content: ' ';\n  display: table; }\n\n.clearfix::after {\n  clear: both; }\n\n.align-right {\n  justify-content: flex-end; }\n\n.align-center {\n  justify-content: center; }\n\n.align-justify {\n  justify-content: space-between; }\n\n.align-spaced {\n  justify-content: space-around; }\n\n.align-top {\n  align-items: flex-start; }\n\n.align-self-top {\n  align-self: flex-start; }\n\n.align-bottom {\n  align-items: flex-end; }\n\n.align-self-bottom {\n  align-self: flex-end; }\n\n.align-middle {\n  align-items: center; }\n\n.align-self-middle {\n  align-self: center; }\n\n.align-stretch {\n  align-items: stretch; }\n\n.align-self-stretch {\n  align-self: stretch; }\n\n.small-order-1 {\n  order: 1; }\n\n.small-order-2 {\n  order: 2; }\n\n.small-order-3 {\n  order: 3; }\n\n.small-order-4 {\n  order: 4; }\n\n.small-order-5 {\n  order: 5; }\n\n.small-order-6 {\n  order: 6; }\n\n@media screen and (min-width: 40em) {\n  .medium-order-1 {\n    order: 1; }\n  .medium-order-2 {\n    order: 2; }\n  .medium-order-3 {\n    order: 3; }\n  .medium-order-4 {\n    order: 4; }\n  .medium-order-5 {\n    order: 5; }\n  .medium-order-6 {\n    order: 6; } }\n\n@media screen and (min-width: 64em) {\n  .large-order-1 {\n    order: 1; }\n  .large-order-2 {\n    order: 2; }\n  .large-order-3 {\n    order: 3; }\n  .large-order-4 {\n    order: 4; }\n  .large-order-5 {\n    order: 5; }\n  .large-order-6 {\n    order: 6; } }\n\nh1 {\n  font-size: 1.5rem; }\n\nh2 {\n  font-size: 1.25rem; }\n\nh3 {\n  font-size: 1.1875rem; }\n\nh4 {\n  font-size: 1.125rem; }\n\nh5 {\n  font-size: 1.0625rem; }\n\nh6 {\n  font-size: 1rem; }\n\n@media screen and (min-width: 40em) {\n  h1 {\n    font-size: 3rem; }\n  h2 {\n    font-size: 2.5rem; }\n  h3 {\n    font-size: 1.9375rem; }\n  h4 {\n    font-size: 1.5625rem; }\n  h5 {\n    font-size: 1.25rem; }\n  h6 {\n    font-size: 1rem; } }\n\nbody {\n  font-family: \"Raleway\", sans-serif;\n  line-height: 1.4; }\n\nh1, h2, h3, h4, h5, h6, p {\n  margin-bottom: 1rem; }\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);