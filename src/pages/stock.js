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
         
        this.symbol = props.match.params.symbol;
    }


  
    render() {
        if (this.props.cookies.get('token')) {
            return (
                <div className="evaluatz_stock">
                    <div className="">
                        <h1 >{this.symbol}</h1>
                        <div className="evaluatz_stock_value_tbl">
                            
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="evaluatz_stock">
                    <div className="">
                        <h1 >{this.symbol}</h1>
                        <div className="evaluatz_stock_value_tbl">
                            
                        </div>
                    </div>
                </div>
            )
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
