$.jgrid.styleUI.jqGridUI = {
    common: {
        disabled: "ui-disabled",
        highlight: "selected",
        hover: "active",
        cornerall: "",
        cornertop: "",
        cornerbottom: "",
        hidden: "",
        icon_base: "glyphicon",
        overlay: "ui-overlay",
        active: "active",
        error: "bg-danger",
        button: "btn btn-default",
        content: "",
        icon_base: 'fa'
    },
    base: {
        entrieBox: "",
        viewBox: "",
        headerTable: "",
        headerBox: "",
        rowTable: "",
        rowBox: "",
        stripedTable: "",
        footerTable: "",
        footerBox: "",
        headerDiv: "",
        gridtitleBox: "",
        customtoolbarBox: "",
        //overlayBox: "ui-overlay",
        loadingBox: "row",
        rownumBox: "active",
        scrollBox: "",
        multiBox: "checkbox",
        pagerBox: "",
        pagerTable: "",
        toppagerBox: "",
        pgInput: "",
        pgSelectBox: "",
        pgButtonBox: "",
        icon_first: "fa-step-backward",
        icon_prev: "fa-backward",
        icon_next: "fa-forward",
        icon_end: "fa-step-forward",
        icon_asc: "fa-caret-up",
        icon_desc: "fa-caret-down",
        icon_caption_open: "fa-caret-square-up",
        icon_caption_close: "fa-caret-square-down"
    },
    modal: {
        modal: "modal-content",
        header: "modal-header",
        title: "modal-title",
        content: "modal-body",
        resizable: "ui-resizable-handle ui-resizable-se",
        icon_close: "fa-window-close",
        icon_resizable: "fa-plus"
    },
    celledit: {
        inputClass: 'form-control'
    },
    inlinedit: {
        inputClass: 'form-control',
        icon_edit_nav: "fa-edit",
        icon_add_nav: "fa-plus",
        icon_save_nav: "fa-save",
        icon_cancel_nav: "fa-replay"
    },
    formedit: {
        inputClass: "form-control",
        icon_prev: "fa-chevron-left",
        icon_next: "fa-chevron-right",
        icon_save: "fa-save",
        icon_close: "fa-window-close",
        icon_del: "fa-trash",
        icon_cancel: "fa-times"
    },
    navigator: {
        icon_edit_nav: "fa-edit",
        icon_add_nav: "fa-plus",
        icon_del_nav: "fa-trash",
        icon_search_nav: "fa-search",
        icon_refresh_nav: "fa-sync",
        icon_view_nav: "fa-sticky-note",
        icon_newbutton_nav: "fa-external-link-alt"
    },
    grouping: {
        icon_plus: 'fa-caret-right',
        icon_minus: 'fa-caret-down'
    },
    filter: {
        table_widget: 'table table-condensed',
        srSelect: 'form-control',
        srInput: 'form-control',
        menu_widget: '',
        icon_search: 'fa-search',
        icon_reset: 'fa-reply',
        icon_query: 'fa-pen-square'
    },
    subgrid: {
        icon_plus: 'fa-arrow-circle-right',
        icon_minus: 'fa-arrow-circle-down',
        icon_open: 'fa-ellipsis-v'
    },
    treegrid: {
        icon_plus: 'fa-plus',
        icon_minus: 'fa-minus',
        icon_leaf: 'fa-circle'
    },
    fmatter: {
        icon_edit: "fa-edit",
        icon_add: "fa-plus",
        icon_save: "fa-save",
        icon_cancel: "fa-undo",
        icon_del: "fa-trash"
    },
    colmenu: {
        menu_widget: '',
        input_checkbox: "",
        filter_select: "form-control",
        filter_input: "form-control",
        icon_menu: "fa-ellipsis-v",
        icon_sort_asc: "fa-sort-amount-down",
        icon_sort_desc: "fa-sort-amount-up",
        icon_columns: "fa-columns",
        icon_filter: "fa-filter",
        icon_group: "fa-object-group",
        icon_freeze: "fa-snowflake",
        icon_move: "fa-expand-arrows-alt",
        icon_new_item: "fa-external-link-alt",
        icon_toolbar_menu: "fa-list"
    }
};
$.jgrid.regional['cn'].defaults.recordtext = '检索到 {2} 条记录，显示 第 {0} 条 - 第 {1} 条';
$.jgrid.defaults.pagerpos = 'left';
$.jgrid.defaults.recordpos = 'center';
$.jgrid.defaults.regional = 'cn';
$.jgrid.defaults.styleUI = 'jqGridUI';