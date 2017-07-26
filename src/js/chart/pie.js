let conf = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: '',
        floating:true,
        align: 'center',
        useHTML: true,
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        useHTML: true
    },
    series: []
}

/**
 * title 图表标题
 * name 图表维度名称
 * data 示例：
 *  {
        "fields": [
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
        ]};
        
 */

import defaultConf from './default.js';


function getTitle(name, y) {
    return `<div class="__pie_chart_title_wrap__">
                <h3 class="__pie_chart_title_name__">${name}</h3>
                <p class="__pie_chart_title_value__">${y}%</p>
            </div>`
}
export default {
    render(domId, title, data, options) {
        let chart = null;
        let diabledPoints = [];
        options = options || {};
        options.color = options.color || 'white';
        let d = $.extend(true, {}, defaultConf[options.color], conf);

        let max = Math.max.apply(null, data.y_axis[0].data);
        let maxX = data.x_axis[data.y_axis[0].data.indexOf(max)];
        title = getTitle(maxX, (max/data.y_axis[0].data.reduce((a, b) => a + b) * 100).toFixed(2));

        let centerPoint = {
            name: maxX
        };

        let config = $.extend(true, {}, d, {
            chart: {
                events: {
                    render: function(e) {
                        chart = e.target;
                        setCenter(chart);
                    }
                }
            },
            title: {
                text: title
            },
            plotOptions: {
                pie: {
                    point: {
                        events: {
                            mouseOver: function(e) {
                                centerPoint = this;
                                setChartTitle(chart, this);
                            },
                            legendItemClick: function(e) {
                                let points = chart.series[0].points.sort(i => i.index);
                                if (!this.visible) {
                                    centerPoint = this;
                                    setChartTitle(chart, this);
                                    return;
                                }
                                if (centerPoint.name == this.name) {
                                    centerPoint = points.filter(i => i.visible && i.index != this.index)[0];
                                    setChartTitle(chart, centerPoint);
                                }
                            }
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: options.name || '',
                colorByPoint: true,
                innerSize: '70%',
                data: data.x_axis.map((i, ind) => ([i.toString(), data.y_axis[0].data[ind]]))
            }]
        }, options || {});
        return Highcharts.chart(domId, config);
    }
};

function setCenter(c) {
    // 环形图圆心
    var centerY = c.series[0].center[1],
        titleHeight = parseInt(c.title.styles.fontSize);
    c.setTitle({
        y:centerY + titleHeight/4
    });
}

function setChartTitle(chart, point) {
    chart.setTitle({
        text: getTitle(point.name, (100*point.y/point.total).toFixed(2))
    });
}