var tab = (function () {
    var ele = {
        a: '#content',
        b: '.tab-title-nav',
        c: 'tab-title-nav-margin',
        d: '.tab-scroll',
        e: '.tab-close-icon',
        l: '.tab-scroll-left',
        r: '.tab-scroll-right',
        n: '.tab-content',
        o: 'active',
        t: 'px-tab-',
        i: 'px-iframe-'
    }, tabId = 1;

    function getVisibleStart() {
        var l = $(ele.a + ' ' + ele.b + '>ul').position().left, n = 0;
        if (l == 0) { return n; }
        $(ele.a + ' ' + ele.b + '>ul>li').each(function (i) {
            if ((l += $(this).width()) >= 0) {
                n = i;
                return false;
            }
        });
        return n;
    };

    function getVisibleEnd() {
        var w = $(ele.a + ' ' + ele.b).width(), l = $(ele.a + ' ' + ele.b + '>ul').position().left, m = 0, n = 0;
        $(ele.a + ' ' + ele.b + '>ul>li').each(function (i) {
            m += $(this).width();
            if (m + l > w) {
                n = i;
                return false;
            }
        });
        return n;
    };

    function getWidth(n) {
        var w = 0;
        $(ele.a + ' ' + ele.b + '>ul>li').each(function (i) {
            if (n >= i) {
                w += $(this).width();
            } else {
                return false;
            }
        });
        return w;
    };

    function init() {
        var n = $(ele.a + ' ' + ele.b).width(), l = 0;
        $(ele.a + ' ' + ele.b + '>ul>li').each(function () {
            l += $(this).width();
        });
        l < n ? ($(ele.a + ' ' + ele.d).hide(), $(ele.a + ' ' + ele.b).removeClass(ele.c), $(ele.a + ' ' + ele.b + '>ul').css({ left: 0 })) :
            ($(ele.a + ' ' + ele.d).show(), $(ele.a + ' ' + ele.b).addClass(ele.c));
    }

    function initEvent() {
        $(ele.a).on('click', ele.l, function (e) {
            var n = getVisibleStart(), w = getWidth(n - 1);
            $(ele.a + ' ' + ele.b + '>ul').animate({ left: -w }, 200);
        }).on('click', ele.r, function (e) {
            var a = $(ele.a + ' ' + ele.b).width(), n = getVisibleEnd(), w = getWidth(n);
            if (n === 0) { return; }
            $(ele.a + ' ' + ele.b + '>ul').animate({ left: a - w }, 200);
        }).on('click', ele.b + '>ul>li', function (e) {
            var _this = $(this);
            if (!_this.hasClass('active')) {
                $(ele.a + ' ' + ele.b + '>ul>li.' + ele.o + ',' + ele.a + ' ' + ele.n + '>iframe.' + ele.o).removeClass(ele.o);
                _this.addClass('active');
                $('#' + _this.data('iframeid')).addClass('active');
            }
        }).on('click', ele.e, function (e) {
            var t = $(this).closest('li');
            $('#' + t.attr('id') + ',#' + t.data('iframeid')).remove();
        });
    }

    return {
        init: function () {
            init(), initEvent(), $(window).resize(function () { setTimeout(function () { tab.init(); }, 200) });
        },
        /*
		**	新增tab
		*/
        addTab: function (options) {
            var defaults = {
                id: '',
                replace: false,
                icon: 'fa-desktop',
                name: '',
                title: '',
                url: '',
                closed: true
            };

            options = $.extend(defaults, options);
            if (options.title.length === 0) options.title = options.name;
            if (options.id.length === 0) { options.id = tabId.toString(); tabId++; }

            if (options.replace) {
                tab.closeTab(options.tabId);
            }

            $(ele.a + ' ' + ele.b + '>ul>li.' + ele.o + ',' + ele.a + ' ' + ele.n + '>iframe.' + ele.o).removeClass(ele.o);
            var t = $('#' + ele.t + options.id);
            if (t.length == 0) {
                var l = '<li class="active" id="' + ele.t + options.id + '" data-iframeid="' + ele.i + options.id + '"><a href="javascript:void(0);" title="' + options.title + '"><i class="tab-icon fa ' + options.icon + '"></i><span>' + options.name + '</span>';
                if (options.closed) {
                    l += '<i class="tab-close-icon fa fa-close" title="关闭"></i>';
                }
                l += '</a></li>';
                $(ele.a + ' ' + ele.b + '>ul').append(l);
                $(ele.a + ' ' + ele.n).append('<iframe frameborder="0" border="0" id="' + ele.i + options.id + '" src="' + options.url + '" class="active"></iframe>');
                init();
                //var a = $(ele.a + ' ' + ele.b).width(), n = $(ele.a + ' ' + ele.b + '>ul>li').length, w = getWidth(n);
                //$(ele.a + ' ' + ele.b + '>ul').animate({ left: a - w }, 200);
            } else {
                t.addClass('active');
                $('#' + ele.i + options.id).addClass('active');
            }
        },
        /*
		**	关闭tab
		*/
        closeTab: function (tabId) {
            var tabObj = $('#content > .tab-nav ul li[data-tabid="' + tabId + '"]'),
                tabCount = $('#content > .tab-nav ul.nav li').length;

            if (tabCount > 1 && tabObj.hasClass('active')) {
                tabIndex = tabObj.index(),
                openTabIndex = tabIndex == 0 ? 1 : --tabIndex,
                openTabId = $('#content > .tab-nav ul li:eq(' + openTabIndex + ')').data('tabid');

                $('#content > .tab-nav ul li[data-tabid="' + openTabId + '"],content >.tab-nav-content > iframe[data-iframeid="' + openTabId + '"]').addClass('active');
            }

            tabObj.remove();
            $('#content >.tab-nav-content > iframe[data-iframeid="' + tabId + '"]').remove();

            hs.tab.initTab(true);

            //if (!tabId) {
            //    //无tabId 默认关闭当前tab
            //    tabId = $('#content .tab-nav-wrap ul li.on').data('tab-id');
            //}
            //var tabObj = $('#tab_li_' + tabId), tabCount = hs.tab.getTabs().length,
            //    tabWidth = getTabWidth(tabObj);
            //if (tabObj.hasClass('on') && tabCount > 1) {
            //    var tabIndex = tabObj.index(),
            //        openTabIndex = tabIndex == 0 ? tabCount - 1 : --tabIndex,
            //        openTabId = $('#content .tab-nav-wrap ul li:eq(' + openTabIndex + ')').data('tab-id');
            //    hs.tab.openTab(openTabId);
            //}
            //tabObj.remove();
            //$('#tab_iframe_' + tabId).remove();

            //hs.tab.scrollTab(tabWidth);
        },
        /*
        ** 获取tab
        */
        getTabs: function () {
            return $('#content > .tab-nav ul.nav li');
        },
        /*
        ** 获取tab索引
        */
        getTabIndex: function (tabId) {
            var tabObj = $('#tab_li_' + tabId);
            return tabObj.index();
        },
        /*
		**	打开tab
		*/
        openTab: function (tabId) {
            var tabIndex = hs.tab.getTabIndex(tabId);
            $('#content .tab-nav-wrap ul li:eq(' + tabIndex + '),#content .tab-content iframe:eq(' + tabIndex + ')').addClass('on');
        },
        /*
		**	刷新当前tab
		*/
        refreshTab: function () {
            hs.base.currentIframe().location.reload();
        },
        /*
		**	关闭所有tab
		*/
        closeAllTab: function () {
            hs.tab.getTabs().remove();
            $('#content .tab-content iframe').remove();

            hs.tab.scrollTab();
        },
        /*
		**	关闭其他tab
		*/
        closeOtherTab: function () {
            var cTabId = hs.base.tabId();
            hs.tab.getTabs().each(function () {
                var tabId = $(this).data('tab-id');
                if (cTabId != tabId) {
                    hs.tab.closeTab(tabId);
                }
            });
        },
        scrollTab: function (tabWdith) {
            var tabsWidth = getTabsWidth(),
                tabWrapperWidth = getTabWrapperWidth(),
                tabWrapperLeft = getTabWrapperLeft(), left = 0;
            if (tabWrapperWidth < tabsWidth) {
                $('#content .tab-scroll').show();
                left = tabWrapperWidth - tabsWidth - 5;
                if (left > 0) left = 0;

                scrollTabAnimate(left);
            } else {
                if (tabWdith) {
                    if (tabWrapperLeft < 0) {
                        var left = tabWrapperLeft + tabWdith;
                        if (left > 0) left = 0;

                        scrollTabAnimate(left);
                    }
                } else {
                    if (tabWrapperLeft < 0) {
                        scrollTabAnimate(left);
                    }
                }
                $('#content .tab-scroll').hide();
            }
        }
    };
    function getTabWrapperLeft() {
        return $('#content > .tab-nav ul.nav').position().left;
    };
    function getTabWidth(obj) {
        return obj.outerWidth();
    };
    function getTabWrapperWidth() {
        return $('#content').width() - $('#content .tab-scroll').outerWidth() * 2;
    };
    function getTabsWidth() {
        return $('#content > .tab-nav ul.nav').width();
    };
    function scrollTabAnimate(left) {
        $('#content > .tab-nav ul.nav').animate({ left: left }, 200);
    };
    function scrollTabNoAnimate(left) {
        $('#content > .tab-nav ul.nav').css({ left: left });
    };
})();

$(function () {
    tab.init();

    var data = [{ name: 'A00001', url: 'about:blank' }, { name: 'A00002', url: 'about:blank' },
    { name: 'A00003', url: 'about:blank' }, { name: 'A00004', url: 'about:blank' },
    { name: 'A00005', url: 'about:blank' }, { name: 'A00006', url: 'about:blank' },
    { name: 'A00007', url: 'about:blank' }, { name: 'A00008', url: 'about:blank' },
    { name: 'A00009', url: 'about:blank' }, { name: 'A00010', url: 'about:blank' },
    { name: 'A00011', url: 'about:blank' }, { name: 'A00012', url: 'about:blank' }];

    $.each(data, function (i, option) {
        tab.addTab(option);
    });

    $('#addtab').click(function () {
        tab.addTab({ name: '测试', url: 'about:blank' });
    });
});