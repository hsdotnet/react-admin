function _defineProperty(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: true,
        configurable: true,
        writable: true
    }) : e[t] = i,
        e
}
var PixelAdmin = function ($) {
    "use strict";
    var t = {
        isRtl: "rtl" === document.documentElement.getAttribute("dir"),
        isMobile: /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
        isLocalStorageSupported: undefined !== window.Storage,
        options: {
            resizeDelay: 100,
            storageKeyPrefix: "px_s_",
            cookieKeyPrefix: "px_c_"
        },
        getScreenSize: function () {
            var width = $(window).width();
            if (width <= 554) { return 'xs'; }
            else if (width <= 768) { return 'sm'; }
            else if (width <= 992) { return 'md'; }
            else if (width <= 1200) { return 'lg'; }
            else return 'xl';
        },
        storage: {
            _prefix: function (e) {
                return "" + t.options.storageKeyPrefix + e
            },
            set: function (e, i) {
                var o = "string" == typeof e ? _defineProperty({}, e, i) : e
                    , n = Object.keys(o);
                try {
                    for (var r = 0, s = n.length; r < s; r++)
                        window.localStorage.setItem(this._prefix(n[r]), o[n[r]])
                } catch (o) {
                    t.cookies.set(e, i)
                }
            },
            get: function (i) {
                var o = $.isArray(i) ? i : [i]
                    , n = {};
                try {
                    for (var r = 0, s = o.length; r < s; r++)
                        n[o[r]] = window.localStorage.getItem(this._prefix(o[r]));
                    return e.isArray(i) ? n : n[i]
                } catch (e) {
                    return t.cookies.get(i)
                }
            }
        },
        cookies: {
            _prefix: function (e) {
                return "" + t.options.cookieKeyPrefix + e
            },
            set: function (e, t) {
                for (var i = "string" == typeof e ? _defineProperty({}, e, t) : e, o = Object.keys(i), n = void 0, r = void 0, s = 0, c = o.length; s < c; s++)
                    n = encodeURIComponent(this._prefix(o[s])),
                        r = encodeURIComponent(i[o[s]]),
                        document.cookie = n + "=" + r
            },
            get: function (t) {
                for (var i = ";" + document.cookie + ";", o = $.isArray(t) ? t : [t], n = {}, r = void 0, s = void 0, c = void 0, d = 0, a = o.length; d < a; d++)
                    r = pxUtil.escapeRegExp(encodeURIComponent(this._prefix(o[d]))),
                        s = new RegExp(";\\s*" + r + "\\s*=\\s*([^;]+)\\s*;"),
                        c = i.match(s),
                        n[o[d]] = c ? decodeURIComponent(c[1]) : null;
                return $.isArray(t) ? n : n[t]
            }
        },
        _layout: function () {
            var wh = $(window).height() - 90 - $('.px-footer').outerHeight();
            $('.px-tab-content').css({ height: wh });
        },
        _setDelayedResizeListener: function () {
            var w = $(window), o = null;
            w.on("resize", function (fn) {
                var id = null;
                return function () {
                    if (id) { clearTimeout(id); }
                    id = setTimeout(function () {
                        id = null;
                        fn();
                    }, t.options.resizeDelay)
                }
            }(function () {
                var e = t.getScreenSize();
                w.trigger("px.resize");
                t._layout();
                if (o !== e) {
                    w.trigger("px.screen." + e);
                }
                o = e
            }))
        }
    };

    t._setDelayedResizeListener();

    $(function () {
        if (t.isMobile && window.FastClick) {
            window.FastClick.attach(document.body);
        }

        if (t.isRtl) {
            $(window).on("px.resize.px-rtl-fix", function () {
                document.body.style.overflow = "hidden";
                document.body.offsetHeight;
                document.body.style.overflow = ""
            });
        }

        $(window).trigger("px.load");

        pxUtil.triggerResizeEvent()
    });

    return t;
}(jQuery);

window.PixelAdmin = PixelAdmin;