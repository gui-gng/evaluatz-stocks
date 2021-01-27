import React from 'react';
import { Link } from "react-router-dom";
import './css/profile.css';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';

import {formatMoney} from '../Auxiliar';

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
    console.log(this.props.stocks.listAllStocks)
    return (
      <div className="evaluatz_stock">
        <SearchBar />
        <div className="d-flex flex-wrap justify-content-around bg-dark animated faster p-3">

          { 
            
            this.props.stocks.listAllStocks && this.props.stocks.listAllStocks.length > 0 ?
              this.props.stocks.listAllStocks.map((stock, i) =>
                <Link to={"/" + stock.alias + "/" + stock.symbol} >
                  <div className="stock_card_line p-2 text-white mt-2 rounded ml-3 mr-3">
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isShowLogin: state.navigation.isShowLogin,
    user: state.user,
    stocks: state.stocks
  };
};

export default connect(mapStateToProps)(withCookies(Stock));
