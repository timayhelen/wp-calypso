const differ = require( '../lib/differ' );
const eslines = require( '../lib/eslines' );
const gitDiff = require( '../lib/git-diff' );

module.exports = function( report ) {
	const lines = differ( gitDiff() );
	return JSON.stringify( eslines( report, lines ) );
};
