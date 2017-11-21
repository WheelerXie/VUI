(function ($, window, undefined) {
    var indicatorTypes = [{
        "name": "考核",
        "value": "考核"
    }, {
        "name": "监测",
        "value": "监测"
    }, {
        "name": "观测",
        "value": "观测"
    }];
    var frequencies = [{
        "name": "月",
        "value": "月"
    }, {
        "name": "季",
        "value": "季"
    }];

    var selectRenderers = {
        "departments": function (type) {
            var departments = [
                { "value": 1, "name": "市场企划部" },
                { "value": 2, "name": "客户经营部" },
                { "value": 3, "name": "行销推广部" },
                { "value": 4, "name": "多元营销中心" },
                { "value": 5, "name": "电子商务项目组" },
                { "value": 6, "name": "信用风险管理部" },
                { "value": 7, "name": "交易及资产风险管理部" },
                { "value": 8, "name": "掌上生活与作业部" },
                { "value": 9, "name": "客户服务部" },
                { "value": 10, "name": "信息技术部" },
                { "value": 11, "name": "办公室" },
                { "value": 12, "name": "客户体验管理部" },
                { "value": 13, "name": "人力资源部" },
                { "value": 14, "name": "策略发展部" },
                { "value": 15, "name": "监察保卫部" },
                { "value": 16, "name": "成都营运中心" },
                { "value": 17, "name": "武汉营运中心" },
                { "value": 18, "name": "计划财务部" }
            ]; ////TODO: need to get from API
            return renderSelect(departments, type);
        },
        "indicatorTypes": function (type) {
            return renderSelect(indicatorTypes, type);
        },
        "frequencies": function (frequency) {
            return renderSelect(frequencies, frequency);
        }
    };
    var editorRenders = {
        "input": function (cell) {
            var input = renderInputBox(cell.html());
            if (input) {
                cell.html('');
                cell.append(input);
            }
        },
        "textarea": function (cell) {
            var textarea = renderTextArea(cell.html(), cell.data('rows'));
            if (textarea) {
                cell.html('');
                cell.append(textarea);
            }
        },
        "select": function (cell) {
            var type = cell.data('select-type');
            if (type in selectRenderers) {
                var value = cell.attr('value');
                var list = selectRenderers[type](value);
                if (list) {
                    cell.html('');
                    cell.append(list);
                }
            }
        }
    };
    var shownRenders = {
        "input": function (cell) {
            var value = cell.children('input').val();
            cell.html(value);
        },
        "textarea": function (cell) {
            var value = cell.children('textarea').val();
            value = (value || '').replace(/\r\n/g, '<br />').replace(/\n/g, '<br />');
            cell.html(value);
        },
        "select": function (cell) {
            var element = cell.children('select');
            var value = element.val();
            var text = element.find("option:selected").text();
            cell.attr('value', value);
            cell.html(text);
        }
    };

    var CMB = window.CMB = {} || {};
    CMB.renderEditingRow = function (row, appends) {
        $.each(row.children('td'), function (i, cell) {
            cell = $(cell);
            if (i in appends) {
                appends[i](cell);
            } else {
                var editor = cell.data('editor');
                if (editor in editorRenders) {
                    editorRenders[editor](cell);
                }
            }
        });
    };
    CMB.renderShownRow = function (row, appends) {
        $.each(row.children('td'), function (i, cell) {
            cell = $(cell);
            if (i in appends) {
                appends[i](cell);
            } else {
                var editor = cell.data('editor');
                if (editor in shownRenders) {
                    shownRenders[editor](cell);
                }
            }
        });
    };

    function renderInputBox(text) {
        var input = $('<input type="text" class="form-control" style="width: 90%;" />');
        input.val(text || '');
        return input;
    }
    function renderTextArea(text, rows) {
        var textarea = $('<textarea style="width: 90%; resize: none;"></textarea>');
        if (util.isNumber(rows) === false) {
            rows = 3;
        }
        textarea.attr('rows', rows);
        textarea.html((text || '').replace(/<br \/>/g, '\r\n').replace(/<br>/g, '\r\n'));
        return textarea;
    }
    function renderSelect(source, value) {
        var list = $('<select class="form-control" style="width: 90%;"></select>');
        $.each(source, function (i, item) {
            var option = $('<option></option>');
            option.html(item.name);
            option.attr('value', item.value);
            if (item.value == value) {
                option.attr('selected', 'selected');
            }
            list.append(option);
        });
        return list;
    }






    var event_page_refreshed = document.createEvent("Event");
    event_page_refreshed.initEvent("page_refreshed", false, true);

    function urlChange() {
        var currentHash = util.getParamsUrl();
        if (routers[currentHash.path]) {
            routers[currentHash.path]();
        } else {
            location.hash = 'bulletin.center'
        }
    }
    var routers = {
        'bulletin.center': function () {
            $.get('pages/bulletin.center.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'bulletin': function () {
            $.get('pages/bulletin.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'material.list': function () {
            $.get('pages/material.list.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'material.modify': function () {
            $.get('pages/material.modify.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'order.list': function () {
            $.get('pages/order.list.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'order.modify': function () {
            $.get('pages/order.modify.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'task': function () {
            $.get('pages/task.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },

        'view': function () {
            $.get('pages/view.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'indicator.modify': function () {
            $.get('pages/indicator.modify.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'report.modify': function () {
            $.get('pages/report.modify.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'indicator.check': function () {
            $.get('pages/indicator.check.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'indicator.search': function () {
            $.get('pages/indicator.search.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'indicator.messagesend': function () {
            $.get('pages/indicator.messagesend.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'report.self': function () {
            $.get('pages/report.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        },
        'report.other': function () {
            $.get('pages/report.html', function (result) {
                window.dispatchEvent(event_page_refreshed);
                $('#page_container').html(result);
            });
        }
    };

    window.addEventListener('load', function () {
        urlChange()
    })
    window.addEventListener('hashchange', function () {
        urlChange()
    })
})($, window, undefined);