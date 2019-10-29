import React from 'react';
import './css/profile.css';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';

import {formatMoney} from '../Auxiliar';

import SearchBar from '../components/stock/searchBar';

class Stock extends React.Component {

  constructor(props) {
    super(props);
 
    this.stockSymbol = props.match.params.symbol;
    console.log(this.stockSymbol);
  }

  render() {
    return (
      <div className="evaluatz_stock_details">
        <SearchBar />
        <div className="d-flex flex-wrap justify-content-around bg-dark animated faster p-3 text-white">

          <h1>{this.stockSymbol}</h1>
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
