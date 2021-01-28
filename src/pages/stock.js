import React from 'react';
import { Link } from "react-router-dom";
import './css/stock.css';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';

import { formatMoney } from '../Auxiliar';

import SearchBar from '../components/stock/searchBar';
import { updateStockList } from '../actions/stocks';

class Stock extends React.Component {

  constructor(props) {
    super(props);
    console.log("STOCK_1");
    console.log(props);
    // this._updateStock = this._updateStock.bind(this);

    props.dispatch(updateStockList());
  }

  render() {

    return (
      <div className="evaluatz_stock">
        <SearchBar />
        <div className="container bg-dark animated faster p-3">
        <div className="row" >
          <div className="col p-3 div_table" >
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
                  this.props.listAllStocks && this.props.listAllStocks.length > 0 ?
                    this.props.listAllStocks.map((stock, i) =>
                      <tr>
                        <th scope="row">{i}</th>
                        <td> <Link className="text-light" to={"/" + stock.alias + "/" + stock.symbol} >{stock.symbol} </Link></td>
                        <td>{stock.name}</td>
                        <td>{parseFloat(stock.acc).toFixed(2) + "%"}</td>
                        <td>{parseFloat(stock.acc_30).toFixed(2) + "%"}</td>
                        <td>{parseFloat(stock.acc_7).toFixed(2) + "%"}</td>
                      </tr>
                    )
                    :
                    <tr></tr>
                }
              </tbody>
            </table>
          </div>
          <div className="col d-flex flex-wrap justify-content-around bg-dark animated faster p-3">
            {
              this.props.listAllStocks && this.props.listAllStocks.length > 0 ?
                this.props.listAllStocks.slice(0,5).map((stock, i) =>
                  <Link to={"/" + stock.alias + "/" + stock.symbol} >
                    <div className="stock_card_line  p-2 text-white mt-2 rounded ml-3 mr-3">
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
                )
                :
                <div></div>
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
    isShowLogin: state.navigation.isShowLogin,
    user: state.user,
    listAllStocks: state.stocks.listAllStocks
  };
};

export default connect(mapStateToProps)(withCookies(Stock));
