<?php

final class Schedullo_Class
{
  /**
   * Stores the instance of the Schedullo_Class class
   *
   * @var Schedullo_Class The one true Schedullo_Class
   * @since  0.0.1
   * @access private
   */
  private static $instance;

  /**
   * The instance of the Schedullo_Class object
   *
   * @return object|Schedullo_Class - The one true Schedullo_Class
   * @since  0.0.1
   * @access public
   */
  public static function instance()
  {

    if (!isset(self::$instance) && !(self::$instance instanceof Schedullo_Class)) {
      self::$instance = new Schedullo_Class();
      self::$instance->init();
    }

    /**
     * Return the Schedullo_Class Instance
     */
    return self::$instance;
  }

  public static function init()
  {
    require_once plugin_dir_path(__FILE__) . 'types/Event.php';
    require_once plugin_dir_path(__FILE__) . 'types/Days.php';
    Event::register_type();
    add_filter('rwmb_meta_boxes', [Event::class, 'register_fields'], 10, 1);
    
    Day::register_taxonomy();
  }
}

add_action('init', function () {
  /**
   * Return an instance of the action
   */
  return Schedullo_Class::instance();
});
