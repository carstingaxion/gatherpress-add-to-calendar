/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';



/**
 * Internal dependencies
 */
const GPIB = 'gatherpress-add-to-calendar';
const GPIB_CLASS_NAME   = 'gp-add-to-calendar';

const GPIB_VARIATION_ATTRIBUTES = {
	title: __( 'Add to calendar', 'gatherpress' ) + ' (v2)',
	description: __( 'Allows a user to add an event to their preferred calendar.', 'gatherpress' ),
	category: 'gatherpress',
	icon: 'nametag',
};

const GPIB_BUTTON_ATTRIBUTES = {
	tagName: 'button', // By setting this to 'button', instead of 'a', we can completely prevent the LinkControl getting rendered into the Toolbar.
	title: __( 'Allows you to add an event to your preferred calendar.', 'gatherpress' ),
	text: '📅 ' + __( 'Add to Calendar', 'gatherpress' ) + ' (v2)',
	className: GPIB_CLASS_NAME,
};


/**
 * 
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
registerBlockVariation( 'core/button', {
	...GPIB_VARIATION_ATTRIBUTES,
	name: GPIB,
	isActive: [ 'namespace', 'title' ], // 'className' can be a string of multiple classes, e.g. when using block styles, so avoid them over here. The 'title' attibute however is unique to our variation and non-editable by the editor.
	attributes: {
		...GPIB_BUTTON_ATTRIBUTES
	},
	scope: [ 'inserter', 'transform', 'block' ], // Defaults to 'block' and 'inserter'.
	example: {}
} );

/**
 * A Trap block, that looks like a single button, hohoho.
 *  
 * This block-variation is only useful, because a user can pick the block directly from the inserter or the left sidebar.
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
registerBlockVariation( 'core/buttons', {
	...GPIB_VARIATION_ATTRIBUTES,
	name: 'pseudo-' + GPIB,
	// isActive: [ 'namespace', 'title' ], // This is not used/disabled by purpose.
	innerBlocks: [
		[
			'core/button',
			{
				...GPIB_BUTTON_ATTRIBUTES
			},

		],
	],
	example: {
		innerBlocks: [
			{
				name: 'core/button',
				attributes: {
					...GPIB_BUTTON_ATTRIBUTES
				}
			},
		]
	}
} );
