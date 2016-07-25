/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduce, size, map, get, includes } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import QueryTaxonomies from 'components/data/query-taxonomies';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getEditorPostId } from 'state/ui/editor/selectors';
import { getEditedPostValue } from 'state/posts/selectors';
import { getPostTypeTaxonomies } from 'state/post-types/taxonomies/selectors';
import Accordion from 'components/accordion';
import Gridicon from 'components/gridicon';
import TermTokenField from 'post-editor/term-token-field';
import TermSelector from 'post-editor/editor-term-selector';

function isSkippedTaxonomy( postType, taxonomy ) {
	if ( includes( [ 'post_format', 'mentions' ], taxonomy ) ) {
		return true;
	}

	if ( 'post' === postType ) {
		return includes( [ 'category', 'post_tag' ], taxonomy );
	}

	return false;
}

function EditorDrawerTaxonomies( { translate, siteId, postType, taxonomies, terms } ) {
	return (
		<div className="editor-drawer__taxonomies">
			{ siteId && postType && (
				<QueryTaxonomies { ...{ siteId, postType } } />
			) }
			{ reduce( taxonomies, ( memo, taxonomy ) => {
				const { name, label, hierarchical } = taxonomy;

				if ( isSkippedTaxonomy( postType, name ) ) {
					return memo;
				}

				const taxonomyTerms = get( terms, name );
				const taxonomyTermsCount = size( taxonomyTerms );

				let subtitle;
				if ( taxonomyTermsCount > 2 ) {
					subtitle = translate( '%d selected', '%d selected', {
						count: taxonomyTermsCount,
						args: [ taxonomyTermsCount ]
					} );
				} else {
					subtitle = map( taxonomyTerms, 'name' ).join( ', ' );
				}

				return memo.concat(
					<Accordion
						key={ name }
						title={ label }
						subtitle={ subtitle }
						icon={ <Gridicon icon={ hierarchical ? 'folder' : 'tag' } /> }
					>
					{ hierarchical
						? <TermSelector taxonomyName={ name } />
						: <TermTokenField taxonomyName={ name } />
					}
					</Accordion>
				);
			}, [] ) }
		</div>
	);
}

EditorDrawerTaxonomies.propTypes = {
	translate: PropTypes.func,
	siteId: PropTypes.number,
	postType: PropTypes.string,
	terms: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.array
	] ),
	taxonomies: PropTypes.array,
};

export default connect( ( state ) => {
	const siteId = getSelectedSiteId( state );
	const postId = getEditorPostId( state );
	const postType = getEditedPostValue( state, siteId, postId, 'type' );

	return {
		siteId,
		postType,
		terms: getEditedPostValue( state, siteId, postId, 'terms' ),
		taxonomies: getPostTypeTaxonomies( state, siteId, postType )
	};
} )( localize( EditorDrawerTaxonomies ) );
