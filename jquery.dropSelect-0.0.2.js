/*
 * TODO: make stylable trough options 
 * TODO: ability to add custom class to menu, button etc
 * TODO: 3 styles: top/bottom/centered menu
 *
 */

(function($) {
    $.fn.dropSelect = function(options) {
        var opts = $.extend({}, $.fn.dropSelect.defaults, options);
        return this.each(function() {
            $this = $(this);

            button = $('<div class="dropselect-button">' + $this.find('option:selected').text() + '</div>').insertAfter(this);
            dropdown = $('<ul class="dropselect-menu"></ul>').insertAfter(button);

            buildMenu($this);
            dropdown.hide();

            if (opts.hide_select == true) {
                $this.hide();
            };

            // TODO: attach behaviour to button
            // TODO: attach behaviour to menu links
            
        });
    };

    function buildMenu(select) {
        select.children().each(function() {
            var option = $(this);
            if (option.attr('selected') == true) {
                dropdown.append('<li class="selected">' + option.text() + '</li>');
            } else {
                dropdown.append('<li>' + option.text() + '</li>');
            };
        });
    };

    $.fn.dropSelect.defaults = {
        hide_select: true
        // TODO: maybe add onChange callback? or just ajax submit url?
    };

})(jQuery);
