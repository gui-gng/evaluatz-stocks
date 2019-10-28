import React from 'react';
import './css/profile.css';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';


import SearchBar from '../components/stock/searchBar';

class Stock extends React.Component {

    constructor(props) {
        super(props);
        console.log("STOCK");
        console.log(props);
    }


  
    render() {
            return (
                <div className="evaluatz_stock">
                  <SearchBar />

                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
      isShowLogin: state.navigation.isShowLogin,
      user: state.user
    };
  };
  
  export default connect(mapStateToProps)(withCookies(Stock));
