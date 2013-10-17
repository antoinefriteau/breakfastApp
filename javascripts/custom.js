/*!
 * Custom scripts
 * https://github.com/antoinefriteau/ptidej
 *
 * Copyright (c) 2013 Antoine FRITEAU, antoinfriteau.fr
 */
(function(jQuery) {

    jQuery(function() {

		jQuery.getJSON( './data/data.json' )
			.done(function( breakfastData ) {

				/* TITLE */
				if( breakfastData.title ) {

					jQuery('#content').prepend(
						jQuery( '<h1>', {
							html: breakfastData.title
						})
					);
					document.title = breakfastData.title;

				}

				/* INFOS */
				if( breakfastData.infos instanceof Object ) {

					/* INFOS TITLE */
					if( breakfastData.infos.title ) {
						jQuery('.aside').prepend(
							jQuery( '<h2>', {
								html: breakfastData.infos.title
							})
						);
					}

					/* PRICE INFOS */
					if( breakfastData.infos.labelPrice && breakfastData.infos.price ) {
						jQuery('#pastries').before(
							jQuery( '<p>', {
								html: '<strong>' + breakfastData.infos.labelPrice + ' : </strong>' + breakfastData.infos.price
							})
						);
					}

					/* COMPLEMENT INFOS */
					if( breakfastData.infos.info ) {
						jQuery('#pastries').before(
							jQuery('<small>', {
								html: breakfastData.infos.info
							})
						);
					}

				}

				/* PASTRIES */
				if( breakfastData.pastries instanceof Array && breakfastData.pastries.length > 0 ) {

					jQuery(breakfastData.pastries).each( function(num, pastrie) {
						if( pastrie instanceof Object) {
							jQuery( '<li>', {
								html: pastrie.number + ' ' + pastrie.name
							}).appendTo('#pastries');
						}
					});
				}

				/* CALENDAR */
				if( breakfastData.calendar instanceof Object ) {

					/* TITLE */
					if( breakfastData.calendar.title ) {
						jQuery('#calendar').before(
							jQuery( '<h2>', {
								html: breakfastData.calendar.title
							})
						);
					}

					/* CALENDAR CHECK */
					if( breakfastData.calendar.calendarCheck ) {
						jQuery('#calendar').before(
							jQuery( '<small>', {
								html: breakfastData.calendar.calendarCheck
							})
						);
					}

				}

				/* USERS */
				if( breakfastData.users instanceof Array && breakfastData.users.length > 0 ) {
					jQuery(breakfastData.users).each( function(num, user) {
						if( user instanceof Object) {
							jQuery( '<li>', {
								html: user.name + '<strong>20/04/2013</strong>'
							}).appendTo('#calendar');
						}
					});
				}

			})
			.fail(function( jqxhr, status, error ) {
				//console.log( 'Request Failed: ' + status + ', ' + error );
			});

    });

}(jQuery));