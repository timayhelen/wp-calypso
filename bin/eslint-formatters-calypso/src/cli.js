const eslinesFormatter = require( './formatters/lines-modified-and-specific-rules' );

/*
 * This function should *not* call process.exit() directly,
 * It should only return exit codes. This allows other programs
 * to use the function and still control when the program exits.
 *
 */

module.exports = function( report ) {
	const newReport = eslinesFormatter( report );
	if ( newReport ) {
		process.stdout.write( newReport );

		return 1;
	}
    // it has nothing to show
	return 0;
};
