var fs = require( 'fs' );
const differ = require( '../lib/differ' );
const eslines = require( '../lib/eslines' );
const gitDiff = require( '../lib/git-diff' );

const config = JSON.parse( fs.readFileSync( '.eslines.json', 'utf-8' ) );

module.exports = function( report ) {
	const lines = differ( gitDiff() );
	return JSON.stringify( eslines( report, lines, config.rulesToNotDowngrade ) );
};
