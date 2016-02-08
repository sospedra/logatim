(function ($) {
  $('#js-logatim-sandbox').terminal(function(command, term) {
    if (command !== '') {
      try {
        var result = window.eval(command);

        if (result !== undefined) {
          term.echo(new String(result));
        }
      } catch (e) {
        term.error(new String(e));
      }
    } else {
      term.echo('');
    }
  }, {
    greetings: " sandbox ~ $ node \n >  const logatim = require('logatim')",
    name: 'logatim-sandbox',
    height: 200,
    prompt: ' >  '
  });
})(jQuery);
