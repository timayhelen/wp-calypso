import createSelector from 'lib/create-selector';
import purchasesAssembler from 'lib/purchases/assembler';

/**
 * Return the list of purchases from state object
 *
 * @param {Object} state - current state object
 * @return {Array} Purchases
 */
export const getPurchases = createSelector(
	state => purchasesAssembler.createPurchasesArray( state.purchases.data ),
	state => [ state.purchases.data ]
);

/**
 * Returns a list of Purchases associated with a User from the state using its userId
 * @param  {Object} state       global state
 * @param  {Number} userId      the user id
 * @return {Object} the matching purchases if there are some
 */
export const getUserPurchases = ( state, userId ) => (
	state.purchases.hasLoadedUserPurchasesFromServer && getPurchases( state ).filter( purchase => purchase.userId === userId )
);

/**
 * Returns the server error for site or user purchases (if there is one)
 *
 * @param {Object} state - current state object
 * @return {Object} an error object from the server
 */
export const getPurchasesError = state => state.purchases.error;

/**
 * Returns a Purchase object from the state using its id
 * @param  {Object} state       global state
 * @param  {Number} purchaseId  the purchase id
 * @return {Object} the matching purchase if there is one
 */
export const getByPurchaseId = ( state, purchaseId ) => (
	getPurchases( state ).filter( purchase => purchase.id === purchaseId ).shift()
);

/**
 * Returns a list of Purchases associated with a Site from the state using its siteId
 * @param  {Object} state       global state
 * @param  {Number} siteId      the site id
 * @return {Object} the matching purchases if there are some
 */
export const getSitePurchases = ( state, siteId ) => (
	getPurchases( state ).filter( purchase => purchase.siteId === siteId )
);

export const isFetchingUserPurchases = state => state.purchases.isFetchingUserPurchases;
export const isFetchingSitePurchases = state => state.purchases.isFetchingSitePurchases;
export const hasLoadedUserPurchasesFromServer = state => state.purchases.hasLoadedUserPurchasesFromServer;
export const hasLoadedSitePurchasesFromServer = state => state.purchases.hasLoadedSitePurchasesFromServer;
