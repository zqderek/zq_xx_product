import Vue from 'vue';

let conf = {
    chart: {
        type: 'column',
        spacingBottom: 0,
    },
    plotOptions: {
        column: {
            pointInterval: 1,
            borderWidth: 0,
            shadow: false,
            color: '#6772E5'
        },
        series: {
            cursor: 'pointer',
            minPointWidth: 8,
            maxPointWidth: 100,
            pointPadding: 0.08,
            groupPadding: 0.08
        }
    },
    title: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        labels: {
            style: {
                fontSize: '10px',
                color: '#999999'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        labels: {
            style: {
                fontSize: '10px',
                color: '#466484'
            }
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        formatter: function(point) {
            return this.y + ' Events.'
        }
    },
    series: []
};

/**
 * data 示例：
 * [
 *      [1495541520000, 11],
 *      [1495541520000, 11],
 *      [1495541520000, 11],
 *      [1495541520000, 11]
 * ]
 */

import defaultConf from './default.js';

export default {
    render(domId, title, data, options) {
        options = options || {};
        options.color = options.color || 'white';
        let d = $.extend(true, conf, defaultConf[options.color]);
        let isDate = data.category.every(i => /^\d{13}$/g.test(i.toString()));
        let dataList = data.category.map((i, ind) => [isDate ? Number(i) : i, data.data[ind]]);

        let config = $.extend(true, {}, d, {
            title: {
                text: title || ''
            },
            xAxis: {
                type: isDate ? 'datetime': 'category',
                category: !isDate ? data.category: null,
                labels: {
                    formatter: function() {
                        if (!isDate) return this.value;
                        var date = new Date(this.value);
                        if (date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
                            return Vue.dateFormat(date, 'MM月DD日');
                        } else {
                            return this.axis.defaultLabelFormatter.call(this);
                        }
                    }
                }
            },
            series: [{
                name: options.name || 'Events',
                data: dataList
            }]
        }, options || {});
        return Highcharts.chart(domId, config);
    }
}