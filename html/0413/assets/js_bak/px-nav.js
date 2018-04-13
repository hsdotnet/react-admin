+ function ($) {
    'use strict';

    var DataKey = 'px.nav';

    var Default = {
        accordion: true,
        transitionDuration: 300,
        dropdownCloseDelay: 400,
        enableTooltips: true,
        animate: true,
        storeState: true,
        storagePrefix: "px-nav.",
        modes: {
            phone: ["xs"],
            tablet: ["sm", "md"],
            desktop: ["lg", "xl"]
        }
    };

    var Selector = {
        DATA_TOGGLE: '[data-toggle="px-nav"]',
        CONTENT: ".px-nav-content",
        ITEM: "> .px-nav-item",
        ITEM_LABEL: "> a > .px-nav-label",
        ROOT_LINK: "> .px-nav-item:not(.px-nav-dropdown) > a",
        DROPDOWN_LINK: ".px-nav-dropdown > a",
        DROPDOWN_MENU: "> .px-nav-dropdown-menu",
        DROPDOWN_MENU_TITLE: "> .px-nav-dropdown-menu-title",
        OPENED_DROPDOWNS: "> .px-nav-dropdown.px-open",
        SHOWN_DROPDOWNS: "> .px-nav-dropdown.px-show",
        FROZEN_DROPDOWNS: ".px-nav-dropdown.freeze",
        SCROLLABLE_AREA: ".px-nav-scrollable-area",
        NEAR_NAVBAR: "~ .px-navbar",
        ITEM_LINK: ".px-nav-item:not(.px-nav-dropdown) > a",
    };

    var ClassName = {
        NAV: "px-nav",
        NAV_LEFT: "px-nav-left",
        CONTENT: "px-nav-content",
        EXPAND: "px-nav-expand",
        STATIC: "px-nav-static",
        COLLAPSE: "px-nav-collapse",
        ANIMATE: "px-nav-animate",
        NAV_TRANSITIONING: "px-nav-transitioning",
        DIMMER: "px-nav-dimmer",
        FIXED: "px-nav-fixed",
        OFF_CANVAS: "px-nav-off-canvas",
        SCROLLABLE_AREA: "px-nav-scrollable-area",
        ITEM: "px-nav-item",
        TOOLTIP: "px-nav-tooltip",
        DROPDOWN: "px-nav-dropdown",
        DROPDOWN_MENU: "px-nav-dropdown-menu",
        DROPDOWN_MENU_TITLE: "px-nav-dropdown-menu-title",
        DROPDOWN_MENU_SHOW: "px-nav-dropdown-menu-show",
        DROPDOWN_MENU_WRAPPER: "px-nav-dropdown-menu-wrapper",
        DROPDOWN_MENU_TOP: "px-nav-dropdown-menu-top",
        OPEN: "px-open",
        SHOW: "px-show",
        FREEZE: "freeze",
        ACTIVE: "active",
        TRANSITIONING: "transitioning",
        PERFECT_SCROLLBAR_CONTAINER: "ps-container",
        NAVBAR_FIXED: "px-navbar-fixed"
    };

    var Scroll = {
        suppressScrollX: true,
        wheelPropagation: false,
        swipePropagation: false
    };

    var Event = {
        CLICK_DATA_API: "click.px.nav.data-api",
        RESIZE: "resize.px.nav",
        CLICK: "click.px.nav",
        MOUSEENTER: "mouseenter.px.nav",
        MOUSELEAVE: "mouseleave.px.nav",
        SCROLL: "scroll.px.nav",
        INITIALIZED: "initialized",
        EXPAND: "expand.px.nav",
        EXPANDED: "expanded.px.nav",
        COLLAPSE: "collapse.px.nav",
        COLLAPSED: "collapsed.px.nav",
        DESTROY: "destroy.px.nav",
        DROPDOWN_OPEN: "dropdown-open.px.nav",
        DROPDOWN_OPENED: "dropdown-opened.px.nav",
        DROPDOWN_CLOSE: "dropdown-close.px.nav",
        DROPDOWN_CLOSED: "dropdown-closed.px.nav",
        DROPDOWN_FROZEN: "dropdown-frozen.px.nav",
        DROPDOWN_UNFROZEN: "dropdown-unfrozen.px.nav"
    };

    var PxNav = function (element, options) {
        this.uniqueId = pxUtil.generateUniqueId();
        this.element = element;
        this.content = $(element).find(Selector.CONTENT)[0];
        this.config = this._getConfig(options);
        this._curMode = this._getMode();
        this._isCollapsed = this._getNavState();
        this._stateChanging = 0;
        this._setupMarkup();
        this.dimmer = $(element).parent().find("> ." + ClassName.DIMMER)[0];
        this._setListeners();
        this._restoreNavState();
        this._detectActiveItem();
        this._enableAnimation();
        this._checkNavbarPosition();
        this._triggerEvent("INITIALIZED", element);
    }

    PxNav.prototype.toggle = function () {
        this["desktop" !== this._curMode && pxUtil.hasClass(this.element, ClassName.EXPAND) || "desktop" === this._curMode && !pxUtil.hasClass(this.element, ClassName.COLLAPSE) ? "collapse" : "expand"]()
    }

    PxNav.prototype.expand = function () {
        ("phone" === this._curMode || this.isCollapsed()) && ("phone" === this._curMode && pxUtil.hasClass(this.element, ClassName.EXPAND) || this._triggerPreventableEvent("EXPAND", this.element) && ("phone" !== this._curMode && this.closeAllDropdowns(),
            this.config.enableTooltips && this._clearTooltips(),
            this._changeNavState(function () {
                var n = this;
                if ("desktop" !== this._curMode) {
                    var i = this;
                    $(this.element).parent().find("> ." + ClassName.EXPAND).each(function () {
                        this !== i.element && $(this)[t]("collapse")
                    }),
                        $(this.dimmer).on(Event.CLICK, function () {
                            return n.collapse()
                        }),
                        pxUtil.addClass(this.element, ClassName.EXPAND)
                } else
                    pxUtil.removeClass(this.element, ClassName.COLLAPSE);
                this._triggerEvent("EXPANDED", this.element)
            })))
    }

    PxNav.prototype.collapse = function () {
        this.isCollapsed() || this._triggerPreventableEvent("COLLAPSE", this.element) && this._changeNavState(function () {
            "desktop" !== this._curMode ? ($(this.dimmer).off("click"),
                pxUtil.removeClass(this.element, ClassName.EXPAND)) : pxUtil.addClass(this.element, ClassName.COLLAPSE),
                $(window).trigger("scroll"),
                this._triggerEvent("COLLAPSED", this.element)
        })
    }

    PxNav.prototype.isFixed = function () {
        return pxUtil.hasClass(this.element, ClassName.FIXED)
    }

    PxNav.prototype.isStatic = function () {
        return pxUtil.hasClass(this.element, ClassName.STATIC)
    }

    PxNav.prototype.isCollapsed = function () {
        return this._isCollapsed
    }

    PxNav.prototype.activateItem = function (t) {
        var n = this._getNode(t, ClassName.ITEM);
        if (!pxUtil.hasClass(n, ClassName.DROPDOWN) && ($(this.element).find("." + ClassName.ITEM + "." + ClassName.ACTIVE).removeClass(ClassName.ACTIVE),
            pxUtil.addClass(n, ClassName.ACTIVE),
            !pxUtil.hasClass(n.parentNode, ClassName.CONTENT)))
            if (pxUtil.hasClass(n.parentNode, ClassName.DROPDOWN_MENU_WRAPPER)) {
                var i = $(n).parents("." + ClassName.DROPDOWN_MENU).data("dropdown");
                if (!i)
                    return;
                i.addClass(ClassName.ACTIVE)
            } else {
                var a = $(n).parents("." + ClassName.DROPDOWN)[0]
                    , r = void 0;
                for (this.openDropdown(a, !1); a;)
                    if (pxUtil.addClass(a, ClassName.ACTIVE),
                        pxUtil.hasClass(a.parentNode, ClassName.DROPDOWN_MENU_WRAPPER)) {
                        if (r = $(a).parents("." + ClassName.DROPDOWN_MENU).data("dropdown"),
                            a = null,
                            !r)
                            return;
                        pxUtil.addClass(r, ClassName.ACTIVE)
                    } else
                        r = a,
                            a = $(a).parents("." + ClassName.DROPDOWN)[0];
                this.isCollapsed() && ($(this.content).find(Selector.OPENED_DROPDOWNS).removeClass(ClassName.OPEN),
                    pxUtil.addClass(r, ClassName.OPEN))
            }
    }

    PxNav.prototype.openDropdown = function (t) {
        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
            , i = this._getNode(t);
        if ((!this.isStatic() || this._isFloatingDropdown(i)) && (this._isFloatingDropdown(i) && !n || this.isDropdownOpened(i) || this._triggerPreventableEvent("DROPDOWN_OPEN", i))) {
            for (var s = this.isDropdownOpened(i) ? [] : [i], a = i; a = $(a).parents("." + ClassName.DROPDOWN)[0];)
                this.isDropdownOpened(a) || s.push(a);
            var r = s.pop();
            if (r) {
                for (var l = 0, d = s.length; l < d; l++)
                    this._expandDropdown(s[l], !1);
                if (this._isFloatingDropdown(r)) {
                    if (!n)
                        return;
                    this._showDropdown(r)
                } else
                    this._expandDropdown(r, !0)
            }
        }
    }

    PxNav.prototype.closeDropdown = function (e) {
        var t = this._getNode(e);
        this.isDropdownOpened(t) && (this.isStatic() && !this._isFloatingDropdown(t) || this._triggerPreventableEvent("DROPDOWN_CLOSE", t) && (this._isFloatingDropdown(t) ? this._hideDropdown(t) : this._collapseDropdown(t, !0)))
    }

    PxNav.prototype.toggleDropdown = function (e) {
        var t = this._getNode(e);
        this[this.isDropdownOpened(t) ? "closeDropdown" : "openDropdown"](t)
    }

    PxNav.prototype.closeAllDropdowns = function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : $(this.element).find("." + ClassName.CONTENT);
        this._closeAllDropdowns(this._getNode(t, null))
    }

    PxNav.prototype.freezeDropdown = function (e) {
        var t = this._getNode(e);
        this._isFloatingDropdown(t) && this.isDropdownOpened(t) && (pxUtil.hasClass(t, ClassName.FREEZE) || (pxUtil.addClass(t, ClassName.FREEZE),
            this._clearDropdownTimer(t),
            this._triggerEvent("DROPDOWN_FROZEN", t)))
    }

    PxNav.prototype.unfreezeDropdown = function (e) {
        var t = this._getNode(e);
        this._isFloatingDropdown(t) && this.isDropdownOpened(t) && pxUtil.hasClass(t, ClassName.FREEZE) && (pxUtil.removeClass(t, ClassName.FREEZE),
            this._triggerEvent("DROPDOWN_UNFROZEN", t))
    }

    PxNav.prototype.getDropdownContainer = function (t) {
        var n = this._getNode(t);
        return this._isFloatingDropdown(n) && this.isDropdownOpened(n) ? $($(n).data("dropdown")).find("." + ClassName.DROPDOWN_MENU_WRAPPER) : $(n).find(Selector.DROPDOWN_MENU)
    }

    PxNav.prototype.isFloatingDropdown = function (e) {
        return this._isFloatingDropdown(this._getNode(e))
    }

    PxNav.prototype.isDropdownOpened = function (e) {
        var t = this._getNode(e)
            , n = this._isRootDropdown(t)
            , i = this.isCollapsed();
        return i && n && pxUtil.hasClass(t, ClassName.SHOW) || i && !n && pxUtil.hasClass(t, ClassName.OPEN) || !i && pxUtil.hasClass(t, ClassName.OPEN)
    }

    PxNav.prototype.isDropdownFrozen = function (e) {
        return pxUtil.hasClass(this._getNode(e), ClassName.FREEZE)
    }

    PxNav.prototype.append = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        return this.insert(e, null, t)
    }

    PxNav.prototype.prepend = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        return this.insert(e, 0, t)
    }

    PxNav.prototype.insert = function (t, n) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
            , a = this._getNodeOrCreate(t, ClassName.ITEM, !1);
        if (a.hasClass(ClassName.DROPDOWN) && !a.find(Selector.DROPDOWN_MENU).length)
            throw new Error("The ." + ClassName.DROPDOWN + " item(s) must contain the child ." + ClassName.DROPDOWN_MENU + " element.");
        var r = null === i ? $(this.content) : this._getNode(i, ClassName.DROPDOWN, !1)
            , l = void 0;
        if (r.hasClass(ClassName.CONTENT))
            l = r;
        else if (!(l = this._isFloatingDropdown(r[0]) && this.isDropdownOpened(r[0]) ? $(r.data("dropdown")).find("." + ClassName.DROPDOWN_MENU_WRAPPER) : r.find(Selector.DROPDOWN_MENU)).length)
            throw new Error("Targeted element is not found.");
        var d = l.find(Selector.ITEM);
        if (d.length)
            if (null === n)
                a.insertAfter(d.last());
            else {
                var p = d.eq(n);
                p.length ? a.insertBefore(p) : a.insertAfter(d.last())
            }
        else
            l.append(a);
        return !this.isCollapsed() || r.hasClass(ClassName.CONTENT) ? this._updateScrollbar(this.content) : l.hasClass(ClassName.DROPDOWN_MENU_WRAPPER) ? this._updateScrollbar(l[0]) : this._updateScrollbar(l.parents("." + ClassName.DROPDOWN_MENU_WRAPPER)[0]),
            a
    }

    PxNav.prototype.remove = function (t) {
        var n = this._getNode(t, ClassName.ITEM, !1)
            , i = n.parent();
        n.hasClass(ClassName.DROPDOWN) && $(n.data("dropdown")).remove(),
            n.remove(),
            !this.isCollapsed() || i.hasClass(ClassName.CONTENT) ? this._updateScrollbar(this.content) : i.hasClass(ClassName.DROPDOWN_MENU_WRAPPER) ? this._updateScrollbar(i[0]) : this._updateScrollbar(i.parents("." + ClassName.DROPDOWN_MENU_WRAPPER)[0])
    }

    PxNav.prototype.destroy = function () {
        if (this._triggerPreventableEvent("DESTROY", this.element)) {
            this._unsetListeners(),
                $(this.element).removeData("px.nav"),
                pxUtil.removeClass(this.element, ClassName.ANIMATE),
                pxUtil.removeClass(this.element, ClassName.TRANSITIONING),
                pxUtil.removeClass(this.element, ClassName.EXPAND),
                this.isCollapsed() && this.closeAllDropdowns();
            var t = 0;
            $(this.element.parentNode).find("> ." + ClassName.NAV).each(function () {
                $(this).data("px.nav") && t++
            }),
                t || $(this.dimmer).remove(),
                $(this.element).find("." + ClassName.CONTENT).perfectScrollbar("destroy"),
                $(this.content).unwrap(Selector.SCROLLABLE_AREA)
        }
    }

    // Private
    PxNav.prototype._getNode = function (t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ClassName.DROPDOWN
            , i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
            , s = "string" == typeof t ? $(this.element).find(t) : $(t);
        if (!s.length)
            throw new Error("Element is not found.");
        if (n && !s.hasClass(n))
            throw new Error("Element(s) must have the ." + n + " class.");
        return i ? s[0] : s
    }

    PxNav.prototype._getNodeOrCreate = function (t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o.DROPDOWN
            , i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        return this._getNode("string" != typeof t || "#" !== t[0] && "." !== t[0] ? $(t) : t, n, i)
    }

    PxNav.prototype._expandDropdown = function (t) {
        function n() {
            a.removeClass(ClassName.TRANSITIONING).height(""),
                this._updateScrollbar(this.isCollapsed() ? $(t).parents("." + ClassName.DROPDOWN_MENU_WRAPPER)[0] : this.content),
                this._triggerEvent("DROPDOWN_OPENED", t)
        }
        var i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        if (!pxUtil.hasClass(t, ClassName.OPEN)) {
            var a = $(t).find(Selector.DROPDOWN_MENU);
            if (this.config.accordion && this._closeAllDropdowns(t.parentNode, i, $(t)),
                pxUtil.addClass(t, ClassName.OPEN),
                !$.support.transition || !i)
                return n.call(this);
            a.height(0).addClass(ClassName.TRANSITIONING).one("bsTransitionEnd", $.proxy(n, this)).emulateTransitionEnd(this.config.transitionDuration).height(a[0].scrollHeight)
        }
    }

    PxNav.prototype._collapseDropdown = function (t) {
        function n() {
            pxUtil.removeClass(t, ClassName.OPEN),
                a.removeClass(ClassName.TRANSITIONING).height(""),
                $(t).find("." + ClassName.OPEN).removeClass(ClassName.OPEN),
                this._updateScrollbar(this.isCollapsed() ? $(t).parents("." + ClassName.DROPDOWN_MENU_WRAPPER)[0] : this.content),
                this._triggerEvent("DROPDOWN_CLOSED", t)
        }
        var i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        if (pxUtil.hasClass(t, ClassName.OPEN)) {
            var a = $(t).find(Selector.DROPDOWN_MENU);
            if (!$.support.transition || !i)
                return n.call(this);
            a.height(a.height())[0].offsetHeight,
                a.addClass(ClassName.TRANSITIONING).height(0).one("bsTransitionEnd", $.proxy(n, this)).emulateTransitionEnd(this.config.transitionDuration)
        }
    }

    PxNav.prototype._showDropdown = function (t) {
        var n = this;
        if (!pxUtil.hasClass(t, ClassName.SHOW) && this._isRootDropdown(t)) {
            var i = t.parentNode.parentNode
                , a = $(t).find(Selector.DROPDOWN_MENU)[0];
            if (a) {
                this.closeAllDropdowns();
                var l = t.parentNode.offsetTop
                    , d = t.offsetTop - t.parentNode.scrollTop
                    , p = $('<div class="' + ClassName.DROPDOWN_MENU_TITLE + '"></div>').html($(t).find(Selector.ITEM_LABEL).html()).prependTo(a);
                pxUtil.addClass(t, ClassName.SHOW),
                    pxUtil.addClass(a, ClassName.SHOW),
                    i.appendChild(a);
                var h = $(t).outerHeight()
                    , u = $(a).find(Selector.ITEM)
                    , c = u.first().find("> a").outerHeight()
                    , v = $(this.element).outerHeight() - l
                    , f = p.outerHeight()
                    , N = f + 3 * c
                    , E = $('<div class="' + ClassName.DROPDOWN_MENU_WRAPPER + '"></div>').append(u).appendTo(a)[0]
                    , D = void 0;
                d + N > v ? (D = d,
                    this.isFixed() || "tablet" === this._curMode ? a.style.bottom = v - d - h + "px" : a.style.bottom = "0px",
                    pxUtil.addClass(a, ClassName.DROPDOWN_MENU_TOP),
                    a.appendChild(p[0])) : (D = v - d - f,
                        a.style.top = l + d + "px",
                        a.insertBefore(p[0], a.firstChild)),
                    E.style.maxHeight = D - 10 + "px",
                    $(E).perfectScrollbar(Scroll),
                    $(a).on(Event.MOUSEENTER, function () {
                        return n._clearDropdownTimer(t)
                    }).on(Event.MOUSELEAVE, function () {
                        return n._setDropdownTimer(t)
                    }),
                    $(t).data("dropdown", a),
                    $(a).data("element", t),
                    this._updateScrollbar(t.parentNode),
                    this._triggerEvent("DROPDOWN_OPENED", t)
            }
        }
    }

    PxNav.prototype._hideDropdown = function (t) {
        if (pxUtil.hasClass(t, ClassName.SHOW)) {
            var n = $(t).data("dropdown");
            if (n) {
                pxUtil.removeClass(t, [ClassName.SHOW, ClassName.FREEZE]),
                    pxUtil.removeClass(n, ClassName.SHOW),
                    pxUtil.removeClass(n, ClassName.DROPDOWN_MENU_TOP),
                    this.unfreezeDropdown(t);
                var i = $(n).find("." + ClassName.DROPDOWN_MENU_WRAPPER);
                $(n).find("." + ClassName.DROPDOWN_MENU_TITLE).remove(),
                    $(n).append(i.find(Selector.ITEM)),
                    i.perfectScrollbar("destroy").remove(),
                    n.setAttribute("style", ""),
                    t.appendChild(n),
                    $(t).data("dropdown", null),
                    $(n).data("element", null),
                    this._clearDropdownTimer(t),
                    $(n).off("mouseenter").off("mouseleave"),
                    this._updateScrollbar(t.parentNode),
                    this._triggerEvent("DROPDOWN_CLOSED", t)
            }
        }
    }

    PxNav.prototype._showTooltip = function (t) {
        this._clearTooltips();
        var n = $(t).find(".px-nav-label").contents().filter(function () {
            return 3 === this.nodeType
        }).text()
            , i = $('<div class="' + ClassName.TOOLTIP + '"></div>').text(n)[0]
            , s = t.parentNode.offsetTop
            , a = t.offsetTop - t.parentNode.scrollTop;
        i.style.top = s + a + "px",
            $(i).data("dropdown", t),
            t.parentNode.parentNode.appendChild(i)
    }

    PxNav.prototype._updateTooltipPosition = function () {
        var t = $(this.element).find("." + ClassName.TOOLTIP)[0];
        if (t) {
            var n = $(t).data("dropdown");
            if (n) {
                var i = n.parentNode.offsetTop
                    , s = n.offsetTop - n.parentNode.scrollTop;
                t.style.top = i + s + "px"
            } else
                $(t).remove()
        }
    }

    PxNav.prototype._clearTooltips = function () {
        $(this.element).find("." + ClassName.TOOLTIP).remove()
    }

    PxNav.prototype._closeAllDropdowns = function (t, n) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
            , a = this
            , r = void 0
            , l = void 0
            , d = t;
        this.isCollapsed() && pxUtil.hasClass(d, ClassName.CONTENT) ? (r = Selector.SHOWN_DROPDOWNS,
            l = "_hideDropdown") : (this._isFloatingDropdown(d) && this.isDropdownOpened(d) ? d = $($(d).data("dropdown")).find("." + ClassName.DROPDOWN_MENU_WRAPPER)[0] : pxUtil.hasClass(d, ClassName.DROPDOWN) && (d = $(d).find(Selector.DROPDOWN_MENU)[0]),
                r = Selector.OPENED_DROPDOWNS,
                l = "_collapseDropdown"),
            $(d).find(r).each(function () {
                i && i === $(this) || a[l](this, n)
            })
    }

    PxNav.prototype._isRootDropdown = function (e) {
        return pxUtil.hasClass(e.parentNode, ClassName.CONTENT)
    }

    PxNav.prototype._isFloatingDropdown = function (e) {
        return this.isCollapsed() && this._isRootDropdown(e)
    }

    PxNav.prototype._setDropdownTimer = function (t) {
        var n = this;
        if (!this.isDropdownFrozen(t)) {
            this._clearDropdownTimer(t);
            var i = setTimeout(function () {
                n.isDropdownFrozen(t) || n._hideDropdown(t)
            }, this.config.dropdownCloseDelay);
            $(t).data("timer", i)
        }
    }

    PxNav.prototype._clearDropdownTimer = function (t) {
        var n = $(t).data("timer");
        n && clearTimeout(n)
    }

    PxNav.prototype._updateScrollbar = function (t) {
        t && pxUtil.hasClass(t, ClassName.PERFECT_SCROLLBAR_CONTAINER) && $(t).perfectScrollbar("update")
    }

    PxNav.prototype._changeNavState = function (t) {
        function n() {
            this._stateChanging = this._stateChanging < 2 ? 0 : this._stateChanging - 1,
                this._stateChanging || pxUtil.removeClass(this.element, ClassName.NAV_TRANSITIONING),
                this._updateScrollbar(this.content),
                pxUtil.triggerResizeEvent()
        }
        if (this._stateChanging++ ,
            this.config.animate && $.support.transition && pxUtil.addClass(this.element, ClassName.NAV_TRANSITIONING),
            t.call(this),
            this._isCollapsed = this._getNavState(),
            this._storeNavState(),
            !this.config.animate || !$.support.transition)
            return n.call(this);
        $(this.element).one("bsTransitionEnd", $.proxy(n, this)).emulateTransitionEnd(this.config.transitionDuration)
    }

    PxNav.prototype._prefixStorageKey = function (e) {
        return this.config.storagePrefix + (pxUtil.hasClass(this.element, ClassName.NAV_LEFT) ? "left." : "right.") + e
    }

    PxNav.prototype._storeNavState = function () {
        if (this.config.storeState) {
            var e = this._prefixStorageKey("state")
                , t = pxUtil.hasClass(this.element, ClassName.COLLAPSE) ? "collapsed" : "expanded";
            window.PixelAdmin.storage.set(e, t)
        }
    }

    PxNav.prototype._checkNavbarPosition = function () {
        if (this.isFixed()) {
            var t = $(this.element).find(Selector.NEAR_NAVBAR)[0];
            t && (pxUtil.hasClass(t.parentNode, ClassName.NAVBAR_FIXED) || (console.warn("The " + (pxUtil.hasClass(this.element, ClassName.NAV_LEFT) ? "left" : "right") + " .px-nav is fixed, but the coterminous .px-navbar isn't. You need to explicitly add the ." + ClassName.NAVBAR_FIXED + " class to the parent element to fix the navbar."),
                pxUtil.addClass(t.parentNode, ClassName.NAVBAR_FIXED)))
        }
    }

    PxNav.prototype._unsetListeners = function () {
        $(window).off(Event.RESIZE + "." + this.uniqueId),
            $(this.element).off(".px.nav"),
            $(this.content).off(".px.nav").find("." + ClassName.DROPDOWN_MENU).off(".px.nav"),
            "desktop" !== this._curMode && pxUtil.hasClass(this.element, ClassName.EXPAND) && $(this.dimmer).off(".px.nav")
    }

    PxNav.prototype._triggerEvent = function (t, n) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        $(this.element).trigger($.Event(Event[t], {
            target: n
        }), [i])
    }

    PxNav.prototype._triggerPreventableEvent = function (t, n) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
            , o = $.Event(Event[t], {
                target: n
            });
        return $(this.element).trigger(o, [i]),
            !o.isDefaultPrevented()
    }

    PxNav.prototype._getConfig = function (options) {
        return $.extend({}, Default, $(this.element).data(), options);
    }

    PxNav.prototype._getMode = function () {
        var e = window.PixelAdmin.getScreenSize()
            , t = undefined;
        if (-1 !== this.config.modes.phone.indexOf(e))
            t = "phone";
        else if (-1 !== this.config.modes.tablet.indexOf(e))
            t = "tablet";
        else {
            if (-1 === this.config.modes.desktop.indexOf(e))
                throw new Error("Cannot determine PxNav mode.");
            t = "desktop"
        }
        return t
    }

    PxNav.prototype._getNavState = function () {
        return ("phone" === this._curMode || "tablet" === this._curMode) && !pxUtil.hasClass(this.element, ClassName.EXPAND) || "desktop" === this._curMode && pxUtil.hasClass(this.element, ClassName.COLLAPSE)
    }

    PxNav.prototype._setupMarkup = function () {
        var t = $(this.element).parent();
        if (t.find("> ." + ClassName.DIMMER).length || t.append('<div class="' + ClassName.DIMMER + '"></div>'),
            !$.fn.perfectScrollbar)
            throw new Error('Scrolling feature requires the "perfect-scrollbar" plugin included.');
        var n = $(this.content);
        n.length && n.wrap('<div class="' + ClassName.SCROLLABLE_AREA + '"></div>').perfectScrollbar(Scroll)
    }

    PxNav.prototype._setListeners = function () {
        var t = this, n = this;
        $(window).on(Event.RESIZE + "." + this.uniqueId, function () {
            n._curMode = n._getMode(),
                n._isCollapsed = n._getNavState(),
                n.isCollapsed() && n.closeAllDropdowns(),
                n.config.enableTooltips && n._clearTooltips(),
                n._updateScrollbar(n.content)
        });
        $(this.element).on(Event.CLICK, Selector.DROPDOWN_LINK, function (e) {
            e.preventDefault();
            var t = this.parentNode;
            n._isFloatingDropdown(t) ? n.isDropdownOpened(t) ? n[n.isDropdownFrozen(t) ? "closeDropdown" : "freezeDropdown"](t) : (n.openDropdown(t),
                n.freezeDropdown(t)) : n.toggleDropdown(t)
        }).on('click', Selector.ITEM_LINK, function (e) {
            e.preventDefault();
            
            var $this = $(this), li = $this.parent();
            
            var pxTab = $('body > .px-content').data('px.tab');
            console.log(pxTab)
            pxTab.add({ id: li.data('id'), name: 'µ¼º½', url: 'http://localhost:39174/Product/Story?productId=216', closed: true });
            //var li = $(this.parentNode);
            //var tab = JSON.parse(li.data('tab'));

            //console.log(typeof tab)
        });

        $(this.content).on(Event.MOUSEENTER, Selector.DROPDOWN_LINK, function () {
            if (!window.PixelAdmin.isMobile) {
                var t = this.parentNode;
                if (n._isFloatingDropdown(t) && !pxUtil.hasClass(n.element, ClassName.OFF_CANVAS))
                    if (n.isDropdownOpened(t))
                        n._clearDropdownTimer(t);
                    else {
                        if ($(n.element).find(Selector.FROZEN_DROPDOWNS).length)
                            return;
                        n.openDropdown(t)
                    }
            }
        }).on(Event.MOUSELEAVE, Selector.DROPDOWN_LINK, function () {
            if (!window.PixelAdmin.isMobile) {
                var e = this.parentNode;
                n._isFloatingDropdown(e) && n.isDropdownOpened(e) && n._setDropdownTimer(e)
            }
        }).on(Event.MOUSEENTER, Selector.ROOT_LINK, function () {
            window.PixelAdmin.isMobile || n.config.enableTooltips && n.isCollapsed() && !pxUtil.hasClass(n.element, ClassName.OFF_CANVAS) && n._showTooltip(this.parentNode)
        }).on(Event.MOUSELEAVE, Selector.ROOT_LINK, function () {
            window.PixelAdmin.isMobile || n.config.enableTooltips && n._clearTooltips()
        }).on(Event.SCROLL, function () {
            t.isCollapsed() && (t.config.enableTooltips && t._updateTooltipPosition(),
                t.closeAllDropdowns())
        })
    }

    PxNav.prototype._restoreNavState = function () {
        if (this.config.storeState) {
            var e = this._prefixStorageKey("state")
                , t = window.PixelAdmin.storage.get(e) || "expanded";
            pxUtil["collapsed" === t ? "addClass" : "removeClass"](this.element, ClassName.COLLAPSE),
                this._isCollapsed = this._getNavState(),
                pxUtil.triggerResizeEvent()
        }
    }

    PxNav.prototype._detectActiveItem = function () {
        var t = $(this.content).find("." + ClassName.ITEM + "." + ClassName.ACTIVE + ":not(." + ClassName.DROPDOWN + ")");
        t.length && this.activateItem(t.first())
    }

    PxNav.prototype._enableAnimation = function () {
        var e = this;
        this.config.animate && (pxUtil.addClass(this.element, ["off", ClassName.ANIMATE]),
            setTimeout(function () {
                pxUtil.removeClass(e.element, "off")
            }, this.config.transitionDuration))
    }

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data(DataKey)
            var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data(DataKey, (data = new PxNav(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.pxNav;
    $.fn.pxNav = Plugin;
    $.fn.pxNav.Constructor = PxNav;
    $.fn.pxNav.noConflict = function () {
        $.fn.pxNav = old
        return this
    };

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (e) {
        e.preventDefault();
        var n = $($(this).data("target"));
        n.length || (n = $(this).parents("." + ClassName.NAV)),
            n.length && (n.data(DataKey) || Plugin.call(n, $(this).data()),
                Plugin.call(n, "toggle"))
    })

}(jQuery);