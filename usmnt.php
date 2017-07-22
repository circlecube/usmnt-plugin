<?php
/**
 * @package USMNT
 * @version 1.0
 */
/*
 * Plugin Name: USMNT Functionality Plugin
 * Plugin URI:        http://app.circlcube.com/usmnt
 * Description:       Functionality for USMNT App
 * Author:            Evan Mullins
 * Version:           1.0
 * License:           GNU General Public License v2
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * GitHub Plugin URI: https://github.com/circlecube/usmnt-plugin
 */


	
	function publish_match_update_players( $ID, $post ) {
		delete_transient( 'roster_json' );
		delete_transient( 'all_matches_table' );
		delete_transient( 'all_coaches_table' );

		// increment caps, matches and goals for players when they are added to a match
		if ( $post->post_type == 'match') {
			
			//check players array for player ids
			$players = get_field('players');
			if ( is_array( $players ) ) {
				foreach($players as $player) {
					
					//but only when the update players checkbox is ticked.
					if ( get_field('update_players_on_save') ) {
						//increment caps for that player
						$current_player_caps = intval(get_field('caps', $player)) + 1;
						//field_54f28167cd525
						update_field('field_54f28167cd525', $current_player_caps, $player);
					}
					//add match to players list of matches - ALWAYS
					//field_54f296d36fa8b
					$current_player_matches = get_field('matches', $player);
					if ( is_array($current_player_matches) ) {
						array_push($current_player_matches, $post->ID);
					}
					else {
						$current_player_matches[0] = $post->ID;
					}
					update_field('field_54f296d36fa8b', $current_player_matches, $player);
				}
			}
			
			//check goals repeater for player ids
			if ( get_field('update_players_on_save') ){
				if ( have_rows('goals') ) {
					while( have_rows('goals') ) {
						the_row();
						$goalers = get_sub_field('player');
						if ( $goalers ) {
							foreach ( $goalers as $goaler ) {
								// setup_postdata($post);
								$goaler_id = $goaler;
								//increment goals for that goalers
								$current_goaler_goals = intval(get_field('goals', $goaler_id)) + 1;
								//field_54f2817dcd526
								update_field('field_54f2817dcd526', $current_goaler_goals, $goaler_id);
							}
							// wp_reset_postdata();
						}
					}
				}
			}
			//update notes field for this match - just for quick testing
			// update_field('field_54f5c1e6ee5e2', 'new save ' . $current_goaler_goal . ' ' . $goaler_id);
			
			//check coach and update their stats too!
			$coachs = get_field('coach');
			if ( is_array( $coachs ) ) {
				foreach($coachs as $coach) {
					
					//but only when the update players checkbox is ticked.
					if ( get_field('update_players_on_save') ) {
						//increment caps for that coach
						$current_coach_caps = intval( get_field('caps', $coach) ) + 1;
						//field_559d4d607f03b
						update_field('field_559d4d607f03b', $current_coach_caps, $coach);
						
						//increment win/lose/draw value depending on if the match was a win/lose/draw
						$result_terms = get_the_terms( $post->ID, 'result');
						$results = [];
						foreach ( $result_terms as $term ) {
							$results[] = $term->name;
							// var_dump($term);
							$result_permalink = get_term_link( $term );
						}
						$result = $results[0];
						// update_field('field_54f5c1e6ee5e2', 'new save ' . $result);
						if ( $result == 'W' ) {
							$current_coach_wins = intval( get_field('wins', $coach) ) + 1;
							update_field('field_559d4d607f0ba', $current_coach_wins, $coach);
						}
						if ( $result == 'L' ){
							$current_coach_loses = intval( get_field('loses', $coach) ) + 1;
							update_field('field_559d4da90ee58', $current_coach_loses, $coach);
						}
						if ( $result == 'D' ){
							$current_coach_draws = intval( get_field('draws', $coach) ) + 1;
							update_field('field_559d4eed2148c', $current_coach_draws, $coach);
						}
						
					}
					
					//add match to coachs list of matches - ALWAYS
					//field_559d4d607f22c
					$current_coach_matches = get_field('matches', $coach);
					if ( is_array($current_coach_matches) ) {
						array_push($current_coach_matches, $post->ID);
					}
					else {
						$current_coach_matches[0] = $post->ID;
					}
					update_field('field_559d4d607f22c', $current_coach_matches, $coach);
				}
			}
			
			if ( get_field('update_players_on_save') ) {
				//set update option to false
				update_field('field_54f9b03e48e42', false);
			}
			
		}
		
		// add player to match when match is added to player
		if ( $post->post_type == 'player' ) {
			
			//check match relationship field data
			$player_matches = get_field('matches');
			if ( $player_matches ) {
				//loop all matches and 
				foreach( $player_matches as $match) {
					//add player to match
					$current_match_players = get_field('players', $match);
					if ( is_array($current_match_players) ){
						if ( !in_array($post->ID, $current_match_players) ) {
							array_push($current_match_players, $post->ID);
						}
					}
					else {
						$current_match_players[0] = $post->ID;
					}
					//field_54f290379b8f3
					update_field('field_54f290379b8f3', $current_match_players, $match);
					// update_field('field_54f5c1e6ee5e2', 'updated from player', $match);

				}
			}
			
		}
		
		// add coach to match when match is added to coach
		if ( $post->post_type == 'coach' ) {
			
			//check match relationship field data
			$coach_matches = get_field('matches');
			if ( $coach_matches ) {
				//loop all matches and 
				foreach( $coach_matches as $match) {
					//add coach to match
					$current_match_coaches = get_field('coach', $match);
					if ( $current_match_coaches ){
						// if data already exists do nothing
					}
					else {
						$current_match_coaches[0] = $post->ID;
					}
					//field_55a50a8e38597
					update_field('field_55a50a8e38597', $current_match_coaches, $match);
					// update_field('field_54f5c1e6ee5e2', 'updated from player', $match);

				}
			}
			
		}
	}
	add_action( 'save_post', 'publish_match_update_players', 10, 3 );
	

	// api call for full list of players alphabetized
	// http://music.circlecube.com/wp-json/posts?type=song&filter[posts_per_page]=-1&filter[orderby]=title&filter[order]=ASC

	// api call for full list of matches
	// http://app.circlecube.com/usmnt/wp-json/posts?type=match&filter[posts_per_page]=-1

	//https://github.com/WP-API/WP-API/issues/433
	//add ACF fields to json
	function json_api_prepare_post( $post_response, $post, $context ) {
	  if( get_fields($post['ID']) ){
	  	// add ACF fileds into an acf object
	    $post_response['acf'] = get_fields($post['ID']);
	    // add ACF fields at root of post object
	    // $acf_fields = get_fields($post['ID']);
    	// foreach ($acf_fields as $key => $value) {
    	//     $post_response[$key] = $value;
    	// }
    	
    	
	    return $post_response;
	  }
	}
	// add_filter( 'json_prepare_post', 'json_api_prepare_post', 10, 3 );



	//  load custom js for data entry helper
	// Register Script
	function usmnt_scripts() {
		// if( $hook != 'edit.php' ) 
				// return;
		 
			wp_enqueue_script( 'usmnt_js', plugin_dir_url( __FILE__ ) . 'js/script.js');
			
	}
	// Hook into the 'admin_enqueue_scripts' action
	add_action( 'admin_enqueue_scripts', 'usmnt_scripts' );
	
	//load custom css for admin style tweaks
	function usmnt_styles() {
		wp_enqueue_style( 'usmnt_css', plugin_dir_url( __FILE__ ) . 'css/styles.css' );
	}
	add_action( 'admin_enqueue_scripts', 'usmnt_styles' );



	//https://gist.github.com/klihelp/fb4f292a1ec20e97efab
	
	
	/**
	 * Posts per page
	 */
	function kli_wp_api_query_post_per_page( $query ){
	    if ( defined( 'JSON_REQUEST' ) && TRUE == JSON_REQUEST ){
	            $query->set( 'posts_per_page', -1);
	    }
	}
	add_action( 'pre_get_posts', 'kli_wp_api_query_post_per_page' );



	/**
	 * Prepare post fields - Remove some fields
	 * @param  object $data   
	 * @return object
	 */
	function kli_wp_api_prepare_post( $data ){

	    // var_dump($data);
	    // exit;

	    // Remove fields
	    $fields = [ 'author',
	    			'status',
	    			'excerpt',
	    			'guid',
	    			'parent',
	    			'format',
	    			'meta',
	    			'menu_order',
	    			'date_tz',
	    			'modified_tz',
	    			'modified_gmt',
					'comment_status',
					'ping_status',
					'sticky',
					'date_gmt'
				];
	    
	    foreach ($fields as $value) {
	        if ( isset($data[$value]) ) {
	            unset($data[$value]);
	        }
	    }

	    return $data;
	}
	add_action( 'json_prepare_post', 'kli_wp_api_prepare_post', 100);





	function array_sort_by_column(&$array, $column, $direction = SORT_ASC) {
	    $reference_array = array();

	    foreach($array as $key => $row) {
	        $reference_array[$key] = $row[$column];
	    }

	    array_multisort($reference_array, $direction, $array);
	}
	
	
	// sort the matches by date - NOT WORKING
	//http://www.advancedcustomfields.com/resources/customize-the-relationship-field-list-query/
	function match_acf_result_query( $args, $field, $post ) {
	    // eg from https://codex.wordpress.org/Class_Reference/WP_Query#Custom_Field_Parameters
	    $args['meta_query'] = array(
	        array(
				'meta_key'		=> 'date',
				'orderby'		=> 'meta_value_num',
				'order'			=> 'DESC'
	        )
	    );

	    return $args;
	}

	// acf/fields/relationship/result/name={$field_name} - filter for a specific field based on it's name
	// add_filter('acf/fields/relationship/queryname=matches', 'match_acf_result_query', 10, 3);
	
	
?>
