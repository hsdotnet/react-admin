+function ($) {
    'use strict';

    var options = {
        animationSpeed: 350,
        accordion: true,
        followLink: false
    };

    var selector = {
        dropdownMenu: '.px-nav-dropdown-menu',
        active: '.active',
        open: '.open',
        dropdown: '.px-nav-dropdown',
        trigger: '.px-nav-item > a',
        navToggle: '.px-nav-toggle',
        navCollapse: '.px-nav-collapse',
        navExpand: '.px-nav-expand',
        pxNav: '.px-nav'
    };

    var Tree = function (element, options) {
      this.element = element;
      this.options = options;
  
      //$(this.element).addClass(ClassName.tree);
  
      //$(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);
  
      this._setUpListeners();
    };


    Tree.prototype.navExpand=function (tree, parentLi) {
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
    };

    Tree.prototype.navCollapse= function (tree, parentLi) {
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
    
  
    // Private
    
    Tree.prototype._setUpListeners = function () {
      var that = this;
  

      
      $('body').on('click', selector.trigger, function () {
        var _this = $(this),
            dropdownMenu = _this.next(selector.dropdownMenu),
            parentLi = _this.parent(),
        isOpen = parentLi.hasClass(className.open);

        if (!parentLi.is(selector.dropdown)) {
            return;
        }

        if (isOpen) {
            that.navCollapse(dropdownMenu, parentLi);
        } else {
            that.navExpand(dropdownMenu, parentLi);
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


    };
  
    // Plugin Definition
    // =================
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this);
        var data  = $this.data(DataKey);
  
        if (!data) {
          var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
          $this.data(DataKey, new Tree($this, options));
        }
      });
    }
  
    var old = $.fn.tree;
  
    $.fn.tree             = Plugin;
    $.fn.tree.Constructor = Tree;
  
    // No Conflict Mode
    // ================
    $.fn.tree.noConflict = function () {
      $.fn.tree = old;
      return this;
    };
  
    // Tree Data API
    // =============
    $(window).on('load', function () {
      $(Selector.data).each(function () {
        Plugin.call($(this));
      });
    });
  
  }(jQuery);