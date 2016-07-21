const childProcess = require( 'child_process' );

module.exports = function() {
	const argsBranchName = [ 'rev-parse', '--abbrev-ref', 'HEAD' ];
	const branchName = childProcess.spawnSync( 'git', argsBranchName ).stdout.toString().trim();

	const argsMergeBase = [ 'merge-base', branchName, 'origin/master' ];
	const mergeBase = childProcess.spawnSync( 'git', argsMergeBase ).stdout.toString().trim();

	const argsDiff = [ 'diff', '--name-only', mergeBase + '..HEAD' ];
	const fileNames = childProcess.spawnSync( 'git', argsDiff ).stdout.toString().trim();

	return fileNames;
};
