/**                                                                 2010-02-09
 * meaningful header was not a priority.
 * 
 *
 *
 *
 *
 *
 */
 
(function($){

    $.fn.extend({ 

        //pass the options variable to the function
        dropSelect: function(options) {

            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                // TODO: define some meaningful default values
                // IdExtension: 'dropSelect',
            }

            var options =  $.extend(defaults, options);

            // helper function, attaches click events to list items
            function attachSelectlinks() {
                // TODO: is find by ID quicker? fix it!
                // TODO: cleanup local vars. Messy!
                $('a', '.dropdown_menu').each(function() {
                    $(this).click(function(event) {
                        var trigger_link = $(this);
                        var dropdown_id = trigger_link.parent().parent().attr('id').replace('_menu','');
                        var select = $('select#' + dropdown_id);
                        var option_text = trigger_link.text();
                        var option = $('option#' + option_text, '#' + dropdown_id);
                        var dropdown_button_link = $('a', '#' + dropdown_id + '_button');
                        
                        // just to make sure, unselect all, then select the correct option
                        $('#' + dropdown_id + ' option:selected').attr('selected', false);
                        option.attr('selected', true);
                        option.change();
                        
                        // replace button text with current selected value close dropdown and prevent default link behaviour
                        dropdown_button_link.text(option_text);
                        trigger_link.parent().parent().hide();
                        dropdown_button_link.removeClass('active');
                        resetToggle(dropdown_button_link.parent());
                        event.preventDefault();
                    });

                });
            }

            // helper function from: http://www.janfaessler.ch/2009/06/24/jquery-eventstoggle-status-reset/
            function resetToggle(selector) {
                    $(selector).each(function() {
                            this.lastToggle = undefined;
                    });
            }

            // do this for every container div
            return this.each(function() {
                var o = options;
                var container = $(this);
                var selects = $('select', "#" + container.attr('id'));

                // go trough each select in container
                selects.each(function() {

                    var select = $(this);
                    var select_id = select.attr('id');
                    var selected_item_text = select.find('option:selected').text();

                    // construct wrapper div, button and ul
                    var dropdown_container = container.append("<div class='dropdown_container'></div>").find('div.dropdown_container');
                    var dropdown_button = dropdown_container.append("<div class='dropdown_button'><a href=''>" + selected_item_text + "</a></div>").find('div.dropdown_button');
                    var dropdown_menu = dropdown_container.append("<ul class='dropdown_menu'></ul>").find('ul');

                    select.hide();
                    select.addClass('dropdown');
                    dropdown_id = select_id;
                    dropdown_container.attr('id', dropdown_id + '_container');
                    dropdown_button.attr('id', dropdown_id + '_button' );
                    dropdown_menu.attr('id', dropdown_id + '_menu' );

                    // check if option is selected, append correct list item
                    $(this).children().each(function() {
                        var option = $(this);
                        option.attr('id', option.text());
                        if (option.attr('selected') == true) {
                            dropdown_menu.append('<li class="selected"><a href="">' + option.text() + '</a></li>');
                        } else {
                            dropdown_menu.append('<li><a href="">' + option.text() + '</a></li>');
                      }
                    });

                });

                // delete any submit buttons if present
                // TODO: make this optional
                container.find('input[type=submit]').hide();

                // apply toggle on click behaviour
                container.find('div.dropdown_button').each(function() {
                    // toggle is cool cause toggle already preventsDefault
                    $(this).toggle(function() {
                        // TODO: allow custom animations
                        $(this).parent().find('ul.dropdown_menu').show();
                        $('body').addClass('dropped-down');
                        $(this).children('a').addClass('active');
                        }, function() {
                        $(this).parent().find('ul.dropdown_menu').hide();
                        $('body').removeClass('dropped-down');
                        $(this).children('a').removeClass('active');
                    });
                });
                
                attachSelectlinks();
                
                /**
                 * Close dropdown when clicking on body
                 */
                $('body').live('click', function() {
                  if ($(this).hasClass('dropped-down') == true) {
                      $('ul.dropdown_menu').hide();
                      $('body').removeClass('dropped-down');
                      $('div.dropdown_button').children('a').removeClass('active');
                      resetToggle($('div.dropdown_button'));
                  }
                });
                
                
            });
        }
    });
})(jQuery);

