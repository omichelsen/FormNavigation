/*!
* formNavigation
* Copyright 2013 Ole Bjørn Michelsen <http://ole.michelsen.dk/>
* MIT license
*/
;(function ($, undefined) {
    var pluginName = 'formNavigation';
    var defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        $(this.element)
            .find('input').on('keyup', function(e) {
                switch (e.which) {
                    case 39:
                        $(this).closest('td').next().find('input').focus(); break;
                    case 37:
                        $(this).closest('td').prev().find('input').focus(); break;
                    case 40:
                        $(this).closest('tr').next().children().eq($(this).closest('td').index()).find('input').focus(); break;
                    case 38:
                        $(this).closest('tr').prev().children().eq($(this).closest('td').index()).find('input').focus(); break;
                }
            });
    };

    Plugin.prototype.destroy = function () {
        $(this.element).off('.' + this._name); // remove plugin event handlers
        $.removeData(this.element, 'plugin_' + this._name); // remove plugin data
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin(this, options));
            }
        });
    };
})(jQuery);