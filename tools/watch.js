const compile = require("./compile.js");
const watch = require('node-watch');

watch('./less', function(evt, name) {
  if (evt == 'update' || evt == 'remove') {
    compile();
  }
});