/** @ssr-ready **/

/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

import VerticalMenu from 'components/vertical-menu';
import { SocialItem } from 'components/vertical-menu/items';

export class SeoPreviewPane extends PureComponent {
	render() {
		const { translate } = this.props;

		return (
			<div className="web-preview__seo-preview-pane">
				<div>
					<div>{ translate( 'External previews' ) }</div>
					<div>
						{ translate(
							`Below you'll find previews that ` +
							`represent how your post will look ` +
							`when it's found or shared across a ` +
							`variety of networks.`
						) }
					</div>
					<VerticalMenu>
						<SocialItem service="google" />
						<SocialItem service="facebook" />
						<SocialItem service="wordpress" />
						<SocialItem service="linkedin" />
						<SocialItem service="twitter" />
					</VerticalMenu>
				</div>
				<div>
					Preview!
				</div>
			</div>
		);
	}
}

SeoPreviewPane.propTypes = {
	type: PropTypes.oneOf( [ 'site', 'page', 'post' ] ).isRequired,
	siteId: PropTypes.number.isRequired,
	postId: PropTypes.number.isRequired,
	pageId: PropTypes.number.isRequired
};

export default connect( null, null )( localize( SeoPreviewPane ) );
