const fs = require( 'fs' );
const test = require( 'tape' );
const eslinesCli = require( '../src/cli.js' );

// fixtures
const baseReport = require( './fixtures/eslint.json' );
const gitDiffStr = './tests/fixtures/git.diff';

test( 'CLI - returns exit code 1 when there are some errors/warnings', t => {
	fs.readFile( gitDiffStr, 'utf-8', ( err, diff ) =>{
		const exitCode = eslinesCli( baseReport, diff );

		t.equals( exitCode, 1 );
		t.end();
	} );
} );

test( 'CLI - returns exit code 0 if there are no errors/warnings', t => {
	fs.readFile( gitDiffStr, 'utf-8', ( err, diff ) =>{
		const exitCode = eslinesCli( [], diff );

		t.equals( exitCode, 0 );
		t.end();
	} );
} );
