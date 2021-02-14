<?php

class Schedullo_Bootstrap
{
  /**
   * Bootstrap the plugin.
   */
  public function init()
  {
		$this->constants();
    require_once SCHEDULLO_INC_DIR . 'autoloader.php';
    $autoloader = new Schedullo_Autoloader();
    $autoloader->add(SCHEDULLO_SRC_DIR . 'core', 'Schedullo_');
    $autoloader->add(SCHEDULLO_SRC_DIR . 'types', 'Schedullo_');
    $autoloader->add(SCHEDULLO_SRC_DIR . 'taxonomies', 'Schedullo_');
    $autoloader->register();

    $core = new Schedullo_Core();
  }

  /**
   * Define plugin constants.
   */
  protected function constants()
  {
    define('SCHEDULLO_DIR', trailingslashit(dirname(dirname(__FILE__))));
    define('SCHEDULLO_INC_DIR', trailingslashit(SCHEDULLO_DIR . 'inc'));
    define('SCHEDULLO_SRC_DIR', trailingslashit(SCHEDULLO_DIR . 'src'));
  }
}
