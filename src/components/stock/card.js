import React from 'react';
import './searchBar.css';

import { connect } from 'react-redux';

import Chart from 'chart.js';

import {formatMoney} from '../../Auxiliar';

import { updateHistoricData } from '../../actions/stocks';


class Card extends React.Component {

    constructor(props) {
        super(props);
        this.stock = props.listStock[props.card_order];

    }

    componentDidUpdate() {
        if (!(this.props.card_order < this.props.listStock.length)) {
            return;
        }
 
        // this.props.dispatch(updateHistoricData(this.props.listStock[this.props.card_order].source, this.props.listStock[this.props.card_order].symbol));

        let historic = null;//this.props.historic;
        // let historic = JSON.parse(localStorage.getItem(this.props.listStock[this.props.card_order].source + "/" + this.props.listStock[this.props.card_order].symbol));


        if (!historic) {
            return;
        }
        var ctx = document.getElementById('miniChart_' + this.props.card_order).getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: historic.map(h => h.date),
                datasets: [{
                    label: 'Close',
                    data: historic.map(h => h.close),
                    backgroundColor: 'RGB(200,100,20)',
                    pointRadius: 0,
                    borderWidth: 0
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false,
                        type: 'time',
                        time: {
                            parser: 'YYYY-MM-DD',
                            tooltipFormat: 'll'
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'value'
                        }
                    }]
                }
            }
        });
    }


    render() {

        return (

            <a href={"/stock/" + this.props.listStock[this.props.card_order].source + "/" + this.props.listStock[this.props.card_order].symbol} >
                <div className="searchBar_card bg-dark p-2 text-white mt-2 rounded">
                    <div className="row">
                        <div className="col-6 display-4 ">{this.props.listStock[this.props.card_order].symbol}</div>
                        <div className="col-6 ">
                            <div className="searchBar_card_value">{formatMoney(this.props.listStock[this.props.card_order].close * 100)}</div>
                            <div className=" badge badge-success ">
                            {
                                formatMoney(this.props.listStock[this.props.card_order].close -
                                this.props.listStock[this.props.card_order].last_close)
                                }
                             (+4.04%) </div>
                        </div>
                    </div>
                    <div className="row m-0 ">
                        <div className="searchBar_card_name col-12 d-flex align-items-center justify-content-center">{this.props.listStock[this.props.card_order].company_name}</div>
                        {/* <canvas id={"miniChart_" + this.props.card_order} height="150px" width="334px"></canvas> */}
                        <div className="searchBar_card_name col-12 d-flex align-items-center justify-content-center text-secondary">Source: {this.props.listStock[this.props.card_order].source}</div>
                    </div>
                    <div className="row m-0">
                        <div className=" col-12 d-flex align-items-center justify-content-center"></div>

                    </div>
                </div>
            </a>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        listStock: state.stocks.filtered,
        historic: [{ "date": "2019-01-02", "open": 154.89, "high": 158.85, "low": 154.23, "close": 157.92, "volume": 37039737 }, { "date": "2019-01-03", "open": 143.98, "high": 145.72, "low": 142, "close": 142.19, "volume": 91312195 }, { "date": "2019-01-04", "open": 144.53, "high": 148.5499, "low": 143.8, "close": 148.26, "volume": 58607070 }, { "date": "2019-01-07", "open": 148.7, "high": 148.83, "low": 145.9, "close": 147.93, "volume": 54777764 }, { "date": "2019-01-08", "open": 149.56, "high": 151.82, "low": 148.52, "close": 150.75, "volume": 41025314 }, { "date": "2019-01-09", "open": 151.29, "high": 154.53, "low": 149.63, "close": 153.31, "volume": 45099081 }, { "date": "2019-01-10", "open": 152.5, "high": 153.97, "low": 150.86, "close": 153.8, "volume": 35780670 }, { "date": "2019-01-11", "open": 152.88, "high": 153.7, "low": 151.51, "close": 152.29, "volume": 27023241 }, { "date": "2019-01-14", "open": 150.85, "high": 151.27, "low": 149.22, "close": 150, "volume": 32439186 }, { "date": "2019-01-15", "open": 150.27, "high": 153.39, "low": 150.05, "close": 153.07, "volume": 28710324 }, { "date": "2019-01-16", "open": 153.08, "high": 155.88, "low": 153, "close": 154.94, "volume": 30569706 }, { "date": "2019-01-17", "open": 154.2, "high": 157.66, "low": 153.26, "close": 155.86, "volume": 29821160 }, { "date": "2019-01-18", "open": 157.5, "high": 157.88, "low": 155.9806, "close": 156.82, "volume": 33751023 }, { "date": "2019-01-22", "open": 156.41, "high": 156.73, "low": 152.62, "close": 153.3, "volume": 30393970 }, { "date": "2019-01-23", "open": 154.15, "high": 155.14, "low": 151.7, "close": 153.92, "volume": 23130570 }, { "date": "2019-01-24", "open": 154.11, "high": 154.48, "low": 151.74, "close": 152.7, "volume": 25441549 }, { "date": "2019-01-25", "open": 155.48, "high": 158.13, "low": 154.32, "close": 157.76, "volume": 33547893 }, { "date": "2019-01-28", "open": 155.79, "high": 156.33, "low": 153.66, "close": 156.3, "volume": 26192058 }, { "date": "2019-01-29", "open": 156.25, "high": 158.13, "low": 154.11, "close": 154.68, "volume": 41587239 }, { "date": "2019-01-30", "open": 163.25, "high": 166.15, "low": 160.23, "close": 165.25, "volume": 61109780 }, { "date": "2019-01-31", "open": 166.11, "high": 169, "low": 164.56, "close": 166.44, "volume": 40739649 }, { "date": "2019-02-01", "open": 166.96, "high": 168.98, "low": 165.93, "close": 166.52, "volume": 32668138 }, { "date": "2019-02-04", "open": 167.41, "high": 171.655, "low": 167.28, "close": 171.25, "volume": 31495582 }, { "date": "2019-02-05", "open": 172.86, "high": 175.08, "low": 172.3501, "close": 174.18, "volume": 36101628 }, { "date": "2019-02-06", "open": 174.65, "high": 175.57, "low": 172.8531, "close": 174.24, "volume": 28239591 }, { "date": "2019-02-07", "open": 172.4, "high": 173.94, "low": 170.34, "close": 170.94, "volume": 31741690 }, { "date": "2019-02-08", "open": 168.99, "high": 170.66, "low": 168.42, "close": 170.41, "volume": 23819966 }, { "date": "2019-02-11", "open": 171.05, "high": 171.21, "low": 169.25, "close": 169.43, "volume": 20993425 }, { "date": "2019-02-12", "open": 170.1, "high": 171, "low": 169.7, "close": 170.89, "volume": 22283523 }, { "date": "2019-02-13", "open": 171.39, "high": 172.48, "low": 169.92, "close": 170.18, "volume": 22490233 }, { "date": "2019-02-14", "open": 169.71, "high": 171.2615, "low": 169.38, "close": 170.8, "volume": 21835747 }, { "date": "2019-02-15", "open": 171.25, "high": 171.7, "low": 169.75, "close": 170.42, "volume": 24626814 }, { "date": "2019-02-19", "open": 169.71, "high": 171.44, "low": 169.49, "close": 170.93, "volume": 18972826 }, { "date": "2019-02-20", "open": 171.19, "high": 173.32, "low": 170.99, "close": 172.03, "volume": 26114362 }, { "date": "2019-02-21", "open": 171.8, "high": 172.37, "low": 170.3, "close": 171.06, "volume": 17249670 }, { "date": "2019-02-22", "open": 171.58, "high": 173, "low": 171.38, "close": 172.97, "volume": 18913154 }, { "date": "2019-02-25", "open": 174.16, "high": 175.87, "low": 173.95, "close": 174.23, "volume": 21873358 }, { "date": "2019-02-26", "open": 173.71, "high": 175.3, "low": 173.1732, "close": 174.33, "volume": 17070211 }, { "date": "2019-02-27", "open": 173.21, "high": 175, "low": 172.73, "close": 174.87, "volume": 27835389 }, { "date": "2019-02-28", "open": 174.32, "high": 174.91, "low": 172.92, "close": 173.15, "volume": 28215416 }, { "date": "2019-03-01", "open": 174.28, "high": 175.15, "low": 172.89, "close": 174.97, "volume": 25886167 }, { "date": "2019-03-04", "open": 175.69, "high": 177.75, "low": 173.97, "close": 175.85, "volume": 27436203 }, { "date": "2019-03-05", "open": 175.94, "high": 176, "low": 174.54, "close": 175.53, "volume": 19737419 }, { "date": "2019-03-06", "open": 174.67, "high": 175.49, "low": 173.94, "close": 174.52, "volume": 20810384 }, { "date": "2019-03-07", "open": 173.87, "high": 174.44, "low": 172.02, "close": 172.5, "volume": 24796374 }, { "date": "2019-03-08", "open": 170.32, "high": 173.07, "low": 169.5, "close": 172.91, "volume": 23999358 }, { "date": "2019-03-11", "open": 175.49, "high": 179.12, "low": 175.35, "close": 178.9, "volume": 32011034 }, { "date": "2019-03-12", "open": 180, "high": 182.67, "low": 179.37, "close": 180.91, "volume": 32467584 }, { "date": "2019-03-13", "open": 182.25, "high": 183.3, "low": 180.92, "close": 181.71, "volume": 31032524 }, { "date": "2019-03-14", "open": 183.9, "high": 184.1, "low": 182.56, "close": 183.73, "volume": 23579508 }, { "date": "2019-03-15", "open": 184.85, "high": 187.33, "low": 183.74, "close": 186.12, "volume": 39042912 }, { "date": "2019-03-18", "open": 185.8, "high": 188.39, "low": 185.79, "close": 188.02, "volume": 26219832 }, { "date": "2019-03-19", "open": 188.35, "high": 188.99, "low": 185.92, "close": 186.53, "volume": 31646369 }, { "date": "2019-03-20", "open": 186.23, "high": 189.49, "low": 184.73, "close": 188.16, "volume": 31035231 }, { "date": "2019-03-21", "open": 190.02, "high": 196.33, "low": 189.81, "close": 195.09, "volume": 51034237 }, { "date": "2019-03-22", "open": 195.34, "high": 197.69, "low": 190.78, "close": 191.05, "volume": 42407666 }, { "date": "2019-03-25", "open": 191.51, "high": 191.98, "low": 186.6, "close": 188.74, "volume": 43845293 }, { "date": "2019-03-26", "open": 191.664, "high": 192.88, "low": 184.58, "close": 186.79, "volume": 49800538 }, { "date": "2019-03-27", "open": 188.75, "high": 189.76, "low": 186.55, "close": 188.47, "volume": 29848427 }, { "date": "2019-03-28", "open": 188.95, "high": 189.559, "low": 187.53, "close": 188.72, "volume": 20780363 }, { "date": "2019-03-29", "open": 189.83, "high": 190.08, "low": 188.54, "close": 189.95, "volume": 23563961 }, { "date": "2019-04-01", "open": 191.64, "high": 191.68, "low": 188.38, "close": 191.24, "volume": 27861964 }, { "date": "2019-04-02", "open": 191.09, "high": 194.46, "low": 191.05, "close": 194.02, "volume": 22765732 }, { "date": "2019-04-03", "open": 193.25, "high": 196.5, "low": 193.15, "close": 195.35, "volume": 23271830 }, { "date": "2019-04-04", "open": 194.79, "high": 196.37, "low": 193.14, "close": 195.69, "volume": 19114275 }, { "date": "2019-04-05", "open": 196.45, "high": 197.1, "low": 195.93, "close": 197, "volume": 18526644 }, { "date": "2019-04-08", "open": 196.42, "high": 200.23, "low": 196.34, "close": 200.1, "volume": 25881697 }, { "date": "2019-04-09", "open": 200.32, "high": 202.85, "low": 199.23, "close": 199.5, "volume": 35768237 }, { "date": "2019-04-10", "open": 198.68, "high": 200.74, "low": 198.18, "close": 200.62, "volume": 21695288 }, { "date": "2019-04-11", "open": 200.85, "high": 201, "low": 198.4431, "close": 198.95, "volume": 20900808 }, { "date": "2019-04-12", "open": 199.2, "high": 200.14, "low": 196.21, "close": 198.87, "volume": 27760668 }, { "date": "2019-04-15", "open": 198.58, "high": 199.85, "low": 198.01, "close": 199.23, "volume": 17536646 }, { "date": "2019-04-16", "open": 199.46, "high": 201.37, "low": 198.56, "close": 199.25, "volume": 25696385 }, { "date": "2019-04-17", "open": 199.54, "high": 203.38, "low": 198.61, "close": 203.13, "volume": 28906780 }, { "date": "2019-04-18", "open": 203.12, "high": 204.15, "low": 202.52, "close": 203.86, "volume": 24195766 }, { "date": "2019-04-22", "open": 202.83, "high": 204.94, "low": 202.34, "close": 204.53, "volume": 19439545 }, { "date": "2019-04-23", "open": 204.43, "high": 207.75, "low": 203.9, "close": 207.48, "volume": 23322991 }, { "date": "2019-04-24", "open": 207.36, "high": 208.48, "low": 207.05, "close": 207.16, "volume": 17540609 }, { "date": "2019-04-25", "open": 206.83, "high": 207.76, "low": 205.12, "close": 205.28, "volume": 18543206 }, { "date": "2019-04-26", "open": 204.9, "high": 205, "low": 202.12, "close": 204.3, "volume": 18649102 }, { "date": "2019-04-29", "open": 204.4, "high": 205.97, "low": 203.86, "close": 204.61, "volume": 22204716 }, { "date": "2019-04-30", "open": 203.06, "high": 203.4, "low": 199.11, "close": 200.67, "volume": 46534923 }, { "date": "2019-05-01", "open": 209.88, "high": 215.31, "low": 209.23, "close": 210.52, "volume": 64827328 }, { "date": "2019-05-02", "open": 209.84, "high": 212.65, "low": 208.13, "close": 209.15, "volume": 31996324 }, { "date": "2019-05-03", "open": 210.89, "high": 211.84, "low": 210.23, "close": 211.75, "volume": 20892378 }, { "date": "2019-05-06", "open": 204.29, "high": 208.84, "low": 203.5, "close": 208.48, "volume": 32443113 }, { "date": "2019-05-07", "open": 205.88, "high": 207.4175, "low": 200.825, "close": 202.86, "volume": 38763698 }, { "date": "2019-05-08", "open": 201.9, "high": 205.34, "low": 201.75, "close": 202.9, "volume": 26339504 }, { "date": "2019-05-09", "open": 200.4, "high": 201.68, "low": 196.66, "close": 200.72, "volume": 34908607 }, { "date": "2019-05-10", "open": 197.419, "high": 198.85, "low": 192.77, "close": 197.18, "volume": 41208712 }, { "date": "2019-05-13", "open": 187.71, "high": 189.48, "low": 182.85, "close": 185.72, "volume": 57430623 }, { "date": "2019-05-14", "open": 186.41, "high": 189.7, "low": 185.41, "close": 188.66, "volume": 36529677 }, { "date": "2019-05-15", "open": 186.27, "high": 191.75, "low": 186.02, "close": 190.92, "volume": 26544718 }, { "date": "2019-05-16", "open": 189.91, "high": 192.4689, "low": 188.84, "close": 190.08, "volume": 33031364 }, { "date": "2019-05-17", "open": 186.93, "high": 190.9, "low": 186.76, "close": 189, "volume": 32879090 }, { "date": "2019-05-20", "open": 183.52, "high": 184.349, "low": 180.2839, "close": 183.09, "volume": 38612290 }, { "date": "2019-05-21", "open": 185.22, "high": 188, "low": 184.7, "close": 186.6, "volume": 28364848 }, { "date": "2019-05-22", "open": 184.66, "high": 185.71, "low": 182.55, "close": 182.78, "volume": 29748556 }, { "date": "2019-05-23", "open": 179.8, "high": 180.54, "low": 177.81, "close": 179.66, "volume": 36529736 }, { "date": "2019-05-24", "open": 180.2, "high": 182.14, "low": 178.62, "close": 178.97, "volume": 23714686 }, { "date": "2019-05-28", "open": 178.92, "high": 180.59, "low": 177.91, "close": 178.23, "volume": 27948160 }, { "date": "2019-05-29", "open": 176.42, "high": 179.35, "low": 176, "close": 177.38, "volume": 28481165 }, { "date": "2019-05-30", "open": 177.95, "high": 179.23, "low": 176.67, "close": 178.3, "volume": 21218412 }, { "date": "2019-05-31", "open": 176.23, "high": 177.99, "low": 174.99, "close": 175.07, "volume": 27043584 }, { "date": "2019-06-03", "open": 175.6, "high": 177.92, "low": 170.27, "close": 173.3, "volume": 40396069 }, { "date": "2019-06-04", "open": 175.44, "high": 179.83, "low": 174.52, "close": 179.64, "volume": 30967961 }, { "date": "2019-06-05", "open": 184.28, "high": 184.99, "low": 181.14, "close": 182.54, "volume": 29773427 }, { "date": "2019-06-06", "open": 183.08, "high": 185.47, "low": 182.1489, "close": 185.22, "volume": 22526311 }, { "date": "2019-06-07", "open": 186.51, "high": 191.92, "low": 185.77, "close": 190.15, "volume": 30684393 }, { "date": "2019-06-10", "open": 191.81, "high": 195.37, "low": 191.62, "close": 192.58, "volume": 26220851 }, { "date": "2019-06-11", "open": 194.86, "high": 196, "low": 193.6, "close": 194.81, "volume": 26932882 }, { "date": "2019-06-12", "open": 193.95, "high": 195.97, "low": 193.385, "close": 194.19, "volume": 18253189 }, { "date": "2019-06-13", "open": 194.7, "high": 196.79, "low": 193.6, "close": 194.15, "volume": 21674625 }, { "date": "2019-06-14", "open": 191.545, "high": 193.5863, "low": 190.3, "close": 192.74, "volume": 18761474 }, { "date": "2019-06-17", "open": 192.9, "high": 194.96, "low": 192.17, "close": 193.89, "volume": 14669144 }, { "date": "2019-06-18", "open": 196.05, "high": 200.29, "low": 195.21, "close": 198.45, "volume": 26551004 }, { "date": "2019-06-19", "open": 199.68, "high": 199.88, "low": 197.31, "close": 197.87, "volume": 21124235 }, { "date": "2019-06-20", "open": 200.37, "high": 200.61, "low": 198.03, "close": 199.46, "volume": 21513988 }, { "date": "2019-06-21", "open": 198.8, "high": 200.85, "low": 198.15, "close": 198.78, "volume": 47800589 }, { "date": "2019-06-24", "open": 198.54, "high": 200.16, "low": 198.17, "close": 198.58, "volume": 18220421 }, { "date": "2019-06-25", "open": 198.43, "high": 199.26, "low": 195.29, "close": 195.57, "volume": 21070334 }, { "date": "2019-06-26", "open": 197.77, "high": 200.99, "low": 197.35, "close": 199.8, "volume": 26067512 }, { "date": "2019-06-27", "open": 200.29, "high": 201.57, "low": 199.57, "close": 199.74, "volume": 20899717 }, { "date": "2019-06-28", "open": 198.68, "high": 199.495, "low": 197.05, "close": 197.92, "volume": 31110642 }, { "date": "2019-07-01", "open": 203.17, "high": 204.49, "low": 200.65, "close": 201.55, "volume": 27316739 }]
    };
};

export default connect(mapStateToProps)(Card);
