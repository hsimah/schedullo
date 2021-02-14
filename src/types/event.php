<?php

final class Schedullo_Event
{
  public static function register_type()
  {
    $args = array(
      'label' => esc_html__('Events', 'schedullo'),
      'labels' => array(
        'menu_name' => esc_html__('Events', 'schedullo'),
        'name_admin_bar' => esc_html__('Event', 'schedullo'),
        'add_new' => esc_html__('Add new', 'schedullo'),
        'add_new_item' => esc_html__('Add new Event', 'schedullo'),
        'new_item' => esc_html__('New Event', 'schedullo'),
        'edit_item' => esc_html__('Edit Event', 'schedullo'),
        'view_item' => esc_html__('View Event', 'schedullo'),
        'update_item' => esc_html__('Update Event', 'schedullo'),
        'all_items' => esc_html__('All Events', 'schedullo'),
        'search_items' => esc_html__('Search Events', 'schedullo'),
        'parent_item_colon' => esc_html__('Parent Event', 'schedullo'),
        'not_found' => esc_html__('No Events found', 'schedullo'),
        'not_found_in_trash' => esc_html__('No Events found in Trash', 'schedullo'),
        'name' => esc_html__('Events', 'schedullo'),
        'singular_name' => esc_html__('Event', 'schedullo'),
      ),
      'public' => true,
      'description' => 'An event to be scheduled.',
      'exclude_from_search' => false,
      'publicly_queryable' => true,
      'show_ui' => true,
      'show_in_nav_menus' => true,
      'show_in_menu' => true,
      'show_in_admin_bar' => false,
      'show_in_rest' => false,
      'menu_position' => 24,
      'capability_type' => 'post',
      'hierarchical' => false,
      'has_archive' => true,
      'query_var' => true,
      'can_export' => true,
      'show_in_graphql' => true,
      'graphql_single_name' => 'Event',
      'graphql_plural_name' => 'Events',
      'supports' => array(
        'title',
        'author',
        'thumbnail',
        'excerpt',
      ),
      'rewrite' => array(
        'slug' => 'event',
        'with_front' => false,
      ),
    );

    register_post_type('event', $args);
    flush_rewrite_rules();
  }

  public static function register_fields($meta_boxes)
  {
    $meta_boxes[] = array(
      'title' => esc_html__('Events', 'schedullo'),
      'id' => 'events-fields',
      'post_types' => array(
        0 => 'event',
        1 => 'post'
      ),
      'context' => 'normal',
      'priority' => 'high',
      'fields' => array(
        array(
          'id' => 'scheduled_days_of_week',
          'type' => 'taxonomy',
          'name' => 'Days scheduled',
          'taxonomy' => 'days',
          'field_type' => 'select_advanced',
          'multiple' => true,
          'columns' => 3,
          'std' => array(),
          'graphql_name' => 'days'
        ),
        array(
          'name'       => 'Time scheduled',
          'id'         => 'scheduled_time_of_day',
          'type'       => 'time',
          'js_options' => array(
            'stepMinute'      => 15,
            'controlType'     => 'select',
            'showButtonPanel' => false,
            'oneLine'         => true,
          ),
          'inline'     => false,
          'graphql_name' => 'time',
          'graphql_mutate' => true
        ),
      ),
    );
    return $meta_boxes;
  }
}
