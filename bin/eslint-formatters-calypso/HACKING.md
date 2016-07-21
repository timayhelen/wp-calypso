# How repository is organized

- lib/* auto-contained modules, valuable on their own and with no dependencies (apart from node ones).
- formatters/* modules that use specific pieces from lib/ and node. They take a JSON ESLint report and return a stylish ESLint report.

# How to get the fixtures for testing

You need to execute these commands from the root of you repository:

git diff --src-prefix=$PWD/ --dst-prefix=$PWD/ -U0 $(git merge-base $(git rev-parse --abbrev-ref HEAD) origin/master)..HEAD > git.diff
eslint --rule "space-in-parens: [ 2, 'always' ]" --rule 'max-len: [2, {code:140}]' -f json --ext=jsx --ext=js . > eslint.json
eslint --rule "space-in-parens: [ 2, 'always' ]" --rule 'max-len: [2, {code:140}]' -f stylish --ext=jsx --ext=js . > eslint.stylish
