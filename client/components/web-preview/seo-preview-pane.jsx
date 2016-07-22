/** @ssr-ready **/

/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import SearchPreview from 'components/seo/search-preview';
import VerticalMenu from 'components/vertical-menu';
import { SocialItem } from 'components/vertical-menu/items';
import { getSelectedSite } from 'state/ui/selectors';

const ComingSoonMessage = translate => (
	<div className="seo-preview-pane__message">
		{ translate( 'Coming Soon!' ) }
	</div>
);

const GooglePreview = site =>
	<SearchPreview
		title={ site.name }
		url={ site.URL }
		snippet={ site.description }
	/>;

export class SeoPreviewPane extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			selectedService: 'google'
		};

		this.selectPreview = this.selectPreview.bind( this );
	}

	selectPreview( selectedService ) {
		this.setState( { selectedService } );
	}

	render() {
		const {
			site,
			translate
		} = this.props;
		const { selectedService } = this.state;

		return (
			<div className="seo-preview-pane">
				<div className="seo-preview-pane__sidebar">
					<div className="seo-preview-pane__explanation">
						<h1 className="seo-preview-pane__title">
							{ translate( 'External previews' ) }
						</h1>
						<p className="seo-preview-pane__description">
							{ translate(
								`Below you'll find previews that ` +
								`represent how your post will look ` +
								`when it's found or shared across a ` +
								`variety of networks.`
							) }
						</p>
					</div>
					<VerticalMenu onClick={ this.selectPreview }>
						<SocialItem service="google" />
						<SocialItem service="facebook" />
						<SocialItem service="wordpress" />
						<SocialItem service="linkedin" />
						<SocialItem service="twitter" />
					</VerticalMenu>
				</div>
				<div className="seo-preview-pane__preview-area">
					<div className="seo-preview-pane__preview">
						{ get( {
							google: GooglePreview( site )
						}, selectedService, ComingSoonMessage( translate ) ) }
					</div>
					<div className="seo-preview-pane__preview-spacer" />
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

const mapStateToProps = state => ( {
	site: getSelectedSite( state )
} );

export default connect( mapStateToProps, null )( localize( SeoPreviewPane ) );
