/*
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
