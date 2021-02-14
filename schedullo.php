<?php

/**
 * Plugin Name: Schedullo
 * Plugin URI: https://hsimah.com
 * Description: Schedullo
 * Author: hsimah
 * Version: 0.0.1
 * Text Domain: hsimah-services
 * License: GPL-3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package  schedullo
 * @author   hsimah
 * @version  0.0.1
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

if (!class_exists('Schedullo_Class')) {

  add_action('admin_init', function () {
    $versions = [
      'wp-graphql' => '1.0.4',
      'metabox' => '5.3.3',
      'wp-graphql-metabox' => '0.4.0'
    ];

    if (
      !class_exists('RWMB_Loader') ||
      !class_exists('WPGraphQL') ||
      (defined('WPGRAPHQL_VERSION') && version_compare(WPGRAPHQL_VERSION, $versions['wp-graphql'], 'lt')) ||
      (defined('RWMB_VER') && version_compare(RWMB_VER, $versions['metabox'], 'lt'))
    ) {

      /**
       * For users with lower capabilities, don't show the notice
       */
      if (!current_user_can('manage_options')) {
        return false;
      }

      add_action(
        'admin_notices',
        function () use ($versions) {
?>
        <div class="error notice">
          <p>
            <?php _e(vsprintf('Both WPGraphQL (v%s+); Meta Box (v%s+); wp-graphql-metabox (v%s+) must be active for "schedullo" to work', $versions), 'schedullo'); ?>
          </p>
        </div>
<?php
        }
      );

      return false;
    }
  });

  require_once __DIR__ . '/src/schedullo-class.php';
}
