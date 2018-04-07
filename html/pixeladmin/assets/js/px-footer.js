+ function ($) {
    'use strict';

    var DataKey = 'px.footer';

    var ClassName = {
        CONTENT: "px-content",
        BOTTOM: "px-footer-bottom",
        FIXED: "px-footer-fixed"
    };

    var Event = {
        RESIZE: "resize.px.footer",
        SCROLL: "scroll.px.footer",
        NAV_EXPANDED: "expanded.px.nav",
        NAV_COLLAPSED: "collapsed.px.nav",
        DROPDOWN_OPENED: "dropdown-opened.px.nav",
        DROPDOWN_CLOSED: "dropdown-closed.px.nav"
    };

    var PxFooter = function (element) {
        this.uniqueId = pxUtil.generateUniqueId();
        this.element = element;
        this.parent = this._getParent(element);
        this._setListeners();
        this.update();
    }

    PxFooter.prototype.update = function () {
        this.parent === document.body && (this._curScreenSize = window.PixelAdmin.getScreenSize(),
            this._updateBodyMinHeight());
        var e = $(this.element.parentNode).find("> ." + ClassName.CONTENT)[0];
        pxUtil.hasClass(this.element, ClassName.BOTTOM) || pxUtil.hasClass(this.element, ClassName.FIXED) ? e.style.paddingBottom = $(this.element).outerHeight() + 20 + "px" : e.style.paddingBottom = e.setAttribute("style", (e.getAttribute("style") || "").replace(/\s*padding-bottom:\s*\d+px\s*;?/i))
    }

    PxFooter.prototype.destroy = function () {
        this._unsetListeners(),
            $(this.element).removeData(DataKey),
            $(document.body).css("min-height", "");
        var e = $(this.element.parentNode).find("> ." + ClassName.CONTENT)[0];
        e.style.paddingBottom = e.setAttribute("style", (e.getAttribute("style") || "").replace(/\s*padding-bottom:\s*\d+px\s*;?/i))
    }

    // Private
    PxFooter.prototype._getParent = function (t) {
        for (var e = t.parentNode; "ui-view" === e.nodeName.toLowerCase();)
            e = e.parentNode;
        return e
    }

    PxFooter.prototype._updateBodyMinHeight = function (t) {
        document.body.style.minHeight && (document.body.style.minHeight = null),
            "lg" !== this._curScreenSize && "xl" !== this._curScreenSize || !pxUtil.hasClass(this.element, ClassName.BOTTOM) || $(document.body).height() >= document.body.scrollHeight || (document.body.style.minHeight = document.body.scrollHeight + "px")
    }

    PxFooter.prototype._setListeners = function () {
        $(window).on(Event.RESIZE + "." + this.uniqueId, $.proxy(this.update, this)).on(Event.SCROLL + "." + this.uniqueId, $.proxy(this._updateBodyMinHeight, this)).on(Event.NAV_EXPANDED + "." + this.uniqueId + " " + Event.NAV_COLLAPSED + "." + this.uniqueId, ".px-nav", $.proxy(this._updateBodyMinHeight, this)),
            this.parent === document.body && $(".px-nav").on(Event.DROPDOWN_OPENED + "." + this.uniqueId + " " + Event.DROPDOWN_CLOSED + "." + this.uniqueId, ".px-nav-dropdown", $.proxy(this._updateBodyMinHeight, this))
    }

    PxFooter.prototype._unsetListeners = function () {
        $(window).off(Event.RESIZE + "." + this.uniqueId + " " + Event.SCROLL + "." + this.uniqueId).off(Event.NAV_EXPANDED + "." + this.uniqueId + " " + Event.NAV_COLLAPSED + "." + this.uniqueId),
            $(".px-nav").off(Event.DROPDOWN_OPENED + "." + this.uniqueId + " " + Event.DROPDOWN_CLOSED + "." + this.uniqueId)
    }

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data(DataKey)
            if (!data) $this.data(DataKey, (data = new PxFooter(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.pxFooter;
    $.fn.pxFooter = Plugin;
    $.fn.pxFooter.Constructor = PxFooter;
    $.fn.pxFooter.noConflict = function () {
        $.fn.pxFooter = old
        return this
    };

}(jQuery);