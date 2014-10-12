count = 0;

var chart = c3.generate({
    bindto: '#chart',
    data: {
        x: 'x',
        columns: [
            ['x', '2010-1-1', '2011-1-1', '2012-1-1', '2013-1-1', '2014-1-1'],
            ['trend', 28.28, 106.31, 316.93, 664.89, 1370],
            //['annual-revenue', 28.28, 106.31, 316.93, 664.89, 'N/A'],
            ['prior-revenue', 28.28, 28.28, 106.31, 316.93, 664.89],
            //['predicted-revenue', 'N/A', 'N/A', 'N/A', 'N/A', 1370],
            //['%growth', 0, 275.96, 198.11, 109.79, 100]
            ['growth', 0, 78.03, 210.62, 347.96, 'N/A'],
            ['predicted-growth', 'N/A', 'N/A', 'N/A', 'N/A', 705.11]



        ],
        groups: [
            ['prior-revenue', 'growth', 'predicted-growth' ]
        ],
        axes: {
            //'growth': 'y2'
        },
        type: 'bar',
        types: {
            growth: 'bar',
            trend: 'spline',

        },
    },
    subchart: {
        show: false
    },

    zoom: {
        enabled: false
    },
    tooltip: {
        format: {
            //title: function (d) { return 'Data ' + d; },
          /*  value: function (value, ratio, id) {
                var format = id === '' ? d3.format(',') : d3.format('$M');
                d3.formatPrefix(1.21e9);
                return format(value);
            } */
            //            value: d3.format(',') // apply this format to both y and y2
        }
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        },
        y: {
            tick: {
                //format: d3.format("$M")
            },
            label: {
                text: 'Annual Revenue ($M)',
                position: 'outer-middle'

            }
        },
        y2: {
            show: false,
            label: {
                text: 'Growth',
                position: 'outer-middle'
            },
            max: 1200,
            min: 0
        }
    }
});

function reinit() {
    chart.load({
        columns: [
            ['x', '2014-07-24', '2014-07-25', '2014-07-26', '2014-07-27', '2014-07-28', '2014-07-29'],
            ['growth', 5, 2, 4, -3, 6, 5],
            ['annual-revenue', 130, 340, 200, 500, 250, 350],
            ['predicted-revenue', 500, 50, 250, 450, 60, 350]
        ],
    });
}

function reload() {
    if (!count) {
        chart.load({
            columns: [
                ['x', '2014-07-24', '2014-07-25', '2014-07-26', '2014-07-27', '2014-07-28', '2014-07-29'],
                ['growth', 10, 2, 4, -3, 6, 5],
                ['annual-revenue', -130, 340, 200, 500, 250, 350],
                ['predicted-revenue', -500, 50, 250, 450, 60, 350]
            ]
        });
        count++;
    } else {
        reinit();
        count--;
    }
}
