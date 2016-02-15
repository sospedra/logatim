window.logatim = require('logatim')
window.$ = window.jQuery = require('jquery')

logatim.setLevel('info')

require('jquery-ui/resizable')
require('./jquery.scrolly.min.js')
require('./skel.min')
require('./asciinema-controller')
require('./util')
require('./main')

// load the iframe when everything else is done
$(window).bind('load', () => {
  $('#js-terminal').attr('src', 'http://services-82a9dfb1-0ca9-4723-a599-c797ef8f78c0.runnablecodesnippets.com/static/term.html')
})
