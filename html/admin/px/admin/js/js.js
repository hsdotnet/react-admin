function init() {
    "use strict";
    $.px.layout = {},
    $.px.nav = function (a) {
        var b = this, c = 500;
        $(document).off("click", a + " li.px-nav-item a").on("click", a + " li.px-nav-item a", function (a) {
            if ($('.px-nav').hasClass('px-nav-collapse')) {

            } else {
                var d = $(this), l = d.parent('li'), e = d.next();
                if (l.is('.px-nav-dropdown')) {
                    if (e.is(":visible")) {
                        e.slideUp(c), l.removeClass('px-open active');
                    } else {
                        var f = d.parents("ul").first(),
                            g = f.find("ul:visible").slideUp(c);
                        g.removeClass('px-open active');
                        e.slideDown(c, function () {
                            l.addClass("px-open active");
                        });
                    }
                } else {
                    //open tab
                }
                //e.is(".treeview-menu") && a.preventDefault()
            }
        });

        //$(document).off("mouseenter", a + "> li.px-nav-item a").on("mouseenter", a + ">li.px-nav-item a", function (a) {
        //    var d = $(this), l = d.parent('li'), e = d.next();
        //    l.addClass('px-show');
        //});


        $('button[data-toggle="px-nav"]').click(function () {
            var n = $('body > .px-nav');
            if (n.hasClass('px-nav-collapse')) {
                n.removeClass('px-nav-collapse');
            } else {
                n.addClass('px-nav-collapse');
            }
        });
    }
}


$.px = {}, $(function () {
    "use strict";
    $('#navbar-notifications,#navbar-messages').slimScroll({
        size: '3px'
    }), init(), $.px.nav('body > .px-nav');
});