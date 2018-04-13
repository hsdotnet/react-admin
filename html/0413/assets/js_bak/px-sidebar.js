+ function ($) {
    'use strict';

    var DataKey = 'px.sidebar';

    var Default = {
        width: null,
        enableScrollbar: true,
        desktopMode: ['lg', 'xl'],
        navbarSelector: '> .px-navbar'
    };

    var Selector = {
        data_toggle: '[data-toggle="sidebar"]',
        content: '.px-sidebar-content',
        navbar_header: '.navbar-header'
    };

    var ClassName = {
        open:'open',
        navbar_fixed: "px-navbar-fixed",
        left: "px-sidebar-left"
    };

    var Event = {
        RESIZE: "resize." + DataKey,
        SCROLL: "scroll." + DataKey,
        CLICK_DATA_API: "click.px.sidebar.data-api",
        EXPAND: "expand." + DataKey,
        EXPANDED: "expanded." + DataKey,
        COLLAPSE: "collapse." + DataKey,
        COLLAPSED: "collapsed." + DataKey
    };

    var PxSidebar = function (element, options) {
        this.uniqueId = pxUtil.generateUniqueId();
        this.element = $(element);
        this.$content = this.element.find(Selector.content);
        this.parent = $(element.parentNode); //todo
        this.config = $.extend({}, Default, this.element.data(), options);
        this._isRtl = 'rtl' === $('html').attr('dir');
        this._setWidth();
        this._setScrollbar();
        this._checkMode();
        this._setListeners();
    }

    PxSidebar.prototype.toggle = function () {
        var open = this.element.hasClass(ClassName.open);
        if (this._triggerPreventableEvent(open ? Event.COLLAPSE : Event.EXPAND), this.element) {
            this.element.toggleClass(ClassName.open);
        } else {
            this.element.trigger($.Event(open ? Event.EXPANDED : Event.COLLAPSED, { target: this.element[0] }));
        }
    }

    PxSidebar.prototype.update = function () {
        var e = this.parent.find(this.config.navbarSelector + " " + Selector.navbar_header);
        if (e.length) {
            var n = e.height(), top = 0;
            if (this.parent.hasClass(ClassName.navbar_fixed) || !this._positioning) {
                top = n;
            } else {
                var i = 0;
                if (document.documentElement.scrollTop > 0) {
                    i = document.documentElement.scrollTop;
                }
                else if (document.body.scrollTop > 0) {
                    i = document.body.scrollTop;
                }
                if (i <= n) top = n - i;
            }
            this.element.css({ top: n });
        }
        if (this.config.enableScrollbar) {
            this.$content.perfectScrollbar("update");
        }
    }

    PxSidebar.prototype.destroy = function () {
        this._unsetListeners();
        this._unsetScrollbar();
        this.element.removeData(DataKey);
    }

    // Private
    PxSidebar.prototype._setWidth = function () {
        var e = parseInt(this.config.width || this.element.width(), 10), n;
        if (this._isRtl) {
            n = this.element.hasClass(ClassName.left) ? 'right' : 'left';
        } else {
            n = this.element.hasClass(ClassName.left) ? 'left' : 'right';
        }
        this.element.css('width', e);
        this.element.css(n, -e);
    }

    PxSidebar.prototype._setScrollbar = function () {
        if (this.config.enableScrollbar) {
            if (!this.$content.length)
                throw new Error(".px-sidebar-content element is not found.");
            this.$content.perfectScrollbar();
        }
    }

    PxSidebar.prototype._unsetScrollbar = function () {
        if (this.config.enableScrollbar && this.$content.length > 0) {
            this.$content.perfectScrollbar('destroy');
        }
    }

    PxSidebar.prototype._triggerPreventableEvent = function (e, n) {
        var i = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : {}
            , r = $.Event(Event[e], {
                target: n
            });
        return $(this.element).trigger(r, [i]),
            !r.isDefaultPrevented()
    }

    PxSidebar.prototype._unsetListeners = function () {
        $(window).off(Event.RESIZE + "." + this.uniqueId).off(Event.SCROLL + "." + this.uniqueId)
    }

    PxSidebar.prototype._checkMode = function () {
        this._positioning = -1 !== this.config.desktopMode.indexOf(window.PixelAdmin.getScreenSize());
        this.update();
    }

    PxSidebar.prototype._setListeners = function () {
        $(window).on(Event.RESIZE + "." + this.uniqueId, $.proxy(this._checkMode, this)).on(Event.SCROLL + "." + this.uniqueId, $.proxy(this.update, this));
    }

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data(DataKey)
            var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data(DataKey, (data = new PxSidebar(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.pxSidebar;
    $.fn.pxSidebar = Plugin;
    $.fn.pxSidebar.Constructor = PxSidebar;
    $.fn.pxSidebar.noConflict = function () {
        $.fn.pxSidebar = old
        return this
    };

    $(document).on(Event.CLICK_DATA_API, Selector.data_toggle, function (e) {
        e.preventDefault();
        var i = this.getAttribute("data-target")
            , r = i ? $(i)[0] : null;
        r && ($(r).data(DataKey) || Plugin.call($(r), $(this).data()),
            Plugin.call($(r), "toggle"))
    })

}(jQuery);