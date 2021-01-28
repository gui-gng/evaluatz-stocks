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
        this.changeVision_30 = this.changeVision_30.bind(this);
        this.changeVision_all = this.changeVision_all.bind(this);
        this.changeVision_7 = this.changeVision_7.bind(this);
        this.updateChart = this.updateChart.bind(this);


        props.dispatch(updateSelectedStock(this.stockSource, this.stockSymbol));
        props.dispatch(updateStockList());

        this.state = {
            filter_chart:null,
            stock: {
                name: "...",
                acc: "...",
                acc_30: "...",
                acc_7: "...",
                source: "...",
        }, 
        
        
        }
        this.config = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Close',
                    data: [],
                    borderColor: 'RGB(200,100,20)',
                    pointRadius: 3,
                    borderWidth: 0,
                    fill: false,
                    pointStyle:'circle',
                    lineTension:0

                },
                {
                    label: 'Prediction',
                    data: [],
                    borderColor: 'RGB(100,100,20)',
                    pointRadius: 3,
                    borderWidth: 0,
                    fill: false,
                    pointStyle:'circle',
                    lineTension:0
                },
                {
                    label: 'Prediction2',
                    data: [],
                    borderColor: 'RGB(200,10,20)',
                    pointRadius: 3,
                    borderWidth: 0,
                    fill: false,
                    pointStyle:'circle',
                    lineTension:0
                }]
            },
            options: {
                responsive: true,
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
        };
        this.chartStockDetails = {};
    }

    componentWillReceiveProps() {

    }


    componentDidMount() {

        const c = document.getElementById('chart_stock_details');
        const ctx = c.getContext('2d');
        this.chartStockDetails = new Chart(ctx,this.config);
        // this.setState({
        //     chartStockDetails
        // });
    }

    componentDidUpdate() {
        this.stockSource = this.props.match.params.source;
        this.stockSymbol = this.props.match.params.symbol;
        this.updateChart();

        if (!this.props.isLoading && this.stockSymbol != this.props.selectedStock.symbol) {
            this.props.dispatch(updateSelectedStock(this.stockSource, this.stockSymbol));
        }
    }


    updateChart(){
        
        let historic = this.props.selectedStock.historic;
        if (!historic) {
            return;
        }
        if(this.state.filter_chart){
            historic = historic.slice(this.state.filter_chart)
        }
        this.chartStockDetails.config  = {
            type: 'line',
            data: {
                labels: historic.map(h => h.date),
                datasets: [{
                    label: 'Close',
                    data: historic.map(h => parseFloat(h.close) == 0 ? null : parseFloat(h.close)),
                    borderColor: 'RGB(200,100,20)',
                    pointRadius: this.state.filter_chart ? 3 : 0,
                    borderWidth: 0,
                    fill: false,
                    pointStyle:'circle',
                    lineTension:0

                },

                {
                    label: 'Prediction',
                    data: historic.map(h => parseFloat(h.pred_V) == 0 ? null : parseFloat(h.pred_v)),
                    borderColor: 'RGB(100,210,20)',
                    pointRadius: this.state.filter_chart ? 3 : 0,
                    borderWidth: 0,
                    fill: false,
                    pointStyle:'circle',
                    lineTension:0
                }]
            },
            options: {
                responsive: true,
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
        };
        this.chartStockDetails.update();
    }

    clearCanvas(){
        console.log("Clear canvas");
        //Clear canvas
        try {
            window.chart_stock_details.update();
            // this.chartStockDetails.destroy();
            // window.scrollTo(500, 0);
            // this._updateStock();
        } catch (e) {
            console.log(e)
        }
       
    }
    changeVision_all(){
        this.setState({
            filter_chart: null
        });
        // this.updateChart();
    }
    changeVision_30(){
    this.setState({
        filter_chart: -30
        });
        // this.updateChart();
    }
    changeVision_7(){
        this.setState({
            filter_chart: -7
            });
        // this.updateChart();
    }

    _updateStock() {
        if (!this.props.isLoading) {
            this.props.dispatch(updateSelectedStock(this.stockSource, this.stockSymbol));
            console.log("Update")
        console.log(this.props.selectedStock.name)
        this.setState({
           
    });
        }  
        
    }

    render() {
        let stock = {
            name: this.props.selectedStock.name,
            acc: this.props.selectedStock.acc,
            acc_30: this.props.selectedStock.acc_30,
            acc_7: this.props.selectedStock.acc_7,
            source: this.props.selectedStock.source,
    };
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
                                                stock.name ?
                                                stock.name :
                                                    "..."
                                            }</h4>
                                        </div>
                                        <div className="row justify-content-center mb-3">
                                            <div className={"col-3  p-2 "} onClick={this.changeVision_all}>
                                                <div className={"card evaluatz-dark " + (!this.state.filter_chart ? "selected" : "")} >
                                                    <div className="card-body">
                                                        <h5 className="card-title">Acc. Historic</h5>
                                                        <h2 className="card-text">{stock.acc ? parseFloat(stock.acc).toFixed(2) + "%" : "..."}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"col-3 p-2 "} onClick={this.changeVision_30}>
                                            <div className={"card evaluatz-dark "+ (this.state.filter_chart == -30 ? "selected" : "")} >
                                                    <div className="card-body">
                                                        <h5 className="card-title">Acc. 30 days</h5>
                                                        <h2 className="card-text">{stock.acc_30 ? parseFloat(stock.acc_30).toFixed(2) + "%" : "..."}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"col-3 p-2 "} onClick={this.changeVision_7}>
                                            <div className={"card evaluatz-dark " + (this.state.filter_chart == -7 ? "selected" : "")} >
                                                    <div className="card-body">
                                                        <h5 className="card-title">Acc. 7 days</h5>
                                                        <h2 className="card-text">{stock.acc_7 ? parseFloat(stock.acc_7).toFixed(2) + "%" : "..."}</h2>
                                                    </div>
                                                </div>
                                            </div>
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
                                                stock.source ?
                                                    stock.source :
                                                    null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3 pt-3 d-flex justify-content-center overflow-y">
                                    <div className="mb-3 d-flex justify-content-center">
                                    {
                                        this.props.listAllStocks && this.props.listAllStocks.length > 0 ?
                                            this.props.listAllStocks.slice(0, 3).map((stock, i) =>
                                            <div key={i.toString()}>
                                                <Link to={"/" + stock.alias + "/" + stock.symbol} >
                                                    <div className="stock_card_line  p-2 text-white mt-2 rounded ml-3 mr-3" >
                                                        <div className="row">
                                                            {/* <div className="col-12 d-flex align-items-center justify-content-center">{stock.company_name}</div> */}
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6 display-4 ">{stock.symbol}</div>

                                                            <div className="col-6 ">
                                                                <div className="searchBar_card_value">{parseFloat(stock.acc_7).toFixed(2) + "%"}</div>
                                                                <div className={"badge " + (stock.acc >= 0.9 ? "badge-success" : "badge-danger")} >{parseFloat(stock.acc).toFixed(2) + "%"} </div>
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
                                                </div>
                                            )
                                            :
                                            <div></div>
                                    }
                                    </div>
                                    {this.props.listAllStocks && this.props.listAllStocks.length > 0 ?
                                    <table className="table table-dark">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Symbol</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Acc.</th>
                                                <th scope="col">Acc.30 Days</th>
                                                <th scope="col">Acc.7 Days</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                
                                                    this.props.listAllStocks.map((stock, i) =>
                                                        <tr key={i.toString()}>
                                                            <th scope="row">{i}</th>
                                                            <td> <Link to={"/" + stock.alias + "/" + stock.symbol} >{stock.symbol} </Link></td>
                                                            <td>{stock.name}</td>
                                                            <td>{parseFloat(stock.acc).toFixed(2) + "%"}</td>
                                                            <td>{parseFloat(stock.acc_30).toFixed(2) + "%"}</td>
                                                            <td>{parseFloat(stock.acc_7).toFixed(2) + "%"}</td>
                                                        </tr>
                                                    )
                                                    
                                            }
                                        </tbody>
                                    </table>
                                    :
                                                    <div>Loading...</div>
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
