import React from 'react';
import './css/profile.css';
import { Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { connect } from 'react-redux';

import request from 'request';

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
    let symbol = "AAPL";
    request({
        method: 'get',
        url: 'https://sandbox.tradier.com/v1/markets/history',
        qs: {
           'symbol': symbol,
           'interval': 'daily',
           'start': '2019-05-04',
           'end': '2019-05-04'
        },
        headers: {
          'Authorization': 'Bearer G88KrETUzZ5i9GZhpiVxkoUFTup8',
          'Accept': 'application/json'
        }
      }, (error, response, body) => {
          console.log(response.statusCode);
          console.log(body);
      });
  }
    render() {
        if (this.props.cookies.get('token')) {
            return (
                <div className="evaluatz_profile">
                    <div className="">
                        <h1 onClick={this.getStock}>{this.symbol}</h1>
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
