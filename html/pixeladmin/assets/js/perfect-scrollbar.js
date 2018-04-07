!function($) {
    "use strict";
    if (!$.fn.perfectScrollbar)
        throw new Error("perfect-scrollbar.jquery.js required.");
    var t = "rtl" === $("html").attr("dir")
      , e = $.fn.perfectScrollbar;
    $.fn.perfectScrollbar = function(i) {
        return this.each(function() {
            var a = this
              , c = $(this).attr("data-ps-id");
            e.call($(this), i),
            t && !c ? (c = $(this).attr("data-ps-id")) && $(window).on("resize.ps." + c, function() {
                return $(a).perfectScrollbar("update")
            }) : t && c && "destroy" === i && $(window).off("resize.ps." + c)
        })
    }
}(jQuery);
