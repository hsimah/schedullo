<?php

final class Schedullo_Days
{
  public static function register_taxonomy()
  {
    $args = array(
      'label' => esc_html__('Days', 'schedullo'),
      'labels' => array(
        'menu_name' => esc_html__('Days', 'schedullo'),
        'all_items' => esc_html__('All Days', 'schedullo'),
        'edit_item' => esc_html__('Edit Day Name', 'schedullo'),
        'view_item' => esc_html__('View Day Name', 'schedullo'),
        'update_item' => esc_html__('Update Day Name', 'schedullo'),
        'add_new_item' => esc_html__('Add new Day Name', 'schedullo'),
        'new_item_name' => esc_html__('New Day Name', 'schedullo'),
        'parent_item' => esc_html__('Parent Day Name', 'schedullo'),
        'parent_item_colon' => esc_html__('Parent Day Name:', 'schedullo'),
        'search_items' => esc_html__('Search Days', 'schedullo'),
        'popular_items' => esc_html__('Popular Days', 'schedullo'),
        'separate_items_with_commas' => esc_html__('Separate Days with commas', 'schedullo'),
        'add_or_remove_items' => esc_html__('Add or remove Days', 'schedullo'),
        'choose_from_most_used' => esc_html__('Choose most used Days', 'schedullo'),
        'not_found' => esc_html__('No Days found', 'schedullo'),
        'name' => esc_html__('Days', 'schedullo'),
        'singular_name' => esc_html__('Day Name', 'schedullo'),
      ),
      'public' => true,
      'show_ui' => true,
      'show_in_menu' => true,
      'show_in_nav_menus' => true,
      'show_tagcloud' => true,
      'show_in_quick_edit' => true,
      'show_in_rest' => true,
      'query_var' => true,
      'rewrite' => true,
      'show_in_graphql'     => true,
      'graphql_single_name' => 'Day',
      'graphql_plural_name' => 'Days',
    );

    register_taxonomy('days', array('event'), $args);
  }
}
