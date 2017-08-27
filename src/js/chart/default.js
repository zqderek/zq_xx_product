let black = {
    credits: {
        enabled: false
    },
    chart: {
        style: {
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'left',
            lineHeight: 'normal',
            zIndex: 0,
            webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
            fontFamily: 'Avenir, wf_SegoeUI, "Segoe UI", Segoe, "Segoe WP", Tahoma, Verdana, Arial, sans-serif',
        },
        backgroundColor: '#393C56',
        alignTicks: false
    },
    title: {
        useHTML: true,
        style: {
            fontFamily: 'Avenir, wf_SegoeUI, "Segoe UI", Segoe, "Segoe WP", Tahoma, Verdana, Arial, sans-serif'
        },
        align: 'left'
    },
    yAxis: {
        //gridLineWidth: 0,
        gridLineColor: 'rgba(255, 255, 255, 0.06)',
        labels: {
            style: {
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '10px'
            }
        }
    },
    xAxis: {
        tickWidth: 0,
        labels: {
            style: {
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '10px'
            }
        }
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                pointFormatter: function(e) {
                    console.log(e);
                }
            }
        },
        pie: {
            shadow: false,
            dataLabels: {
                color: "#ffffff",
            }
        }
    },
    legend: {
        itemStyle: {
            color: "rgba(255,255,255,.7)"
        },
        itemHoverStyle: {
            color: "rgba(255,255,255,1)"
        }
    },
    noData: {
        "position": {
            "x": 0,
            "y": 0,
            "align": "center",
            "verticalAlign": "middle"
        },
        "style": {
            "fontWeight": "bold",
            "fontSize": "14px",
            "color": "#fff"
        }
    },
    tooltip: {
        useHTML: true,
        borderColor: '#333549',
        backgroundColor: '#333549',
        shadow: true,
        style: {
            color: "#fffff"
        }
    }
};
let white = {
    credits: {
        enabled: false
    },
    chart: {
        style: {
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'left',
            lineHeight: 'normal',
            zIndex: 0,
            webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
            fontFamily: 'Avenir, wf_SegoeUI, "Segoe UI", Segoe, "Segoe WP", Tahoma, Verdana, Arial, sans-serif',
        },
        backgroundColor: 'rgba(0,0,0,0)',
        alignTicks: false
    },
    title: {
        useHTML: true,
        style: {
            fontFamily: 'Avenir, wf_SegoeUI, "Segoe UI", Segoe, "Segoe WP", Tahoma, Verdana, Arial, sans-serif'
        },
        align: 'left'
    },
    yAxis: {
        //gridLineWidth: 0,
        gridLineColor: 'rgba(0, 0, 0, 0.1)',
        labels: {
            style: {
                color: 'rgba(0, 0, 0, 0.5)',
                fontSize: '10px'
            }
        }
    },
    xAxis: {
        tickWidth: 0,
        labels: {
            style: {
                color: 'rgba(0, 0, 0, 0.5)',
                fontSize: '10px'
            }
        }
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: false
            }
        },
        pie: {
            shadow: false,
            dataLabels: {
                color: "#777777",
            }
        }
    },
    legend: {
        itemStyle: {
            color: "rgba(0,0,0,.7)"
        },
        itemHoverStyle: {
            color: "rgba(0,0,0,1)"
        }
    },
    noData: {
        "position": {
            "x": 0,
            "y": 0,
            "align": "center",
            "verticalAlign": "middle"
        },
        "style": {
            "fontWeight": "bold",
            "fontSize": "14px",
            "color": "#666"
        }
    },
    tooltip: {
        useHTML: true,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        shadow: true,
        style: {
            color: "#777777"
        }
    }
}
export default {
    black,
    white
}