#!/usr/bin/env node

const fs = require( 'fs' );
const cli = require( './src/cli' );

/* eslint no-process-exit: "off" */

if ( ! process.stdin.isTTY ) {
	process.stdin.setEncoding( 'utf-8' );
	process.stdin.on( 'data', function( data ) {
		process.exit( cli( JSON.parse( data ) ) );
	} );
} else if ( process.argv.length === 3 ) {
	fs.readFile( process.argv[ 2 ], 'utf-8', ( err, data ) => {
		if ( err ) {
			process.stdout.write( 'Could not read file' );
			process.exit( 1 );
		}
		process.exit( cli( JSON.parse( data ) ) );
	} );
}
