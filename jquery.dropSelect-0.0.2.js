/*
 *
 *
 *
 */

(function($) {
    $.fn.dropSelect = function(options) {
        var opts = $.extend({}, $.fn.dropSelect.defaults, options);
    };

    $.fn.dropSelect.defaults = {
        hide: true
        // TODO: maybe extend this to hide_select, hide_submit
        // TODO: maybe add onChange callback? or just ajax submit url?
    };

})(jQuery);
