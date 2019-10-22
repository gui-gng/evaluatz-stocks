import React from 'react';

import Chart from 'chart.js';
// import moment from 'moment';
import $ from 'jquery';

class ChartSample extends React.Component {
    constructor(props) {
        super(props);
        this.evaluatz_chart_stock_sample = null;
        this.evaluatz_sample_accuracy = 0.1;
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
        this.loadChart();

    }
    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomArray(length) {
        var data = [];
        var i = 0;
        while (i < length) {
            data.push(this.randomNumber(5, 10));
            i++;
        }
        return data;
    }


    simutalePrediction(data, accuracy) {
        var predictionData = [];
        var i = 0;
        while (i < data.length) {
            predictionData.push(this.randomNumber(data[i] * accuracy, data[i] / accuracy));
            i++;
        }
        return predictionData;
    }


    loadChart() {
        var dateFormat = 'MMMM DD YYYY';
        // var date = moment('April 01 2017', dateFormat);
        var length = 30;
        var labels = Array.apply(null, { length: length }).map(Function.call, Number);;
        var data = this.randomArray(length);
        var predictData = this.simutalePrediction(data, this.evaluatz_sample_accuracy);
        this.drawSampleChart(labels, data, predictData);

        var evl_interval = setInterval(() => {
            try {
                this.evaluatz_sample_accuracy += 0.1;
                if (this.evaluatz_sample_accuracy >= 0.9) {
                    this.evaluatz_sample_accuracy = 0.99;
                }
                predictData = this.simutalePrediction(data, this.evaluatz_sample_accuracy);
                this.drawSampleChart(labels, data, predictData);
                $('.evaluatz-stock-percentage').html(parseFloat(this.evaluatz_sample_accuracy * 100).toFixed(2) + "%");
            } catch (error) {
                // console.log(error);
            }
        }, 1000);

        let interval_check = setInterval(() => {
            if (this.evaluatz_sample_accuracy > 0.9) {
                clearInterval(evl_interval);
                clearInterval(interval_check);
            }
            $('.evaluatz-stock-loss').html(parseFloat(this.randomNumber(1 - this.evaluatz_sample_accuracy, 1.2 - this.evaluatz_sample_accuracy)).toFixed(2) + "%")
        }, 100);
    }

    drawSampleChart(labels, data, predictData) {
        var ctx_tf = document.getElementById('canvasChartSample').getContext('2d');
        var dataChart = {
            labels: labels,
            datasets: [{
                label: 'Prediction',
                borderColor: this.chartColors.green,
                backgroundColor: this.chartColors.green,
                fill: false,
                data: predictData,
                pointRadius: 0,
                lineTension: 0,
                borderWidth: 2,
                yAxisID: 'y-axis-1'
            },
            {
                label: 'Close',
                borderColor: this.chartColors.blue,
                backgroundColor: this.chartColors.blue,
                fill: false,
                data: data,
                pointRadius: 0,
                lineTension: 0,
                borderWidth: 2,
                yAxisID: 'y-axis-1',
            }]
        };
        if (this.evaluatz_chart_stock_sample) {
            this.evaluatz_chart_stock_sample.data = dataChart;
            this.evaluatz_chart_stock_sample.options.animation = false;
        }
        else {
            this.evaluatz_chart_stock_sample = this.configLineChart_Sample(ctx_tf, dataChart);
        }
        this.evaluatz_chart_stock_sample.update();
    }

    configLineChart_Sample(ctx, lineChartData) {
        return Chart.Line(ctx, {
            data: lineChartData,
            options: {
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                },
                responsive: true,
                hoverMode: 'index',
                stacked: false,
                title: {
                    display: true,
                    text: 'Stock Details',
                    fontColor: 'white'
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: 'white'
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        ticks: {
                            fontColor: 'white'
                        }
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        ticks: {
                            fontColor: 'white'
                        }
                    }]
                }
            }
        });
    }


    render() {
        return (
            <div className="container">

                <div className="row bg-dark">
                    <div className="col text-white text-center">
                        <div className="row justify-content-center">
                            <h4>Accuracy</h4>
                        </div>
                        <div className="row justify-content-center">
                            <h3 className="evaluatz-stock-percentage">99.00%</h3>
                        </div>
                    </div>
                    <div className="col text-white">
                        <div className="row justify-content-center">
                            <h4>Loss</h4>
                        </div>
                        <div className="row justify-content-center">
                            <h3 className="evaluatz-stock-loss">0.16%</h3>
                        </div>
                    </div>

                </div>
                <div className="row"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                    <canvas id="canvasChartSample" width="2220" height="818" className="chartjs-render-monitor bg-dark" ></canvas>
                </div>
            </div>
        )
    }
}

export default ChartSample;
