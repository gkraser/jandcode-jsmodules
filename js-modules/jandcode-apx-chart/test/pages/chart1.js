/**
 * params.color - цвет
 */
export default function(params) {
    params = params || {}
    let option
    {
        // https://echarts.apache.org/examples/en/editor.html?c=area-time-axis
        ////////////////////////////////////////////////////////
        let base = +new Date(1988, 9, 3);
        let oneDay = 24 * 3600 * 1000;
        let data = [[base, Math.random() * 300]];
        for (let i = 1; i < 20000; i++) {
            let now = new Date((base += oneDay));
            data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
        }
        option = {
            tooltip: {
                trigger: 'axis',
                position: function(pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: 'Large Ara Chart'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'time',
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 5
                },
                {
                    start: 0,
                    end: 20
                }
            ],
            series: [
                {
                    name: 'Fake Data',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {},
                    data: data,
                }
            ]
        };
        ////////////////////////////////////////////////////////
        if (params.color) {
            option.series[0].color = params.color
        }
    }
    return option
}