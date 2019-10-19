import React from 'react';

import { connect } from 'react-redux';

import ListProjects from './ListProjects';

import $ from 'jquery';

//Components
import Chart from '../components/chartSample';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.balance = props.user.balance;
        this.balanceFormat = this.formatMoney(props.user.balance);
    }

    componentDidMount() {
        this.balanceFormat = this.formatMoney(this.balance);
    }

    componentDidUpdate() {
        this.balanceFormat = this.formatMoney(this.balance);

    }

    animateBalance() {

    }


    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            amount = amount / 100;
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";
            const currency = "$";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + currency + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="evaluatz_dashboard h-100 m-1 rounded-lg d-flex flex-column align-items-center d-flex justify-content-around">
                <h1 className="display-2 text-light shadow-sm p-3 rounded evaluatz-green-bg">
                    {this.balanceFormat}
                </h1>
                <div className="w-100 p-3">
                    <ListProjects projects={this.props.user.projects} />
                </div>
            </div>);
    }
}




// export default Header;

const mapStateToProps = (state) => {
    const projects = [{
        name: "Pj On",
        profit: "0.1",
        balance: "5000"
    }];
    return {
        user: { ...state.user, balance: 5000000, projects }
    };
};

export default connect(mapStateToProps)(Dashboard);

