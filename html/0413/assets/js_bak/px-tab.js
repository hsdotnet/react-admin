+ function ($) {
    'use strict';

    var DataKey = 'px.tab';

    var Default = {
        TAB_PREFIX: 'pxTab',
        IFRAME_PREFIX: 'pxIframe',
        tabs: [],
        baseIcon: 'fa',
        defaultIcon: 'fa-desktop',
        closeIcon: 'fa-close'
    };

    var Selector = {
        TAB_NAV: '.px-tab-nav',
        TAB_LIST: '.px-tab-list',
        TAB_ITEM: '.px-tab-list>li',
        TAB_CONTENT: '.px-tab-content',
        ACTIVE: '>.active',
        TAB_CLOSE: '.px-tab-close-icon',
        SCROLL_LEFT: '.px-tab-scroll-left',
        SCROLL_RIGHT: '.px-tab-scroll-right'
    };

    var ClassName = {
        TAB_ICON: 'px-tab-icon',
        TAB_IFRAME: 'px-tab-iframe',
        ACTIVE: 'active'
    };

    var Event = {

    }

    var PxTab = function (element, options) {
        var that = this;
        that.element = $(element);
        that.options = options;
        that.activeTabId = options.defaultTab;

        var tabs = options.tabs || [], tabCount = tabs.length;
        $.each(tabs, function (index, tab) {
            that._renderTab(tab);

            if (that.activeTabId && that.activeTabId === tab.id) {
                that._activeTab(tab.id);
            }

            if (!that.activeTabId && index === tabCount - 1) {
                that._activeTab(tab.id);
            }
        });

        that._setListeners();
        that._toggleScroll();
    }

    PxTab.prototype.add = function (tab) {
        var that = this;

        that._renderTab(tab);

        that._activeTab(tab.id);

        that._toggleScroll();
    }

    // Private
    PxTab.prototype._renderTab = function (tab) {
        var that = this;
        var tabLi = $('#' + that.options.TAB_PREFIX + tab.id);

        if (!tabLi.length) {
            var title = tab.title || tab.name, icon = tab.icon || that.options.defaultIcon;

            var $li = '<li id="' + that.options.TAB_PREFIX + tab.id + '" data-id="' + tab.id + '"><a href="javascript:void(0);" title="' + title + '"><i class="' + ClassName.TAB_ICON + ' ' + that.options.baseIcon + ' ' + icon + '"></i><span>' + tab.name + '</span>';
            if (tab.closed) {
                $li += '<i class="px-tab-close-icon ' + that.options.baseIcon + ' ' + that.options.closeIcon + '" title="关闭"></i>';
            }
            $li += '</a></li>';

            var $iframe = '<iframe frameborder="0" border="0" id="' + that.options.IFRAME_PREFIX + tab.id + '" src="' + tab.url + '" class="' + ClassName.TAB_IFRAME + '"></iframe>';

            tabLi = $($li).appendTo($(Selector.TAB_LIST));
            //$(Selector.TAB_CONTENT).append($iframe);
        }

        return tabLi;
    };

    PxTab.prototype._toggleScroll = function () {
        var that = this, wrapperWidth = that.element.find('.px-tab-wrapper').width(), liWidth = 0, left = $('.px-tab-list').position().left;

        that.element.find(Selector.TAB_ITEM).each(function () {
            liWidth += $(this).width();
        });

        if (liWidth >= wrapperWidth) {
            that.element.find('.px-tab-scroll').show();
            that.element.find('.px-tab-wrapper').addClass('px-tab-wrapper-margin');


        } else {
            that.element.find('.px-tab-scroll').hide();
            that.element.find('.px-tab-wrapper').removeClass('px-tab-wrapper-margin');
        }

        that._setLeft();
    };

    PxTab.prototype._setLeft = function () {
        var that = this, wrapperWidth = that.element.find('.px-tab-wrapper').width(), liWidth = 0, left = $('.px-tab-list').position().left;

        that.element.find(Selector.TAB_ITEM).each(function () {
            liWidth += $(this).width();
        });



        if (liWidth >= wrapperWidth) {
            var t = wrapperWidth - liWidth;
            $('.px-tab-list').css({ left: t });
        } else {
            $('.px-tab-list').css({ left: 0 });
        }
    };

    PxTab.prototype._activeTab = function (tabId) {
        var that = this;

        $(Selector.TAB_LIST).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
        $(Selector.TAB_CONTENT).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        $('#' + that.options.TAB_PREFIX + tabId).addClass(ClassName.ACTIVE);
        $('#' + that.options.IFRAME_PREFIX + tabId).addClass(ClassName.ACTIVE);
    };

    PxTab.prototype._closeTab = function (tabId) {
        var that = this, tabLi = $('#' + that.options.TAB_PREFIX + tabId);

        if (tabLi.hasClass(ClassName.ACTIVE)) {
            var next = tabLi.next();
            if (next.length) {
                that._activeTab(next.data('id'));
            } else {
                var prev = tabLi.prev();
                if (prev.length) {
                    that._activeTab(prev.data('id'));
                }
            }
        }

        tabLi.remove();
        $('#' + that.options.IFRAME_PREFIX + tabId).remove();

        that._toggleScroll();
    };

    PxTab.prototype._setListeners = function () {
        var that = this;
        $(that.element).on('click', Selector.TAB_CLOSE, function (e) {
            var tabId = $(this).closest('li').data('id');
            that._closeTab(tabId);
            e.stopPropagation();
        }).on('click', Selector.TAB_ITEM, function (e) {
            var tabId = $(this).closest('li').data('id');
            that._activeTab(tabId);
            e.stopPropagation();
        }).on('click', Selector.SCROLL_LEFT, function (e) {
            that._setLeft('left');
            e.stopPropagation();
        }).on('click', Selector.SCROLL_RIGHT, function (e) {
            that._setLeft('right');
            e.stopPropagation();
        });
    }



    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data(DataKey)
            var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data(DataKey, (data = new PxTab(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.pxTab;
    $.fn.pxTab = Plugin;
    $.fn.pxTab.Constructor = PxTab;
    $.fn.pxTab.noConflict = function () {
        $.fn.pxTab = old
        return this
    };
}(jQuery);