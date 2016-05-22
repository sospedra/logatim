2016-05-22
==========

  * refactor(release): Compile dist for new release
  * feat: Can use functions straight/composing for printing instead of strings
  * chore: Add .DS_Store to gitignore

2016-05-10
==========

  * docs: Update changelog
  * fix: Add casting for messages containing objects
  * fix: Cast objects to string
    So the whole object will be printed out
  * fix: Print all kind of objects including error exceptions

2016-05-09
==========

  * docs: Update changelog
    fix [#2](https://github.com/edravis/logatim/issues/2)
  * Merge branch 'console-fallback'
  * feat: Add fallback for console log undefined methods

2016-05-08
==========

  * Merge branch 'persist-set-level'
  * chore: Update npm run push script
  * feat: Update changelog and push 0.6.0 release files
  * feat: Persist levels among app files (isomorphic)
  * chore: Add demo/bundle.js to .gitignore
  * chore: Remove demo/bundle.js from the repo
  * test: Add tests for end-like log methods
  * chore: Add codeclimate.yml ignoring dist and demo
  * fixup! docs: Highlight the last breaking release
  * docs: Highlight the last breaking release
  * docs: Update README.md with breaking release info
  * docs: Update changelog
  * refactor: Arrow functions shouldn't return assignments
  * perf: Log methods are end-like functions
    Therefore, they're not returning Logatim instances anymore
    fix [#20](https://github.com/edravis/logatim/issues/20)

2016-05-07
==========

  * refactor: update dev deps
  * chore: change tryout to playground to meet the standard ignore files defaults
  * refactor: add node-repl and clean package.json scripts
  * feat: add tryout mode
  * style: Update changelog
  * style: Update from Edravis to Sospedra username
  * feat(): Remove detect-node dep
    [#19](https://github.com/edravis/logatim/issues/19)

2016-02-18
==========

  * docs: Add asciinema links to README

2016-02-17
==========

  * perf: Override speaker.inspect
    Avoid polluting the REPL or the generics outputs with the echoes of the speaker function properties

2016-02-02
==========

  * docs: Add a line break to proper format the markdown at Github
  * docs: Add demo to the README.md and update the changelog
  * Merge branch 'master' of https://github.com/edravis/logatim
  * fix: When leveling the logatim variable become undefined. Now it's strongly binded.
  * Merge pull request [#16](https://github.com/edravis/logatim/issues/16) from eanplatter/master
    Fix typos in README
  * chore: Added npm run push
  * docs: Update changelog
  * fix: Don't break when outputing without styles. Nor server nor browser.
  * Fix typos in README
  * fix: Add dist to package.json file
  * fix: Add files to package.json so the new npm install won't use tape anymore
  * chore: Remove post install script
  * Merge pull request [#13](https://github.com/edravis/logatim/issues/13) from brunopgalvao/patch-1
    Update README.md
  * Update README.md

2016-02-01
==========

  * chore: Run the Travis test only for node 4+
  * docs: Update changelog
  * refactor: Remove unnecessary folders
  * chore(Coverage): Added coveralls support

2016-01-25
==========

  * feat: Support CSS/Browser styles

2016-01-17
==========

  * docs: Update changelog and update README.md
  * fix: Add detect-node dependency to package.json
  * docs: Update changelog
  * feat: Add the human-like concatenation
    feat: Add human-like concatenation
    fix [#10](https://github.com/edravis/logatim/issues/10)
  * feat: Add raw function
    Return the current message output including the styles

2015-12-31
==========

  * docs: Changelog
  * feat: Add styles for browser. Add methods concatenation.

2015-12-29
==========

  * feat: Add support for css outputs

2015-12-27
==========

  * fix(test): Fix the retrocomp with node 4-
    Added the webpack babel preset es2015
  * fix(tests): Run the tests using the UMD
    So it's compatible with all the node versions while running the CI.
  * feat: Add tests for levels
    fix [#5](https://github.com/edravis/logatim/issues/5)
  * feat: Add versions
    fix [#4](https://github.com/edravis/logatim/issues/4)
  * feat: Add semantic versioning
    [#4](https://github.com/edravis/logatim/issues/4)
  * Release version 1.0.0. The game starts now!

2015-12-11
==========

  * initial commit
