var pxUtil = function () {
    "use strict";
    function e(e, t) {
        for (var n = "[object Array]" === Object.prototype.toString.call(e) ? e : e.split(" "), r = 0; r < n.length; r++)
            t(n[r], r)
    }
    var t = "classList" in document.documentElement
      , n = t ? function (e, t) {
          return e.classList.contains(t)
      }
    : function (e, t) {
        return new RegExp("(?:^|\\s)" + t + "(?:\\s|$)").test(e.className)
    }
      , r = t ? function (e, t) {
          return e.classList.add(t)
      }
    : function (e, t) {
        n(e, t) || (e.className += (e.className ? " " : "") + t)
    }
      , s = t ? function (e, t) {
          return e.classList.remove(t)
      }
    : function (e, t) {
        n(e, t) && (e.className = e.className.replace(new RegExp("(?:^" + t + "\\s+)|(?:^\\s*" + t + "\\s*$)|(?:\\s+" + t + "$)", "g"), "").replace(new RegExp("\\s+" + t + "\\s+", "g"), " "))
    }
      , a = t ? function (e, t) {
          return e.classList.toggle(t)
      }
    : function (e, t) {
        return (n(e, t) ? s : r)(e, t)
    }
    ;
    return {
        generateUniqueId: function () {
            var uniqueId = (Math.floor(25 * Math.random()) + 10).toString(36) + '_';
            uniqueId += (new Date()).getTime().toString(36) + '_';

            do {
                uniqueId += Math.floor(35 * Math.random()).toString(36);
            } while (uniqueId.length < 32)

            return uniqueId;
        },
        escapeRegExp: function (value) {
            return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        },
        hexToRgba: function (e, t) {
            var n = e.replace("#", "");
            return "rgba(" + parseInt(n.substring(0, 2), 16) + ", " + parseInt(n.substring(2, 4), 16) + ", " + parseInt(n.substring(4, 6), 16) + ", " + t + ")"
        },
        triggerResizeEvent: function () {
            var evt, name = 'resize';
            if (document.createEvent) {
                evt = document.createEvent('HTMLEvents');
                evt.initEvent(name, true, true);
                window.dispatchEvent(evt);
            } else {
                evt = document.createEventObject();
                evt.eventType = name;
                evt.eventName = name;
                window.fireEvent("on" + evt.eventType, evt)
            }
        },
        hasClass: function (e, t) {
            return n(e, t)
        },
        addClass: function (t, n) {
            e(n, function (e) {
                return r(t, e)
            })
        },
        removeClass: function (t, n) {
            e(n, function (e) {
                return s(t, e)
            })
        },
        toggleClass: function (t, n) {
            e(n, function (e) {
                return a(t, e)
            })
        }
    }
}();


/*
var pxUtil = function () {
    "use strict";

    return {
        generateUniqueId: function () {
            var uniqueId = (Math.floor(25 * Math.random()) + 10).toString(36) + '_';
            uniqueId += (new Date()).getTime().toString(36) + '_';

            do {
                uniqueId += Math.floor(35 * Math.random()).toString(36);
            } while (uniqueId.length < 32)

            return uniqueId;
        },
        triggerEvent: function (element, event, target) {
            var param = {};
            if (arguments.length > 3 && arguments[3] !== undefined) {
                param = arguments[3];
            }
            element.trigger($.Event(event, { target: target }), [param]);
        }
    }
}();
*/