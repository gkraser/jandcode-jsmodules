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
        for (let i = 1; i < 20; i++) {
            let now = new Date((base += oneDay));
            data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
        }
        option = {
            animation: false,
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
            xAxis: {
                type: 'time',
                show: true,
            },
            yAxis: {
                type: 'value',
                show: false,
            },
            series: [
                {
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {},
                    data: data,
                }
            ]
        }
        ////////////////////////////////////////////////////////
        if (params.color) {
            option.series[0].color = 'red'
        }
    }
    return option
}