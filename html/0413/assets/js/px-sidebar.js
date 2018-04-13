+ function ($) {
    'use strict';

    var DataKey = 'px.sidebar';

    var Default = {
        width: null,
        enableScrollbar: !0,
        desktopMode: ['lg', 'xl'],
        navbarSelector: '> .px-navbar'
    };

    var Selector = {
        data_toggle: '[data-toggle="sidebar"]',
        content: '.px-sidebar-content',
        navbar_header: '.navbar-header'
    };

    var ClassName = {
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
        this.element = element;
        this.$content = $(element).find(Selector.content);
        this.parent = element.parentNode;
        this.config = this._getConfig(options);
        this._isRtl = 'rtl' === $('html').attr('dir');
        this._setWidth();
        this._setScrollbar();
        this._checkMode();
        this._setListeners();
    }

    PxSidebar.prototype.toggle = function () {
        this._triggerPreventableEvent(pxUtil.hasClass(this.element, "open") ? "COLLAPSE" : "EXPAND", this.element) && (pxUtil.toggleClass(this.element, "open"),
            this._triggerEvent(pxUtil.hasClass(this.element, "open") ? "EXPANDED" : "COLLAPSED", this.element));
    }

    PxSidebar.prototype.update = function () {
        var e = $(this.parent).find(this.config.navbarSelector + " " + Selector.navbar_header);
        if (e.length) {
            var n = e.height();
            if (pxUtil.hasClass(this.parent, ClassName.navbar_fixed) || !this._positioning)
                this.element.style.top = n + "px";
            else {
                var i = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
                this.element.style.top = i > n ? "0px" : n - i + "px"
            }
        }
        this.config.enableScrollbar && this.$content.perfectScrollbar("update");
    }

    PxSidebar.prototype.destroy = function () {
        this._unsetListeners();
        this._unsetScrollbar();
        $(this.element).removeData(DataKey);
    }

    // Private
    PxSidebar.prototype._getConfig = function (options) {
        return $.extend({}, Default, $(this.element).data(), options)
    }

    PxSidebar.prototype._setWidth = function () {
        var e = parseInt(this.config.width || $(this.element).width(), 10), n = undefined;
        n = this._isRtl ? pxUtil.hasClass(this.element, ClassName.left) ? "right" : "left" : pxUtil.hasClass(this.element, ClassName.left) ? "left" : "right";
        this.element.style.width = e + "px";
        this.element.style[n] = "-" + e + "px";
    }

    PxSidebar.prototype._setScrollbar = function () {
        if (this.config.enableScrollbar) {
            if (!this.$content.length)
                throw new Error(".px-sidebar-content element is not found.");
            this.$content.perfectScrollbar();
        }
    }

    PxSidebar.prototype._unsetScrollbar = function () {
        this.config.enableScrollbar && this.$content.length && this.$content.perfectScrollbar("destroy")
    }

    PxSidebar.prototype._triggerEvent = function (e, n) {
        var i = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : {};
        $(this.element).trigger($.Event(Event[e], {
            target: n
        }), [i])
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