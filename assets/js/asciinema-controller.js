const $ = require('jquery')

module.exports = (function () {
  var getOpts = function (poster, autoPlay, theme) {
    return {
      height: 15,
      loop: 1,
      poster: poster || 1,
      autoPlay: autoPlay || 0,
      theme: theme || 'asciinema'
    }
  }

  // load the asciinema videos into the demos
  asciinema_player.core
    .CreatePlayer('asciinema-colors', 'asciinema/colors.json', getOpts(20, 0))
  asciinema_player.core
    .CreatePlayer('asciinema-levels', 'asciinema/colors.json', getOpts(20, 0))
  asciinema_player.core
    .CreatePlayer('asciinema-iso-browser', 'asciinema/colors.json', getOpts(20, 1, 'solarized-light'))
  asciinema_player.core
    .CreatePlayer('asciinema-iso-server', 'asciinema/colors.json', getOpts(20, 1))

  // make the spotlight demos resizable
  $('.spotlight[data-benefit="colors"] .demo').resizable({
    handles: 'e'
  })

  $('.spotlight[data-benefit="levels"] .demo').resizable({
    handles: 'w'
  })

  $('.spotlight[data-benefit="isomorphic"] .demo.server').resizable({
    handles: {
      'e': '#resize-cursor'
    }
  })
})()
