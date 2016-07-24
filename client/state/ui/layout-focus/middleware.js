/**
 * Internal dependencies
 */
import {
	LAYOUT_FOCUS_SET,
	LAYOUT_NEXT_FOCUS_ACTIVATE,
	LAYOUT_NEXT_FOCUS_SET,
} from 'state/action-types';
import { getCurrentLayoutFocus } from 'state/ui/layout-focus/selectors';
import { setLayoutFocus } from 'state/ui/layout-focus/actions';
import layoutFocus from 'lib/layout-focus';

let syncFocusToRedux;

/**
 * Temporary Redux middleware intended to replay dispatched Redux layout focus
 * operations on the legacy `lib/layout-focus` module and sync legacy area
 * changes to global state.
 *
 * @return {Function} Redux middleware
 */
export default ( { dispatch, getState } ) => {
	if ( syncFocusToRedux ) {
		layoutFocus.off( 'change', syncFocusToRedux );
	}
	syncFocusToRedux = () => {
		const currentFocus = layoutFocus.getCurrent();
		if ( currentFocus !== getCurrentLayoutFocus( getState() ) ) {
			dispatch( setLayoutFocus( currentFocus ) );
		}
	};
	layoutFocus.on( 'change', syncFocusToRedux );

	return ( next ) => ( action ) => {
		switch ( action.type ) {
			case LAYOUT_FOCUS_SET:
				layoutFocus.set( action.area );
				break;

			case LAYOUT_NEXT_FOCUS_SET:
				layoutFocus.setNext( action.area );
				break;

			case LAYOUT_NEXT_FOCUS_ACTIVATE:
				layoutFocus.next();
				break;
		}

		return next( action );
	};
};
