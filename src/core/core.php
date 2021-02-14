<?php

final class Schedullo_Core
{
  /**
   * Stores the instance of the Schedullo_Core class
   *
   * @var Schedullo_Core The one true Schedullo_Core
   * @since  0.0.1
   * @access private
   */
  private static $instance;

  /**
   * The instance of the Schedullo_Core object
   *
   * @return object|Schedullo_Core - The one true Schedullo_Core
   * @since  0.0.1
   * @access public
   */
  public static function instance()
  {

    if (!isset(self::$instance) && !(self::$instance instanceof Schedullo_Core)) {
      self::$instance = new Schedullo_Core();
      self::$instance->init();
    }

    /**
     * Return the Schedullo_Core Instance
     */
    return self::$instance;
  }

  public static function init()
  {
    // register types and fields
    Schedullo_Event::register_type();
    add_filter('rwmb_meta_boxes', [Schedullo_Event::class, 'register_fields'], 10, 1);
    
    // register taxonomies
    Schedullo_Days::register_taxonomy();
  }
}

add_action('init', function () {
  /**
   * Return an instance of the action
   */
  return Schedullo_Core::instance();
});
