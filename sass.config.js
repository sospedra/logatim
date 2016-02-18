const sass = require('node-sass')
const fontAwesome = require('node-font-awesome')
const copyfiles = require('copyfiles')
const fs = require('fs')

// return the object used to build the css bunldes
const createShim = (name, deps, clbk) => ({
  name: name,
  outfile: `public/css/logatim.${name}.min.css`,
  specs: {
    includePaths: deps || [],
    file: `assets/sass/${name}.scss`,
    outputStyle: 'compressed'
  },
  clbk: clbk || function noop () {}
})

// collection of shims
const shims = [
  createShim('ie8'),
  createShim('ie9'),
  createShim('main', [fontAwesome.scssPath], () => {
    copyfiles([fontAwesome.fonts, 'public/fonts/'], true, (err) => {
      if (err) console.error(err)
    })
  })
]

// create the css bundles
shims.forEach((shim) => {
  sass.render(shim.specs, (err, result) => {
    if (err) return console.error(err)

    // write the bundle output
    fs.writeFile(shim.outfile, result.css, (err) => {
      if (err) console.error(err)
    })

    shim.clbk()
  })
})
