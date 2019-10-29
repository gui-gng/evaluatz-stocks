import React from 'react';
import './css/profile.css';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';

import Chart from 'chart.js';


import { formatMoney } from '../Auxiliar';
import { updateSelectedStock } from '../actions/stocks';

import SearchBar from '../components/stock/searchBar';

class Stock extends React.Component {

    constructor(props) {
        super(props);
        this.stockSource = props.match.params.source;
        this.stockSymbol = props.match.params.symbol;

        props.dispatch(updateSelectedStock(this.stockSource, this.stockSymbol));
    }


    componentDidUpdate() {

        let historic = this.props.selectedStock.historic;
        if (!historic) {
            return;
        }
        var ctx = document.getElementById('chart_stock_details_' + this.stockSymbol).getContext('2d');
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
                        display: true,
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
                        display: true,
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
            <div className="evaluatz_stock_details">
                <SearchBar />
                <div className="d-flex flex-wrap justify-content-around bg-dark animated faster p-3 text-white">


                    <div className="container">
                        <div className="row justify-content-center">
                            <h1>{this.stockSymbol}</h1>
                        </div>
                        <div className="row justify-content-center">
                            <h4>{
                                this.props.selectedStock.company_name ?
                                    this.props.selectedStock.company_name :
                                    null
                            }</h4>
                        </div>
                        <div className="row justify-content-center p-3 rounded bg-white-01">
                            <canvas id={"chart_stock_details_" + this.stockSymbol} height="350px" width="900px"></canvas>
                        </div>
                        <div className="row justify-content-center text-secondary pt-2 evaluatz-text-small">
                            Source:
                            {
                                this.props.selectedStock.source ?
                                    this.props.selectedStock.source :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedStock: state.stocks.selectedStock
    };
};

export default connect(mapStateToProps)(withCookies(Stock));
