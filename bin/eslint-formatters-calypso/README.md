# eslint-formatters-calypso

A set of formatters to be used by ESLint and utilities to build new formatters upon.

Formatters available:

* `lines-modified`: downgrade ESLint `errors` to `warnings`, except for lines modified in the topic branch.
* `lines-modified-and-specific-rules`: downgrade ESLint `errors` to `warnings`, except for lines modified in the topic branch and the rules in the `.eslines.json` file.
* `parsing-errors`: takes the ESLint original report and outputs a new one containing only `parsing errors`.

The formatters `lines-modified` and `lines-modified-and-specific-rules` need to be run within a git topic branch, to calculate the changes done.

### Install

From npm:

    npm install eslint-formatters-calypso

From source:

    npm install <path-to-local-src-directory>

### How to use them

Pass the formatter to the ESLint runner:

    eslint -f <path-to-src>/src/formatters/parsing-errors.js .

### Config file for lines-modified-and-specific-rules formatter

The formatter `lines-modified-and-specific-rules` takes its configuration from a `.eslines.json` file.

    {
        "rulesToNotDowngrade": ["no-unused-vars"]
    }

For any rule declared in the array `rulesToNotDowngrade`, the `errors` that ESLint reports would be not downgraded to `warnings` by the formatter. In the example above, any reported `error` for `no-unused-vars` would be reported as an `error` as well , no matter in which line they were.
