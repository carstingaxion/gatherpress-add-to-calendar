<?php
/**
 * Plugin Name:       Gatherpress Add-to-calendar block
 * Description:       An experiment to replace the `gatherpress/add-to-calendar` block with block-variations of the `core/buttons` and the `core/button` blocks.
 * Version:           0.1.0-alpha
 * Requires at least: 6.5-RC2
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gatherpress-add-to-calendar
 *
 * @package           create-block
 */

namespace GatherPressAddToCalendarBlock;

use GatherPress\Core\Event;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Start the engines.
 *
 * @return void
 */
function bootstrap(): void {
	add_action( 'init', __NAMESPACE__ . '\\register_assets', 1 );

	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_assets' );

	add_filter( 'render_block_core/button', __NAMESPACE__ . '\\add_calendar_links_button_block', 10, 2 );
}
bootstrap();


/**
 * Get backend-only editor assets.
 *
 * @return string[]
 */
function get_editor_assets(): array {
	return [
		'add-to-calendar',
	];
}


/**
 * 
 *
 * @return void
 */
function register_assets(): void {

	\array_map(
		__NAMESPACE__ . '\\register_asset',
		\array_merge(
			get_editor_assets(),
			[
				'variations',
			]
		)
	);
}

/**
 * Enqueue all scripts.
 *
 * @return void
 */
function enqueue_assets(): void {
	\array_map(
		__NAMESPACE__ . '\\enqueue_asset',
		// get_editor_assets()
		[
			'variations',
		]
	);
}

/**
 * Enqueue a script.
 *
 * @param  string $asset Slug of the block to load the frontend scripts for.
 *
 * @return void
 */
function enqueue_asset( string $asset ): void {
	wp_enqueue_script( "gatherpress-add-to-calendar--$asset" );
	wp_enqueue_style( "gatherpress-add-to-calendar--$asset" );
}


/**
 * Register a new script and sets translated strings for the script.
 *
 * @throws \Error If build-files doesn't exist errors out in local environments and writes to error_log otherwise.
 *
 * @param  string $asset Slug of the block to register scripts and translations for.
 *
 * @return void
 */
function register_asset( string $asset ): void {

	$dir = __DIR__;

	$script_asset_path = "$dir/build/$asset/$asset.asset.php";

	
	if ( ! \file_exists( $script_asset_path ) ) {
		$error_message = "You need to run `npm start` or `npm run build` for the '$asset' block-asset first.";
		if ( \in_array( wp_get_environment_type(), [ 'local', 'development' ], true ) ) {
			throw new \Error( esc_html( $error_message ) );
		} else {
			// Should write to the \error_log( $error_message ); if possible.
			return;
		}
	}

	$index_js     = "build/$asset/$asset.js";
	$script_asset = require $script_asset_path; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
	\wp_register_script(
		"gatherpress-add-to-calendar--$asset",
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	$index_css = "build/$asset/$asset.css";
	\wp_register_style(
		"gatherpress-add-to-calendar--$asset",
		plugins_url( $index_css, __FILE__ ),
		[ 'wp-block-buttons','wp-block-button','global-styles' ],
		time(),
		'screen'
	);
	wp_set_script_translations(
		"gatherpress-add-to-calendar--$asset",
		'gatherpress',
		"$dir/languages"
	);
}


/**
 * Filter the render_block to add the needed directives to the inner cover blocks.
 *
 * @param string $block_content The content being rendered by the block.
 */
function add_calendar_links_button_block( $block_content, $block ) {
	// if ( ! isset( $block['attrs']['className'] ) || 'gp-add-to-calendar' !== $block['attrs']['className'] ) {
	if ( ! isset( $block['attrs']['className'] ) || false === \strpos( $block['attrs']['className'], 'gp-add-to-calendar' ) ) {
		return $block_content;
	}

	$button = new \WP_HTML_Tag_Processor( $block_content );

	$classes_for_wrap = join(
		' ',
		array_filter(
			\array_values(
				\explode( 
					' ',
					$block['attrs']['className']
				)
			),
			function( $class ) {
				return ! \in_array(
					$class,
					[
						'gp-add-to-calendar',
						// 'wp-block-button',
					]
				);
			}
		)
	);
	$classes_for_button = '';
	if ( $button->next_tag( 'button' ) ) {

		$classes_for_button = join(
			' ',
			array_filter(
				\array_values(
					\explode( 
						' ',
						$button->get_attribute( 'class' )
					)
				),
				function( $class ) {
					return ! \in_array(
						$class,
						[
							// 'gp-add-to-calendar',
							// 'wp-block-button',
						]
					);
				}
			)
		);



		$button->add_class( 'gp-add-to-calendar__init' );
		$block_content = $button->get_updated_html();
	}
	
	
	
	$gatherpress_event = new Event( get_the_ID() );

	ob_start(); ?>


	<div class="gp-add-to-calendar__list" style="display: none;">
	<?php foreach ( $gatherpress_event->get_calendar_links() as $gatherpress_calendar ) { ?>
		<div class="gp-add-to-calendar__list-item <?php echo $classes_for_wrap; ?>">
		<?php if ( ! empty( $gatherpress_calendar['link'] ) ) { ?>
			<a class="<?php echo $classes_for_button; ?>" href="<?php echo esc_url( $gatherpress_calendar['link'] ); ?>" target="_blank" rel="noopener noreferrer">
				<?php } elseif ( ! empty( $gatherpress_calendar['download'] ) ) { ?>
				<a class="<?php echo $classes_for_button; ?>" href="<?php echo esc_attr( $gatherpress_calendar['download'] ); ?>" rel="noopener noreferrer">
				<?php } ?>
				<?php echo esc_html( $gatherpress_calendar['name'] ); ?>
				</a>
		</div>
	<?php } ?>
	</div>
<style>
/*
 * Working, but
 * would be tideous to add this for all possible block settings
 *
 */  
	.gp-add-to-calendar__list {
		<?php 
		$custom_text_color = ( isset( $block['attrs']['customTextColor'] ) ) ? $block['attrs']['customTextColor'] : 'currentColor';
		$text_color        = ( isset( $block['attrs']['textColor'] ) ) ? "var(--wp--preset--color--{$block['attrs']['textColor']})" : $custom_text_color;
		// $custom_background_color = ( isset( $block['attrs']['customBackgroundColor'] ) ) ? $block['attrs']['customBackgroundColor'] : 'inherit';
		// $background_color        = ( isset( $block['attrs']['backgroundColor'] ) ) ? "var(--wp--preset--color--{$block['attrs']['backgroundColor']})" : $custom_background_color;
		$align = ( isset( $block['attrs']['textAlign'] ) ) ? $block['attrs']['textAlign'] : 'unset';
		$align = ( 'center' === $align ) ? 0 : $align;

		?>
		--gp-text-color: <?php echo $text_color ; ?>;
		
		left: <?php echo ( 'left' === $align ) ? 0 : $align; ?>;
		right: <?php echo ( 'right' === $align ) ? 0 : $align; ?>;

	/*		
		--gp-bg-color: <?php #echo $background_color; ?>;
		&-item {
			background-color: var(--gp-bg-color, inherit);
			color: var(--gp-text-color, inherit);

		}
 */
	}
</style>

	<?php
	$add_to_cal_links = ob_get_clean();


	// Enqueue frontend script manually, because there is no 'viewScript' prop avail. for blockVariations.
	enqueue_asset( 'add-to-calendar' );

	return str_replace( 
		'</button>',
		'</button>' . $add_to_cal_links,
		$block_content
	);
}




