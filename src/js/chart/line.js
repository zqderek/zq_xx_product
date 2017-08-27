import Vue from 'vue';
import defaultConf from './default.js';
let conf = {
    chart: {
        type: 'line',
    },
    title: {
        text: '',
        useHTML: true
    },
    xAxis: {
        type: 'datetime', //OR category
        tickmarkPlacement: 'on'
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: true
        }
    },
    series: []
}

function getPureLineConf(series) {
    return {
        "chart": {
            "type": "area",
            backgroundColor: null,
            borderWidth: 0,
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        "xAxis": {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: [],
            "categories": null,
            "tickWidth": 0,
            "lineWidth": 0,
        },
        "yAxis": {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]
        },
        "plotOptions": {
            "line": {
                "dataLabels": {
                    "enabled": false
                },
                "enableMouseTracking": false,
                "marker": {
                    "enabled": false
                },
            },
            series: {
                animation: false,
                lineWidth: 1,
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                marker: {
                    radius: 1,
                    states: {
                        hover: {
                            radius: 2
                        }
                    }
                },
                fillOpacity: 0.25
            },

            area: {
                lineColor: '#938CA4',
                color: '#E5E2E8',
            }
        },
        "series": series,
        "legend": {
            "enabled": false
        },
        tooltip: {
            enabled: false
        }
    };
} 

/**
 * title 图表标题
 * name 图表维度名称
 * data 示例：
 *  {
 * "fields": [
        "level"
    ],
   "x_axis": [
    1479312000,
    1479398400,
    1479484800,
    1479571200,
    1479657600,
],
    "y_axis": [
        {
            "data": [
                51,
                33,
                22,
                44,
                11
            ]
        }
    ]}
 */

export default {
    render(domId, title, data, options) {
        options = options || {};
        options.color = options.color || 'white';
        let d = $.extend(true, conf, defaultConf[options.color]);
        let isDate = data.x_axis.every(i => /^\d{13}$/g.test(i.toString()) );
        let setSeriseName = (s) => {
            return isDate ? Vue.dateFormat(s, 'YYYY年MM月DD日 hh:mm:ss') : s;
        }
        let series = data.y_axis.map((i, ind) => {
            return {
                name: data.fields ? setSeriseName(data.fields[ind]): '',
                data: i.data.map((a, b) => [isDate ? data.x_axis[b]*1: data.x_axis[b], a])
            }
        })
        if (options && options.pureLine) {
            return Highcharts.chart(domId, getPureLineConf(series));
        }
        let config = $.extend(true, {}, d, {
            chart: {
                type: data.y_axis[0].type ? data.y_axis[0].type : 'line'
            },
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
            legend: {
                enabled: series.length > 1 ? true: false
            },
            series: series,
            plotOptions: {
                series: {
                    name: data.field || '值',
                    marker: {
                        enabled: series[0] && series[0].data.length == 1
                    }   
                }
            }
        }, options || {});
        return Highcharts.chart(domId, config);
    }
};