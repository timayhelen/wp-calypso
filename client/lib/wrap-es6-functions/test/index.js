import {useSandbox} from 'test/helpers/use-sinon';
import assert from 'assert';
import debugFactory from 'debug';

function prepareStubs( sandbox, props, obj ) {
	props = props.filter( key => obj.hasOwnProperty( key ) );
	props.forEach( key => {
		sandbox.stub( obj, key );
	} );
	return props;
}

describe( 'wrapping', () => {
	let sandbox, arrayProps, stringProps, consoleSpy, regExpProps;
	useSandbox( newSandbox => sandbox = newSandbox );
	before( () => {
		consoleSpy = sandbox.stub( console, 'error' );
		arrayProps = prepareStubs(
			sandbox,
			[ 'keys', 'entries', 'values', 'findIndex', 'fill', 'find' ],
			Array.prototype
		);

		stringProps = prepareStubs(
			sandbox,
			[ 'codePointAt', 'normalize', 'repeat', 'startsWith', 'endsWith', 'includes' ],
			String.prototype
		);

		regExpProps = prepareStubs(
			sandbox,
			[ 'flags' ],
			RegExp.prototype
		);

		require( '../' )();
	} );

	afterEach( () => {
		sandbox.restore();
	} );

	it( 'should wrap Array', () => {
		arrayProps.forEach( key => {
			consoleSpy.reset();
			[][ key ]();
			assert( consoleSpy.calledOnce );
		} );
	} );

	it( 'should wrap String', () => {
		stringProps.forEach( key => {
			consoleSpy.reset();
			''[ key ]();
			assert( consoleSpy.calledOnce );
		} );
	} );

	it( 'should wrap RegExp', () => {
		regExpProps.forEach( key => {
			consoleSpy.reset();
			/a/[ key ]();
			assert( consoleSpy.calledOnce );
		} );
	} )
} );
