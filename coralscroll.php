<?php
/**
 * Plugin Name: CoralScroll
 * Plugin URI: https://github.com/ssobczak/coralscroll
 * Description: This plugin adds paralax scrolling efects to images.
 * Version: 0.1.0
 * Author: Szymon Sobczak
 * Author URI: http://coralnotes.com
 * License: MIT
 */

    function coralscroll() {
        wp_enqueue_script('coralscroll-js',  $this->plugin_url . '/resources/js.js', array('jquery'));
        wp_enqueue_style('coralscroll-css',  $this->plugin_url . '/resources/css.css');
    }

    add_action( 'wp_footer', 'coralscroll');

?>