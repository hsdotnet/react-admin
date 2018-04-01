var pxTree = {
    options: {
        animationSpeed: 350,
        accordion: true,
        followLink: false
    },
    selector: {
        dropdownMenu: '.px-nav-dropdown-menu',
        active: '.active',
        open: '.open',
        dropdown: '.px-nav-dropdown',
        trigger: '.px-nav-item > a',
        navToggle: '.px-nav-toggle',
        navCollapse: '.px-nav-collapse',
        navExpand: '.px-nav-expand',
        pxNav: '.px-nav'
    }, 
    className: {
        open: 'open',
        transitioning: 'px-nav-transitioning',
        pxNav: 'px-nav',
        navCollapse: 'px-nav-collapse',
        navExpand: 'px-nav-expand'
    },
    navExpand: function (tree, parentLi) {
        if (pxTree.options.accordion) {
            var openMenuLi = parentLi.siblings(pxTree.selector.open);
            var openTree = openMenuLi.children(pxTree.selector.dropdownMenu);
            pxTree.navCollapse(openTree, openMenuLi);
        }

        var complete = function () {
            tree.removeClass(pxTree.className.transitioning).height('auto');
        }

        parentLi.addClass(pxTree.className.open);
        tree.addClass(pxTree.className.transitioning).height(0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(pxTree.options.animationSpeed).height(tree[0].scrollHeight);
    },
    navCollapse: function (tree, parentLi) {
        var complete = function () {
            parentLi.removeClass(pxTree.className.open);
            tree.removeClass(pxTree.className.transitioning).height('');
            tree.find(pxTree.selector.open).removeClass(pxTree.className.open);
        }

        if (tree && tree.length) {
            tree.height(tree.height())[0].offsetHeight;
            tree.addClass(pxTree.className.transitioning).height(0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(pxTree.options.animationSpeed);
        }
    },
    init: function(){
        $('body').on('click', pxTree.selector.trigger, function () {
            var _this = $(this),
                dropdownMenu = _this.next(pxTree.selector.dropdownMenu),
                parentLi = _this.parent(),
            isOpen = parentLi.hasClass(pxTree.className.open);
    
            if (!parentLi.is(pxTree.selector.dropdown)) {
                return;
            }
    
            if (isOpen) {
                pxTree.navCollapse(dropdownMenu, parentLi);
            } else {
                pxTree.navExpand(dropdownMenu, parentLi);
            }
        }).on('click', pxTree.selector.navToggle, function () {
            var pxNav = $(pxTree.selector.pxNav);
            if (pxNav.attr('class') === pxTree.className.pxNav) {
                var expand = $(window).width() > 992;
                if (expand) {
                    pxNav.addClass(pxTree.className.navCollapse);
                } else {
                    pxNav.addClass(pxTree.className.navExpand);
                }
            } else {
                if (pxNav.hasClass(pxTree.className.navCollapse)) {
                    pxNav.removeClass(pxTree.className.navCollapse).addClass(pxTree.className.navExpand);
                } else {
                    pxNav.removeClass(pxTree.className.navExpand).addClass(pxTree.className.navCollapse);
                }
            }
        });
    }
};

var pxAdmin={
    init:function(){
        pxAdmin.layout();
        $(window).resize(function(){
            pxAdmin.layout();
        })
    },
    layout:function(){
        var w = $(window).height();
        $('#px-content').css({height:w-50});
    }
}

$(function(){
    pxAdmin.init();
    pxTree.init();
})