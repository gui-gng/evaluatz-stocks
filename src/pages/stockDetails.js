import React from 'react';
import './stockDetails.css';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Chart from 'chart.js';


import { formatMoney } from '../Auxiliar';
import { updateSelectedStock, updateStockList } from '../actions/stocks';

import SearchBar from '../components/stock/searchBar';

class StockDetails extends React.Component {

    constructor(props) {
        super(props);
        this.stockSource = props.match.params.source;
        this.stockSymbol = props.match.params.symbol;

        this._updateStock = this._updateStock.bind(this);

        props.dispatch(updateSelectedStock(this.stockSource, this.stockSymbol));
        props.dispatch(updateStockList());
    }

    componentWillReceiveProps() {

    }


    componentDidMount() {

    }

    componentDidUpdate() {


        this.stockSource = this.props.match.params.source;
        this.stockSymbol = this.props.match.params.symbol;
        

        let historic = this.props.selectedStock.historic;
        if (!historic) {
            return;
        }

        const c = document.getElementById('chart_stock_details');
        const ctx = c.getContext('2d');

 
        if (this.props.selectedStock.symbol == this.props.match.params.symbol) {

    
            this.chartStockDetails = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: historic.map(h => h.date),
                    datasets: [{
                        label: 'Close',
                        data: historic.map(h => parseFloat(h.close)),
                        borderColor: 'RGB(200,100,20)',
                        pointRadius: 0,
                        borderWidth: 0, 
                        fill:false
                    
                    },
                    {
                        label: 'Prediction',
                        data: historic.map(h => parseFloat(h.pred)),
                        borderColor: 'RGB(100,100,20)',
                        pointRadius: 0,
                        borderWidth: 0,
                        fill:false
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        labels: {
                            // This more specific font property overrides the global property
                            fontColor: 'white'
                        }
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


        } else {
            console.log("Clear canvas");
            //Clear canvas
            try{
                this.chartStockDetails.destroy();
                window.scrollTo(500, 0);
                this._updateStock();
            }catch(e){
                console.log(e)
            }
        }
    }


    _updateStock() {
        if (!this.props.isLoading) {
            this.props.dispatch(updateSelectedStock(this.stockSource, this.stockSymbol));
        }
    }

    render() {

        return (
            <div className="evaluatz_stock_details">
                <SearchBar />
                <div className="d-flex flex-wrap justify-content-around bg-dark animated faster p-3 text-white">


                    <div className="w-100">
                        <div className="row justify-content-center">
                            {/* <div className="col-2 justify-content-center">

                                {this.props.selectedStock.historic ?
                                    this.props.selectedStock.historic.map(s =>
                                        <div className="row bg-secondary border rounded mb-2 justify-content-center">
                                            {s.date.slice(0, 10)} - {s.close}
                                        </div>
                                    ) :
                                    null}
                            </div> */}
                            <div className="col-9 justify-content-center">
                                <div className="row mb-3 pb-3">
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <h1>{this.stockSymbol}</h1>
                                        </div>
                                        <div className="row justify-content-center">
                                            <h4>{
                                                this.props.selectedStock.name ?
                                                    this.props.selectedStock.name :
                                                    null
                                            }</h4>
                                        </div>
                                        {this.props.isLoading ?
                                            <div className="row justify-content-center rounded shadow evaluatz_load_container_animation">
                                                <canvas id="chart_stock_details_load" height="350px" width="900px"></canvas>
                                            </div>
                                            :
                                            <div className="row justify-content-center p-3 rounded shadow stockDetails_container_chart">
                                                <canvas id="chart_stock_details" height="350px" width="900px"></canvas>
                                            </div>
                                        }

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
                                <div className="row mt-3 pt-3 d-flex justify-content-center overflow-y">
                                    {
                                        this.props.listAllStocks && this.props.listAllStocks.length > 0 ?
                                            this.props.listAllStocks.map((stock, i) =>
                                                <Link to={"/" + stock.alias + "/" + stock.symbol} >
                                                    <div className="stock_card_line  p-2 text-white mt-2 rounded ml-3 mr-3">
                                                        <div className="row">
                                                            {/* <div className="col-12 d-flex align-items-center justify-content-center">{stock.company_name}</div> */}
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6 display-4 ">{stock.symbol}</div>

                                                            <div className="col-6 ">
                                                                {/* <div className="searchBar_card_value">{formatMoney(stock.close * 100)}</div>
                                                                <div className={"badge " + (stock.dif >= 0 ? "badge-success" : "badge-danger")} >{formatMoney(stock.dif * 100)} ({stock.dif_perc} ) </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="row m-0 ">
                                                            <div className="searchBar_card_name col-12 d-flex align-items-center justify-content-center text-secondary">Source: {stock.source}</div>
                                                        </div>
                                                        <div className="row m-0">
                                                            <div className=" col-12 d-flex align-items-center justify-content-center"></div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                            :
                                            <div></div>
                                    }
                                </div>
                            </div>
                            {/* <div className="col-2 justify-content-center">
                                <div className="row justify-content-center">
                                    <div className="evaluatz-publicity m-1 rounded">
                                        BUY THAT!
                                        {this.props.isLoading ? "evaluatz_load_container_animation" : ""}
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedStock: state.stocks.selectedStock,
        listAllStocks: state.stocks.listAllStocks,
        isLoading: state.stocks.isLoading
    };
};

export default connect(mapStateToProps)(withCookies(StockDetails));
