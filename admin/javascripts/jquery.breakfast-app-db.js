/*!
 * Breakfast App DB scripts v1.0.1
 * https://github.com/antoinefriteau/ptidej
 * MIT licensed
 *
 * Copyright (c) 2013 Antoine FRITEAU, antoinfriteau.fr
 */

(function( $ ) {
    "use strict";


    $.fn.breakfastAppDB = function( options ) {

        var opts, methods, breakfastData;

        opts    = $.extend({}, $.fn.breakfastAppDB.defaults, options);  // extends options
        methods = $.extend({}, $.fn, $.fn.breakfastAppDB.classMethods); // extends class methods


        // ADD RESET BUTTON
        var resetButton = $( '<button>', {class: 'reset', text: 'reset'} )
        resetButton.click(function() {
            methods.loadData( opts.url );
        });
        $('#content').before(resetButton);

        // ADD SAVE BUTTON
        var saveButton = $( '<button>', {class: 'save', text: 'save'} )
        saveButton.click(function() {
            methods.saveData(breakfastData);
        });
        $('#content').before(saveButton);


        // LOAD CONTENT
        methods.loadData( opts.url );

    };


    $.fn.breakfastAppDB.classMethods = {

        loadData: function( url ) {

            var breakfastAppDB = this;
            
            $.getJSON( url )
                .done( function( jSONdata ) {
                    breakfastAppDB.loadPage( jSONdata );
                    $('#overlay').hide('slow');
                })
                .fail( function( jqxhr, textStatus, error ) {
                    console.log( 'Request Failed : ' + textStatus + ', ' + error);
                    $('#overlay').slideD('slow');
                })
                .progress( function() {
                    $('#overlay').show();
                })
            ;

        },
        
        /* TODO */
        saveData: function() {},

        loadPage: function( data ) {

            /* Empty content */
            $('#content').empty();

            /* TITLE */
            if( data.title ) {

                $('#content').prepend(
                    $( '<h1>', {
                        html: 'Breakfast App ' //+ data.title
                    })
                );

                $('h1').after(
                    $( '<h2>', {
                        html: data.title
                    })
                );

            }

            /* INFOS */
            if( data.infos instanceof Object ) {

                var section = $( '<section>', {id: 'infos'} );

                /* INFOS TITLE */
                if( data.infos.title ) {
                    $(section).prepend(
                        $( '<p>', {
                            html: '<label>Titre : </label><input type="text" value="' + data.infos.title + '"">'
                        })
                    );
                }

                /* PRICE INFOS */
                if( data.infos.labelPrice && data.infos.price ) {
                    $(section).append(
                        $( '<p>', {
                            html: 'Information prix : ' + data.infos.labelPrice + data.infos.price
                        })
                    );
                }

                /* COMPLEMENT INFOS */
                if( data.infos.info ) {
                    $(section).append(
                        $('<p>', {
                            html: 'Complément infos patisseries' + data.infos.info
                        })
                    );
                }

                section.appendTo('#content');


                /* PASTRIES */
                if( data.infos.pastries instanceof Array && data.infos.pastries.length > 0 ) {

                    var section = $( '<section>', {id: 'pastries'} );
                    var ul = $( '<ul>' );

                    $(data.infos.pastries).each( function(num, pastrie) {
                        if( pastrie instanceof Object) {
                            $( '<li>', {
                                html: pastrie.number + ' ' + pastrie.name
                            }).appendTo(ul);
                        }
                    });

                    ul.appendTo(section);
                    section.appendTo('#content');

                }

            }


            /* CALENDAR */
    /* TODO ! */
            if( data.calendar instanceof Object ) {

                /* TITLE */
                if( data.calendar.title ) {
                    $('#calendar').before(
                        $( '<h2>', {
                            html: data.calendar.title
                        })
                    );
                }

                /* CALENDAR CHECK */
                if( data.calendar.calendarCheck ) {
                    $('#calendar').before(
                        $( '<small>', {
                            html: data.calendar.calendarCheck
                        })
                    );
                }

            }


            /* USERS */
            if( data.users instanceof Array && data.users.length > 0 ) {

                var section = $( '<section>', {id: 'users'} );
                var ol = $( '<ol>' );

                $(data.users).each( function(num, user) {

                    if( user instanceof Object) {
                        $( '<li>', { html: user.trigram } ).appendTo(ol);
                    }

                });

                ol.appendTo(section);
                section.appendTo('#content');

            }

        }

    };


    $.fn.breakfastAppDB.defaults = {
        url: null
    };

}(jQuery))