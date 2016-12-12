require('babel-register')({ presets: ['react', 'es2015'] });
require('babel-polyfill')
require('locus')

global.document = require('jsdom').jsdom(
  "<div id='application'></div>"
)
global.window = document.defaultView
global.navigator = window.navigator

if (!global.window.localStorage) {
  localStorage = {
    getItem() { return '{}'; },
    setItem() {}
  }
}

if (typeof(exports) !== "undefined"){
  var $ = require('jquery');
}
