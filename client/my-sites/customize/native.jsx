/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import DesignMenu from 'my-sites/design-menu';
import DesignPreview from 'my-sites/design-preview';

const NativeCustomizer = React.createClass( {
	render() {
		return (
			<div className="customize__native-customizer">
				<DesignMenu />
				<DesignPreview showPreview={ true } showClose={ false } showExternal={ false } />
			</div>
		);
	}
} );

export default NativeCustomizer;
