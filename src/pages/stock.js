import React from 'react';
import './css/profile.css';
import { Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { connect } from 'react-redux';

import request from 'request';
import $ from 'jquery';

class Stock extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        console.log("STOCK");
        console.log(props);
        const { cookies } = props;  
        this.symbol = props.match.params.symbol;
        
    }

  getStock(){
      console.log("GetStock")
    let symbol = "AAPL";
    request({
        method: 'get',
        url: 'https://sandbox.tradier.com/v1/markets/history',
        qs: {
           'symbol': symbol,
           'interval': 'daily',
           'start': '2018-05-04',
           'end': '2019-05-04'
        },
        headers: {
          'Authorization': 'Bearer eOkJXLeAAMXUAxUprOd96TXdZsJP',
          'Accept': 'application/json'
        }
      }, (error, response, body) => {
          let r = JSON.parse(body);
          r.history.day.forEach((d) => {
            $(".evaluatz_stock_value_tbl").append(d.date + " - " + d.close + "<br>");
          });
      });
  }
    render() {
        if (this.props.cookies.get('token')) {
            return (
                <div className="evaluatz_stock">
                    <div className="">
                        <h1 onClick={this.getStock}>{this.symbol}</h1>
                        <div className="evaluatz_stock_value_tbl">
                            
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to='/' />
        }

    }
}
const mapStateToProps = (state) => {
    return {
      isShowLogin: state.navigation.isShowLogin,
      user: state.user
    };
  };
  
  export default connect(mapStateToProps)(withCookies(Stock));
