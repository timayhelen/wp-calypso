/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import page from 'page';

/**
 * Internal dependencies
 */
import Site from 'my-sites/site';
import Card from 'components/card';
import Button from 'components/button';
import Gridicon from 'components/gridicon';
import RootChild from 'components/root-child';
import { clearCustomizations, fetchPreviewMarkup, saveCustomizations } from 'state/preview/actions';
import { isPreviewUnsaved, getPreviewCustomizations } from 'state/preview/selectors';
import { getSelectedSite, getSelectedSiteId } from 'state/ui/selectors';
import accept from 'lib/accept';
import designTool from 'my-sites/design-menu/design-tool-data';
import DesignToolList from 'my-sites/design-tool-list';
import SiteTitleControl from 'my-sites/site-title';
import HeaderImageControl from 'my-sites/header-image';
import HomePageSettings from 'my-sites/home-page-settings';
import SiteLogoControl from 'my-sites/site-logo';
import DesignMenuPanel from 'my-sites/design-menu-panel';

const WrappedSiteTitleControl = designTool( SiteTitleControl );
const WrappedSiteLogoControl = designTool( SiteLogoControl );
const WrappedHeaderImageControl = designTool( HeaderImageControl );
const WrappedHomePageSettings = designTool( HomePageSettings );

const DesignMenu = React.createClass( {

	propTypes: {
		// These are provided by the connect method
		isUnsaved: React.PropTypes.bool,
		customizations: React.PropTypes.object,
		selectedSite: React.PropTypes.object.isRequired,
		clearCustomizations: React.PropTypes.func.isRequired,
		fetchPreviewMarkup: React.PropTypes.func.isRequired,
		saveCustomizations: React.PropTypes.func.isRequired,
	},

	getDefaultProps() {
		return {
			isUnsaved: false,
			customizations: {},
		};
	},

	getInitialState() {
		return {
			activeDesignToolId: null,
		};
	},

	componentWillMount() {
		this.props.clearCustomizations( this.props.selectedSite.ID );
		// Fetch the preview
		this.props.fetchPreviewMarkup( this.props.selectedSite.ID, '' );
	},

	activateDesignTool( activeDesignToolId ) {
		this.setState( { activeDesignToolId } );
	},

	activateDefaultDesignTool() {
		this.setState( { activeDesignToolId: null } );
	},

	onSave() {
		this.props.saveCustomizations();
	},

	onBack() {
		if ( this.state.activeDesignToolId ) {
			return this.activateDefaultDesignTool();
		}
		this.maybeCloseDesignMenu();
	},

	maybeCloseDesignMenu() {
		if ( this.props.isUnsaved ) {
			return accept( this.translate( 'You have unsaved changes. Are you sure you want to close the preview?' ), accepted => {
				if ( accepted ) {
					this.props.clearCustomizations( this.props.selectedSite.ID );
					this.closeDesignMenu();
				}
			} );
		}
		this.props.clearCustomizations( this.props.selectedSite.ID );
		this.closeDesignMenu();
	},

	closeDesignMenu() {
		const siteSlug = this.props.selectedSite.URL.replace( /^https?:\/\//, '' );
		page( `/stats/${siteSlug}` );
		// TODO: go where?
	},

	renderActiveDesignTool() {
		switch ( this.state.activeDesignToolId ) {
			case 'siteTitle':
				return (
					<DesignMenuPanel label={ this.translate( 'Title and Tagline' ) }>
						<WrappedSiteTitleControl previewDataKey="siteTitle" />
					</DesignMenuPanel>
				);
			case 'siteLogo':
				return (
					<DesignMenuPanel label={ this.translate( 'Logo' ) }>
						<WrappedSiteLogoControl previewDataKey="siteLogo" />
					</DesignMenuPanel>
				);
			case 'headerImage':
				return (
					<DesignMenuPanel label={ this.translate( 'Header Image' ) }>
						<WrappedHeaderImageControl previewDataKey="headerImage" />
					</DesignMenuPanel>
				);
			case 'homePage':
				return (
					<DesignMenuPanel label={ this.translate( 'Homepage Settings' ) }>
						<WrappedHomePageSettings previewDataKey="homePage" />
					</DesignMenuPanel>
				);
			default:
				return <DesignToolList onChange={ this.activateDesignTool } />;
		}
	},

	renderSiteCard() {
		// The site object required by Site isn't quite the same as the one in the
		// Redux store, so we patch it.
		const site = Object.assign( {}, this.props.selectedSite, {
			title: this.props.selectedSite.name,
			domain: this.props.selectedSite.URL.replace( /^https?:\/\//, '' ),
		} );
		return <Site site={ site } />;
	},

	render() {
		const saveButtonText = ! this.props.isUnsaved ? this.translate( 'Saved' ) : this.translate( 'Publish Changes' );
		return (
			<RootChild>
				<div className="design-menu">
					<span className="design-menu__sidebar">
						<Button compact borderless onClick={ this.onBack }>
							<Gridicon icon="arrow-left" size={ 18 } />
							{ this.translate( 'Back' ) }
						</Button>
						{ this.renderSiteCard() }
						<Card className="design-menu__header-buttons">
							<Button primary compact
								disabled={ ! this.props.isUnsaved }
								className="design-menu__save"
								onClick={ this.onSave }
							>{ saveButtonText }</Button>
						</Card>
					</span>
					{ this.renderActiveDesignTool() }
				</div>
			</RootChild>
		);
	}
} );

function mapStateToProps( state ) {
	const siteId = getSelectedSiteId( state );
	return {
		selectedSite: getSelectedSite( state ),
		customizations: getPreviewCustomizations( state, siteId ),
		isUnsaved: isPreviewUnsaved( state, siteId ),
	};
}

export default connect(
	mapStateToProps,
	{ clearCustomizations, fetchPreviewMarkup, saveCustomizations }
)( DesignMenu );
