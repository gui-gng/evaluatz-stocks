import React from 'react';
import './searchBar.css';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import $ from 'jquery';
import { filter } from '../../actions/stocks';
import Chart from 'chart.js';

import Card from './card';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.stocksSearch = [{ symbol: "" }];
        this.isFocused = this.isFocused.bind(this);
        this.notFocused = this.notFocused.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidUpdate() {

    }

    testChart() {
        var ctx = document.getElementById('miniChart_ASX').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    isFocused() {
        console.log("Focused");

        $('.evaluatz-search-wrapper').addClass('onSearch');
        $('.evaluatz-search-wrapper').addClass('fadeIn');

        $('.evaluatz-search-results ').removeClass('d-none');
        $('.evaluatz-search-results ').addClass('d-flex');
    }

    notFocused() {
        console.log("NOT Focused");
        $('#evaluatz-search-value').val("");

        $('.evaluatz-search-wrapper').removeClass('onSearch');
        $('.evaluatz-search-wrapper').removeClass('fadeIn');

        $('.evaluatz-search-results ').addClass('d-none');
        $('.evaluatz-search-results ').removeClass('d-flex');
    }


    search(e) {
        console.log(e.target.value)

        this.props.dispatch(filter(e.target.value));
    }

    render() {

        return (
            <div className="evaluatz-search-wrapper bg-dark animated faster p-3">

                <input id="evaluatz-search-value" onChange={this.search} onBlur={this.notFocused} onFocus={this.isFocused} type="text" className="form-control" placeholder="Search stocks..." aria-label="Search Stocks" />
                <div className="evaluatz-search-results d-flex flex-wrap justify-content-around w-100 h-100 pt-3 overflow-auto">
                    {
                        this.props.stocks.filtered && this.props.stocks.filtered.length > 0 ?
                            this.props.stocks.filtered.map(stock =>
                                <Card stock={stock} />
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
