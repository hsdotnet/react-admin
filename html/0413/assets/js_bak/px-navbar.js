+ function ($) {
    'use strict';

    var DataKey = 'px.navbar';

    var ClassName = {
        NAVBAR: "px-navbar",
        INNER: "px-navbar-collapse-inner",
        IN: "in",
        COLLAPSED: "collapsed"
    };

    var Selector = {
        DATA_TOGGLE: '.navbar-toggle[data-toggle="collapse"]',
        DROPDOWN_TOGGLE: '.dropdown-toggle[data-toggle="dropdown"]',
        COLLAPSE: ".navbar-collapse",
        DROPDOWN: ".dropdown"
    };

    var Event = {
        CLICK_DATA_API: "click.px.navbar.data-api",
        RESIZE: "resize.px.navbar",
        CLICK: "click.px.navbar",
        MOUSEDOWN: "mousedown.px.navbar",
        COLLAPSE_SHOW: "show.bs.collapse.px.navbar",
        COLLAPSE_SHOWN: "shown.bs.collapse.px.navbar",
        COLLAPSE_HIDDEN: "hidden.bs.collapse.px.navbar",
        DROPDOWN_SHOWN: "shown.bs.dropdown.px.navbar",
        DROPDOWN_HIDDEN: "hidden.bs.dropdown.px.navbar"
    };

    var PxNavbar = function (element) {
        if (!$.fn.perfectScrollbar)
            throw new Error('Scrolling feature requires the "perfect-scrollbar" plugin included.');
        this.uniqueId = pxUtil.generateUniqueId();
        this.element = element;
        this.$collapse = $(element).find(Selector.COLLAPSE);
        this.$toggle = $(element).find(Selector.DATA_TOGGLE);
        this._scrollbarEnabled = 0;
        this._curScrollTop = 0;
        this.$collapse.length && this.$toggle.length && (this.$inner = this._setupInnerContainer(),
            this._setListeners())
    }

    PxNavbar.prototype.updateScrollbar = function () {
        this._scrollbarEnabled && (this._updateHeight(),
            this.$inner.scrollTop(this._curScrollTop).perfectScrollbar("update"))
    }

    PxNavbar.prototype.destroy = function () {
        this._unsetListeners(),
            this._disableScrollbar(),
            this.$collapse.append(this.$inner.find("> *")),
            this.$inner.remove(),
            $(this.element).removeData("px.navbar")
    }

    // Private
    PxNavbar.prototype._updateHeight = function () {
        var t = $(window).height() - this.$collapse[0].offsetTop;
        this.$collapse.height(""),
            this.$collapse.height() > t && this.$collapse.height(t + "px")
    }

    PxNavbar.prototype._enableScrollbar = function () {
        this._scrollbarEnabled || (this._updateHeight(),
            this.$inner.perfectScrollbar({
                suppressScrollX: !0
            }),
            this._scrollbarEnabled = 1)
    }

    PxNavbar.prototype._disableScrollbar = function () {
        this._scrollbarEnabled && (this.$collapse.height(""),
            this.$inner.perfectScrollbar("destroy"),
            this._scrollbarEnabled = 0)
    }

    PxNavbar.prototype._setupInnerContainer = function () {
        var t = $('<div class="' + ClassName.INNER + '"></div>');
        return t.append(this.$collapse.find("> *")),
            this.$collapse.append(t),
            t
    }

    PxNavbar.prototype._setListeners = function () {
        var t = this
            , n = this;
        $(window).on(Event.RESIZE + "." + this.uniqueId, function () {
            t._scrollbarEnabled && (t.$toggle.is(":visible") ? (t._curScrollTop = t.$inner[0].scrollTop,
                t.updateScrollbar()) : (t._disableScrollbar(),
                    t.$collapse.removeClass(ClassName.IN),
                    t.$toggle.addClass(ClassName.COLLAPSED),
                    t.$collapse.attr("aria-expanded", "false"),
                    t.$toggle.attr("aria-expanded", "false")))
        });
        $(this.element).on(Event.COLLAPSE_SHOW, Selector.COLLAPSE, function () {
            t.$collapse.find(".dropdown.open").removeClass("open")
        }).on(Event.COLLAPSE_SHOWN, Selector.COLLAPSE, function () {
            t._enableScrollbar()
        }).on(Event.COLLAPSE_HIDDEN, Selector.COLLAPSE, function () {
            t._disableScrollbar()
        }).on(Event.DROPDOWN_SHOWN + " " + Event.DROPDOWN_HIDDEN, Selector.DROPDOWN, function () {
            t.updateScrollbar()
        }).on(Event.MOUSEDOWN, Selector.DROPDOWN_TOGGLE, function () {
            if (!t._scrollbarEnabled)
                return !0;
            t._curScrollTop = t.$inner[0].scrollTop
        }).on(Event.CLICK, Selector.DROPDOWN_TOGGLE, function (e) {
            return !n._scrollbarEnabled || (!this.getAttribute("href") || "#" === this.getAttribute("href") || (e.preventDefault(),
                e.stopPropagation(),
                this.removeAttribute("data-toggle"),
                this.click(),
                void this.setAttribute("data-toggle", "dropdown")))
        })
    }

    PxNavbar.prototype._unsetListeners = function () {
        $(window).off(Event.RESIZE + "." + this.uniqueId),
            $(this.element).off('.px.navbar')
    }

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data(DataKey)

            if (data || (data = new PxNavbar(this),
                this.data(DataKey, data),
                $.support.transition || "true" !== $(this).find(Selector.DATA_TOGGLE).attr("aria-expanded") || data._enableScrollbar()),
                "string" == typeof t) {
                data[option]()
            }
        })
    }

    var old = $.fn.pxNavbar;
    $.fn.pxNavbar = Plugin;
    $.fn.pxNavbar.Constructor = PxNavbar;
    $.fn.pxNavbar.noConflict = function () {
        $.fn.pxNavbar = old
        return this
    };

    $(document).on(Event.CLICK_DATA_API, "." + ClassName.NAVBAR + " " + Selector.DATA_TOGGLE, function (e) {
        e.preventDefault();
        var n = $(this).parents("." + ClassName.NAVBAR);
        n.length && (n.data(DataKey) || Plugin.call(n))
    })

}(jQuery);