import defaultConf from './default.js';
import Vue from 'vue';


let conf = {
    chart: {
        type: 'column'
    },
    title: {
        text: '',
        align: 'left',
        style: {
            color: '#666'
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                formatter: function() {
                    return this.y.toFixed(2)
                }
            }
        }
    },
    tooltip: {
        formatter: function(point) {
            let isDate = /^\d{13}$/g.test(this.key);
            return `<span style="color:${this.color}">${isDate ? Vue.dateFormat(Number(this.key), 'YYYY年MM月DD日 hh:mm:ss') : this.key}: <b>${this.y.toFixed(2)}</b><br/>`
        }
    },
    series: []
};

export default {
    render(domId, title, data, options) {
        options = options || {};
        options.color = options.color || 'white';
        let isDate = data.x_axis.every(i => /^\d{13}$/g.test(i.toString()) );
        let setSeriseName = (s) => {
            return isDate ? Vue.dateFormat(s, 'YYYY年MM月DD日 hh:mm:ss') : s;
        }
        let d = $.extend(true, conf, defaultConf[options.color]);
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
                    formatter: function(e) {
                        if (!isDate) return this.value;
                        var date = new Date(this.value);
                        if (date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
                            return Vue.dateFormat(date, 'MM月DD日');
                        } else {
                            //return Vue.dateFormat(date, 'hh:mm');
                            return this.axis.defaultLabelFormatter.call(this);
                        }
                    }
                }
            },
            series: [{
                colorByPoint: true,
                data: data.x_axis.map((i, ind) => [i, data.y_axis[0].data[ind]])
            }]
        }, options || {});
        return Highcharts.chart(domId, config);
    }
};