layui.define(['transition'], function (exports) {
    var $ = layui.jquery,
        l = layui.device(),
        w = $(window),
        b = $('body'),
    m = {

    }, e = {
        navExpand: function (tree, parentLi) {
            if (options.accordion) {
                var openMenuLi = parentLi.siblings(selector.open);
                var openTree = openMenuLi.children(selector.dropdownMenu);
                e.navCollapse(openTree, openMenuLi);
            }

            var complete = function () {
                tree.removeClass(className.transitioning).height('auto');
            }

            parentLi.addClass(className.open);
            tree.addClass(className.transitioning).height(0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(options.animationSpeed).height(tree[0].scrollHeight);
        },
        navCollapse: function (tree, parentLi) {
            var complete = function () {
                parentLi.removeClass(className.open);
                tree.removeClass(className.transitioning).height('');
                tree.find(selector.open).removeClass(className.open);
            }

            if (tree && tree.length) {
                tree.height(tree.height())[0].offsetHeight;
                tree.addClass(className.transitioning).height(0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(options.animationSpeed);
            }
        }
    }, options = {
        animationSpeed: 350,
        accordion: true,
        followLink: false
    }, selector = {
        dropdownMenu: '.px-nav-dropdown-menu',
        active: '.active',
        open: '.open',
        dropdown: '.px-nav-dropdown',
        trigger: '.px-nav-item > a',
        navToggle: '.px-nav-toggle',
        navCollapse: '.px-nav-collapse',
        navExpand: '.px-nav-expand',
        pxNav: '.px-nav'
    }, className = {
        open: 'open',
        transitioning: 'px-nav-transitioning',
        pxNav: 'px-nav',
        navCollapse: 'px-nav-collapse',
        navExpand: 'px-nav-expand'
    };

    b.on('click', selector.trigger, function () {
        var _this = $(this),
            dropdownMenu = _this.next(selector.dropdownMenu),
            parentLi = _this.parent(),
        isOpen = parentLi.hasClass(className.open);

        if (!parentLi.is(selector.dropdown)) {
            return;
        }

        if (isOpen) {
            e.navCollapse(dropdownMenu, parentLi);
        } else {
            e.navExpand(dropdownMenu, parentLi);
        }
    }).on('click', selector.navToggle, function () {
        var pxNav = $(selector.pxNav);
        if (pxNav.attr('class') === className.pxNav) {
            var expand = w.width() > 992;
            if (expand) {
                pxNav.addClass(className.navCollapse);
            } else {
                pxNav.addClass(className.navExpand);
            }
        } else {
            if (pxNav.hasClass(className.navCollapse)) {
                pxNav.removeClass(className.navCollapse).addClass(className.navExpand);
            } else {
                pxNav.removeClass(className.navExpand).addClass(className.navCollapse);
            }
        }
    });

    exports('admin', m);
});