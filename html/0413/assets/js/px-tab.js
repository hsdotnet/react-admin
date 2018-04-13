+ function ($) {
    'use strict';

    var DataKey = 'px.tab';

    var Default = {
        tabs: [],
        defaultIndex: -1
    };

    var TabDefault = {
        id: '',
        icon: 'fa-desktop',
        name: '',
        title: '',
        url: '',
        closed: true,
        reload: false
    };

    var Selector = {
    };

    var ClassName = {
    };

    var Event = {

    }

    var PxTab = function (element, options) {
        var that = this;
        that.element = element;
        that.currentIndex = -1;
        that.jqElement = $(element);

        if (options.tabs && options.tabs.length > 0) {
            $.each(options.tabs, function (index, tab) {
                that._renderTab(tab);
            });

            if (options.defaultIndex > 0) {
                that._switchTab(options.defaultIndex);
            } else {
                that._switchTab(that.currentIndex);
            }
        }

        that._setListeners();
    }

    PxTab.prototype.add = function (tab) {
        this._renderTab(tab);

        this._switchTab(this.currentIndex);
    }

    PxTab.prototype.closeCurrentTab = function () {
        if (this.currentIndex > 0) {
            this._closeTab(this.currentIndex);
        }
    };

    PxTab.prototype.closeOtherTab = function () {
        var that = this;
        this._getTabs().each(function (index) {
            if (that.currentIndex !== index) {
                $(this).remove();
            }
        });

        this._getTabIFrames().each(function (index) {
            if (that.currentIndex !== index) {
                $(this).remove();
            }
        });

        that._scrollCurrent();
        that._ctrlScrollBut();
    };

    PxTab.prototype.closeAllTab = function () {
        this._getTabs().remove();
        this._getTabIFrames().remove();
        this.currentIndex = -1;

        this._scrollCurrent();
        this._ctrlScrollBut();
    };

    PxTab.prototype.reloadCurrentTab = function () {
        this._getTabIFrames().eq(this.currentIndex)[0].contentWindow.location.reload(true);
    };

    // Private
    PxTab.prototype._getLeft = function () {
        return this.jqElement.find('.px-tab-list').position().left;
    };

    PxTab.prototype._getWrapperWidth = function () {
        return this.jqElement.find('.px-tab-wrapper').width();
    };

    PxTab.prototype._visibleStart = function () {
        var iLeft = this._getLeft(), iW = 0, tabs = this._getTabs(), index = 0;

        tabs.each(function (i) {
            if (iW + iLeft >= 0) {
                index = i;
                return false;
            }

            iW += $(this).outerWidth(true);
        });

        return index;
    };

    PxTab.prototype._visibleEnd = function () {
        var iLeft = this._getLeft(), iW = 0, wrapperWidth = this._getWrapperWidth(), tabs = this._getTabs(), index = tabs.length;
        console.log(wrapperWidth)
        tabs.each(function (i) {
            iW += $(this).outerWidth(true);
            if (pxUtil.formatFloat(iW + iLeft, 2) > wrapperWidth) {
                index = i;
                return false;
            }
        })

        return index;
    };

    PxTab.prototype._switchTab = function (index) {
        this._getTabs().removeClass("active").eq(index).addClass("active");
        this._getTabIFrames().removeClass("active").eq(index).addClass("active");

        this.currentIndex = index;

        this._ctrlScrollBut();

        this._scrollCurrent();
    };

    PxTab.prototype._scrollPrev = function () {
        var iStart = this._visibleStart();
        if (iStart > 0) {
            this._scrollTab(-this._getTabsW(0, iStart - 1));
        }
    };

    PxTab.prototype._scrollNext = function () {
        var iEnd = this._visibleEnd();
        console.log(iEnd)
        if (iEnd < this._getTabs().length) {
            this._scrollTab(-this._getTabsW(0, iEnd + 1) + this._getWrapperWidth());
        }
    };

    PxTab.prototype._scrollTab = function (iLeft, isNext) {
        var that = this;
        that.jqElement.find('.px-tab-list').animate({ left: iLeft + 'px' }, 200);
    };

    PxTab.prototype._getTabsW = function (iStart, iEnd) {
        return this._tabsW(this._getTabs().slice(iStart, iEnd));
    };

    PxTab.prototype._tabsW = function (tabs) {
        var iW = 0;

        tabs.each(function () {
            iW += $(this).outerWidth(true);
        });

        return iW;
    };

    PxTab.prototype._ctrlScrollBut = function () {
        var iW = this._tabsW(this._getTabs());
        if (this._getWrapperWidth() >= iW) {
            this.jqElement.find('.px-tab-scroll').hide();
            this.jqElement.find('.px-tab-wrapper').removeClass('px-tab-wrapper-margin');
        } else {
            this.jqElement.find('.px-tab-scroll').show();
            this.jqElement.find('.px-tab-wrapper').addClass('px-tab-wrapper-margin');
        }
    };

    PxTab.prototype._scrollCurrent = function () {
        var tabs = this._getTabs(), tabsWidth = this._tabsW(tabs), wrapperWidth = this._getWrapperWidth();
        if (tabsWidth <= wrapperWidth) {
            this._scrollTab(0);
        } else if (this._getLeft() < wrapperWidth - tabsWidth) {
            this._scrollTab(wrapperWidth - tabsWidth);
        } else if (this.currentIndex < this._visibleStart()) {
            this._scrollTab(-this._getTabsW(0, this.currentIndex));
        } else if (this.currentIndex >= this._visibleEnd()) {
            this._scrollTab(wrapperWidth - tabs.eq(this.currentIndex).outerWidth(true) - this._getTabsW(0, this.currentIndex));
        }
    };

    PxTab.prototype._getTabs = function () {
        return this.jqElement.find('.px-tab-list >li');
    };

    PxTab.prototype._getTabIFrames = function () {
        return this.jqElement.find('.px-tab-content >iframe');
    };

    PxTab.prototype._getTab = function (tabId) {
        var index = this._getTabIndex(tabId);

        if (index >= 0) {
            return this._getTabs().eq(index);
        }

        throw new Error('not found tab：【' + tabId + '】');
    };

    PxTab.prototype._getTabIndex = function (tabId) {
        if (!tabId) return -1;

        this._getTabs().each(function (index) {
            if ($(this).data('id') === tabId) {
                return index;
            }
        });

        return -1;
    };

    PxTab.prototype._closeTab = function (index) {
        var tabs = this._getTabs(), length = tabs.length;
        tabs.eq(index).remove();
        this._getTabIFrames().eq(index).remove();

        if (this.currentIndex === index) {
            if (index === length - 1) {
                this._switchTab(index - 1);
            } else {
                this._switchTab(index);
            }
        }
        else {
            this._ctrlScrollBut();

            this._scrollCurrent();
        }
    };

    PxTab.prototype._renderTab = function (options) {
        var index = this._getTabIndex(options.id);
        options = $.extend(TabDefault, options);

        if (index >= 0) {
            if (this.currentIndex != index) {
                this.currentIndex = index;

                this._switchTab(index);
            }

            if (options.reload) {
                this.reloadCurrentTab();
            }
        } else {
            options.title = options.title.length > 0 ? options.title : options.name;

            var li = '<li data-id="' + options.id + '"><a href="javascript:void(0);" title="' + options.title + '"><i class="px-tab-icon fa ' + options.icon + '"></i><span>' + options.name + '</span>';
            if (options.closed) {
                li += '<i class="px-tab-close-icon fa fa-close" title="关闭"></i>';
            }
            li += '</a></li>';
            this.jqElement.find('.px-tab-list').append(li);

            var iframe = '<iframe frameborder="0" border="0" data-id="' + options.id + '" src="' + options.url + '" class="px-tab-iframe"></iframe>';
            this.jqElement.find('.px-tab-content').append(iframe);

            this.currentIndex = this._getTabs().length - 1;
        }
    };

    PxTab.prototype._setListeners = function () {
        var that = this;
        that.jqElement.on('click', '.px-tab-close-icon', function (e) {
            var index = $(this).closest('li').index();
            that._closeTab(index);
            e.stopPropagation();
        }).on('click', '.px-tab-list>li', function (e) {
            var index = $(this).index();
            that._switchTab(index);
            e.stopPropagation();
        }).on('click', '.px-tab-scroll-left', function (e) {
            that._scrollPrev();
        }).on('click', '.px-tab-scroll-right', function (e) {
            that._scrollNext();
        }).on('click', '.px-tab-more a', function (e) {
            var type = $(this).data('type');
            switch (type) {
                case 'current': that.closeCurrentTab(); break;
                case 'other': that.closeOtherTab(); break;
                case 'all': that.closeAllTab(); break;
                case 'reload': that.reloadCurrentTab(); break;
            }
        });

        $(window).resize(function () {
            setTimeout(function () {
                that._ctrlScrollBut();

                that._scrollCurrent();
            }, 200);
        });
    }

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this), data = $this.data(DataKey), options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);

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