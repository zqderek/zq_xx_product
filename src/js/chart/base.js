/**
 * 全局设置hightchart 配置
 */

Highcharts.setOptions({ 
    global: {
        useUTC: false
    },
    colors: ['#5581E3', '#9ACC67', '#40B27E', '#F6CC4E', '#F78E4B', '#F25554', '#CE61D6', '#8A52D3', '#5355B7', '#55B3F0', '#6BD3DB', '#D3306C'],
    lang: {
        weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        shortMonths: [ "1月" , "2月" , "3月" , "4月" , "5月" , "6月" , "7月" , "8月" , "9月" , "10月" , "11月" , "12月"],
        months: [ "1月" , "2月" , "3月" , "4月" , "5月" , "6月" , "7月" , "8月" , "9月" , "10月" , "11月" , "12月"],
        noData: "暂无数据展示"
    }
});

Highcharts.dateFormat("%Y-%m-%d %H:%M:%S");

/**
 * 使用xhr2 blob下载文件
 */
Highcharts.post = function(data) {
    /*
    let xhr = new XMLHttpRequest();
    xhr.open('post', data.url || '/export_highcharts', true);
    
    let formData = new FormData();
    Object.keys(data).forEach(i => {
        formData.append(i, data[i]);
    });
    
    xhr.responseType = "blob";
    xhr.send(formData);

    xhr.onload = function(e) {
        if (this.status == 200) {
            var blob = this.response;
            var link = document.createElement("a");
            link.target = "_blank";
            link.download = data.filename + '.' + data.type;
            link.href = window.URL.createObjectURL(blob);
            link.click();
        }
    }*/
    data.url = data.url || '/export_highcharts';
    var config = $.extend(true, { method: 'post' }, data);
    var $iframe = $('<iframe id="down-file-iframe" />');
    var $form = $('<form target="down-file-iframe" method="post" />');
    $form.attr('action', config.url);
    for (var key in config) {
        let input = $(`<input type="hidden" name="${key}"/>`);
        input[0].value = config[key];
        $form.append(input);
    }
    $iframe.append($form);
    $(document.body).append($iframe);
    $form[0].submit();
    $iframe.remove();
}

/**
 * options = {
 *     chart: highcharts对象
 *     domId: 渲染highcharts图的dom id，不带 #
 *     filename: 文件保存的名字
 * }
 */
Highcharts.exportCSV = function(options) {
    let chart = options.chart || {};
    if (options.domId) {
        chart = $('#' + options.domId).highcharts();
    }
    let csv = chart.getCSV();
    Highcharts.post({
        url: '/js_api/export_csv',
        csv: csv,
        filename: options.filename + '.xls' || '未命名.xls'
    })
}