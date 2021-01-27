import React from 'react';
import './searchBar.css';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import $ from 'jquery';
import { filter, updateStockList } from '../../actions/stocks';
import Chart from 'chart.js';
import Card from './card';
import { Link } from "react-router-dom";


class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.stocksSearch = [{ symbol: "" }];
        this.isFocused = this.isFocused.bind(this);
        this.notFocused = this.notFocused.bind(this);
        this.search = this.search.bind(this);
        // props.dispatch(update());
        props.dispatch(updateStockList());
        
    }

    componentDidUpdate() {

    }

  
    isFocused() {
       
        $('.evaluatz-search-wrapper').addClass('onSearch');
        $('.evaluatz-search-wrapper').addClass('fadeIn');

        $('.evaluatz-search-results ').removeClass('d-none');
        $('.evaluatz-search-results ').addClass('d-flex');
    }

    notFocused() {
       
        $('#evaluatz-search-value').val("");

        $('.evaluatz-search-wrapper').removeClass('onSearch');
        $('.evaluatz-search-wrapper').removeClass('fadeIn');
        setTimeout(() => {
            $('.evaluatz-search-results ').addClass('d-none');
            $('.evaluatz-search-results ').removeClass('d-flex');
        }, 500);
      
    }


    search(e) {

        this.props.dispatch(filter(e.target.value));
    }

    render() {

        return (
            <div className="evaluatz-search-wrapper bg-dark animated faster p-3">
                <div className="row">
                    <div className="col-2">
                    {/* <a href="https://stocks.evaluatz.com"> */}
                    <Link to={"/"} >
                    <img height="50px"  width="50px"  alt="" src="/logoEv.png"></img>
                    </Link>
                    {/* </a> */}
                    </div>
                <input id="evaluatz-search-value" onChange={this.search} onBlur={this.notFocused} onFocus={this.isFocused} type="text" className="form-control col-9" placeholder="Search stocks..." aria-label="Search Stocks" />
                
                </div>
                <div className="evaluatz-search-results d-flex flex-wrap justify-content-around w-100 h-100 pt-3 overflow-auto">
                    {
                        this.props.stocks.filtered && this.props.stocks.filtered.length > 0 ?
                            this.props.stocks.filtered.map((stock, i) =>
                                <div>
                                <Card card_order={i} />
                                </div>
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
        stocks: state.stocks
    };
};

export default connect(mapStateToProps)(withCookies(SearchBar));
