<?php
/**
 * Plugin Name: CoralScroll
 * Plugin URI: https://github.com/ssobczak/coralscroll
 * Description: This plugin adds paralax scrolling efects to images.
 * Version: 0.2:.0
 * Author: Szymon Sobczak
 * Author URI: http://coralnotes.com
 * License: MIT
 */

    function coralscroll() {
        wp_enqueue_script('coralscroll-js',  plugin_dir_url( __FILE__ ) . '/resources/js.js', array('jquery'));
        wp_enqueue_style('coralscroll-css',  plugin_dir_url( __FILE__ ) . '/resources/css.css');
    }

    add_action( 'wp_head', 'coralscroll');

?>
