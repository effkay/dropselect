/*
 * TODO: title should be from selected option
 * TODO: make stylable trough options 
 * TODO: ability to add custom class to menu, button etc
 *
 */

(function($) {
    $.fn.dropSelect = function(options) {
        var opts = $.extend({}, $.fn.dropSelect.defaults, options);
        return this.each(function() {
            $this = $(this);

            button = $('<div class="dropselect-button">' + $this.find('option:selected').text() + '</div>').insertAfter(this);
            dropdown = $('<ul class="dropselect-menu"></ul>').insertAfter(button);

            // extract below code into buildList();
            $this.children().each(function() {
                var option = $(this);
                if (option.attr('selected') == true) {
                    dropdown.append('<li class="selected">' + option.text() + '</li>');
                } else {
                    dropdown.append('<li>' + option.text() + '</li>');
                }
            });

            // TODO: attach behaviour to button
            // TODO: attach behaviour to menu links
        });
    };

    $.fn.dropSelect.defaults = {
        hide: true
        // TODO: maybe extend this to hide_select, hide_submit
        // TODO: maybe add onChange callback? or just ajax submit url?
    };

})(jQuery);
