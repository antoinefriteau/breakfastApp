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

        /*
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
        */


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
                    $('#overlay').hide('slow');
                })
                .progress( function() {
                    $('#overlay').show();
                })
            ;

        },
        
        /* TODO */
        saveData: function() {},

        loadPage: function( data ) {

            var breakfastAppDB = this;

            /* Empty content */
            $('#content').empty();

            /* TITLE */
            if( data.title ) {
                $('#title').append(
                    $( '<span>', { html: data.title } )
                );
            }

            /* PASTRIES */
            if( data.pastries instanceof Array && data.pastries.length > 0 ) {
                breakfastAppDB.loadPastries( data.pastries );
            }

            /* INFOS */
            if( data.infos instanceof Object ) {
                breakfastAppDB.loadInfos( data.infos );
            }

            /* CALENDAR */
            if( data.calendar instanceof Object ) {
                breakfastAppDB.loadCalendarInfo( data.calendar );
            }

            /* USERS */
            if( data.users instanceof Array && data.users.length > 0 ) {
                breakfastAppDB.loadUsers( data.users );
            }


        },

        loadUsers: function( users ) {
            var breakfastAppDB = this;
            var section = $( '<section>', {id: 'users'} );
            var ol = $( '<ol>' );
            var h3 = $( '<h3>users</h3>' );
            h3.appendTo(section);

            $(users).each( function(num, user) {

                if( user instanceof Object) {
                    var li = $( '<li>', { html: user.name } );

                    breakfastAppDB.addListItemFunctions(li);

                    li.appendTo(ol);
                }

            });

            ol.appendTo(section);
            section.appendTo('#content');
        },

        loadPastries: function(pastries) {
            var breakfastAppDB = this;
            var section = $( '<section>', {id: 'pastries'} );
            var ol = $( '<ol>' );
            var h3 = $( '<h3>pastries</h3>' );
            h3.appendTo(section);

            $(pastries).each( function(num, pastrie) {
                if( pastrie instanceof Object) {
                    var li = $( '<li>', { html: pastrie.name + ' x ' + pastrie.number });

                    breakfastAppDB.addListItemFunctions(li);

                    li.appendTo(ol);
                }
            });

            ol.appendTo(section);
            section.appendTo('#content');

        },

        loadInfos: function( infos ) {
            var section = $( '<section>', {id: 'infos'} );
            var h3 = $( '<h3>informations / various</h3>' );
            h3.appendTo(section);

            /* INFOS TITLE */
            if( infos.title ) {
                $(section).append(
                    $( '<p>', {
                        html: '<label>Titre : </label><input type="text" value="' + infos.title + '">'
                    })
                );
            }

            /* PRICE LABEL */
            if( infos.labelPrice ) {
                $(section).append(
                    $( '<p>', {
                        html: '<label>Label prix : </label><input type="text" value="' + infos.labelPrice + '">'
                    })
                );
            }

            /* PRICE INFOS */
            if( infos.price ) {
                $(section).append(
                    $( '<p>', {
                        html: '<label>Information prix : </label><input type="text" value="' + infos.price + '">'
                    })
                );
            }

            /* COMPLEMENT INFOS */
            if( infos.info ) {
                $(section).append(
                    $('<p>', {
                        html: '<label>Complément infos patisseries : </label><input type="text" value="' + infos.info + '">'
                    })
                );
            }

            section.appendTo('#content');
        },

        loadCalendarInfo: function( calendarInfo ) {
            /* TITLE */
            if( calendarInfo.title ) {
                $('#calendar').before(
                    $( '<h2>', {
                        html: calendarInfo.title
                    })
                );
            }

            /* CALENDAR CHECK */
            if( calendarInfo.calendarCheck ) {
                $('#calendar').before(
                    $( '<small>', {
                        html: calendarInfo.calendarCheck
                    })
                );
            }
        },

        addListItemFunctions: function(element) {

            var deleteButton = $( '<button>', {class: 'action delete', value: '', title: 'remove'} );
            deleteButton.click(function() { $(this).parent().slideUp('slow', function() { $(this).remove(); }); });
            deleteButton.appendTo(element);

            var sortButton = $( '<button>', {class: 'action sort', value: '', title: 'sort me'} );
            sortButton.click(function() { alert('drag me'); });
            sortButton.appendTo(element);
        }

    };


    $.fn.breakfastAppDB.defaults = {
        url: null
    };

}(jQuery))