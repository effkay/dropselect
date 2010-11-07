/*
 *  Copyright (c) 2010 Felipe Kaufmann
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining
 *  a copy of this software and associated documentation files (the
 *  "Software"), to deal in the Software without restriction, including
 *  without limitation the rights to use, copy, modify, merge, publish,
 *  distribute, sublicense, and/or sell copies of the Software, and to
 *  permit persons to whom the Software is furnished to do so, subject to
 *  the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

(function($) {
    $.fn.dropSelect = function(options) {
        var opts = $.extend({}, $.fn.dropSelect.defaults, options);
        return this.each(function() {

            var select = $this = $(this);
            var button = $('<a href="" class="dropselect-button">' + $this.find('option:selected').text() + '</a>').insertAfter(this);
            var dropdown = $('<ul class="dropselect-menu"></ul>').insertAfter(button);

            buildMenu($this, dropdown);
            dropdown.hide();

            if (opts.hide_select == true) {
                $this.hide();
            };
            
            button.toggle(function() {
                dropdown.show();
                }, function() {
                dropdown.hide();
            });

            dropdown.find('a').each(function() {
                $(this).click(function(event) {
                    updateDropdown(this, select, dropdown, button);
                    event.preventDefault();
                });
            });
            
        });
    };

    /*
     *  Build menu from list options
     */ 
    function buildMenu(select, dropdown) {
        select.children().each(function() {
            var option = $(this);
            if (option.attr('selected') == true) {
                dropdown.append('<li class="selected"><a href="">' + option.text() + '</a></li>');
            } else {
                dropdown.append('<li><a href="">' + option.text() + '</a></li>');
            };
        });
    };

    /*
     *  Updates DropDown and select with active option
     *  TODO: make argument list shorter
     */
    function updateDropdown(option, select, dropdown, button) {
        $(dropdown).hide();
        $(select).find('option:selected').attr('selected', false);
        var selected_option = $(select).find('*:contains(' + $(option).text() + ')');
        selected_option.attr('selected', true);
        selected_option.change();
        button.click();
    };

    /*
     * Plugin defaults
     */
    $.fn.dropSelect.defaults = {
        hide_select: true
        // TODO: maybe add onChange callback? or just ajax submit url?
    };

})(jQuery);
