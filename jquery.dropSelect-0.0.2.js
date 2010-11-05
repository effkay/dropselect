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
            
            // TODO: wrapp stuff in container div? 
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

            // TODO: attach behaviour to menu links
            
        });
    };

    function buildMenu(select, dropdown) {
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
