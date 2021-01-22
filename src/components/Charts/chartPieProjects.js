import React from 'react';

import Chart from 'chart.js';
// import moment from 'moment';
import $ from 'jquery';

class ChartPieProjects extends React.Component {
    constructor(props) {
        super(props);
        this.chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)',
            greyDark: 'rgb(50,50,50)',
            white: 'rgb(240,240,240)'
        };



    }
    componentDidMount() {
        const data = {
            datasets: [{
                data: [10, 20],
                backgroundColor: [
                    'rgb(127,255,0)',
                    'rgb(51, 51, 51)'
                ]
            }],
            labels: [
                'Available',
                'Invested'
            ]
        };
        let options = Chart.defaults.doughnut;

        options = {
            legend: {
                display: false
                }
            };

        const ctx = document.getElementById('chartPieProjects').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });

    }




    render() {
        return (
            <canvas id="chartPieProjects" className="chartjs-render-monitor bg-dark" ></canvas>
        )
    }
}

export default ChartPieProjects;
