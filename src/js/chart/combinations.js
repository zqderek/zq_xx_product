let conf = {
    title: {
        text: ''
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    series: [],
    tooltip: {
        shared: true
    }
};


import defaultConf from './default.js';
import Vue from 'vue';
$.extend(true, conf, defaultConf);

export default {
    render(domId, title, data, options) {
        options = options || {};
        options.color = options.color || 'white';
        let d = $.extend(true, {}, defaultConf[options.color], conf);
        let isDate = data.x_axis.every(i => /^\d{13}$/g.test(i.toString()) );
        let series = data.y_axis.map((i, ind) => {
            return {
                type: i.type,
                name: i.split_field ? `${i.field}按照字段${i.split_field}值${i.split_value}统计` : i.field,
                data: !isDate ? i.data: i.data.map((i, ind) => [Number(data.x_axis[ind]), i]),
                marker: {
                    enabled: i.type == 'scatter' || data.x_axis.length == 1
                }
            }
        });

        let config = $.extend(true, {}, d, {
            title: {
                text: title || ''
            },
            xAxis: {
                type: isDate ? 'datetime': 'category', //OR category
                categories: isDate ? null: data.x_axis,
                labels: {
                    style: {
                        fontSize: '10px',
                        color: '#676767'
                    },
                    formatter: function() {
                        if (!isDate) return this.value;
                        var date = new Date(this.value);
                        if (date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
                            return Vue.dateFormat(date, 'MM月DD日');
                        } else {
                            return Vue.dateFormat(date, 'hh:mm');
                            //return this.axis.defaultLabelFormatter.call(this);
                        }
                    }
                }
            },
            series: series
        }, options || {});
        return Highcharts.chart(domId, config);
    }
}