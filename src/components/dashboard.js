import React from 'react';

import { connect } from 'react-redux';

import ListProjects from './ListProjects';

import {formatMoney} from '../Auxiliar';

import $ from 'jquery';

//Components
import Chart from '../components/chartSample';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.balance = props.user.balance;
        this.balanceFormat = formatMoney(props.user.balance);

        this.animateNumber = this.animateNumber.bind(this);
    }

    componentDidMount() {
        this.balanceFormat = formatMoney(this.balance);
    }

    componentDidUpdate() {
        // this.balanceFormat = formatMoney(this.balance);
        this.animateNumber(document.getElementById("evaluatz-index-dashboard-balance"), this.balance, 1000);
    }

    animateNumber(element, num, time) {
        var showNum = 0;
        var steps = time / 50;
        var partsNumber = num / steps;
        element.innerHTML = formatMoney(showNum);

        for (var i = 0; i < steps; i++) {
            setTimeout(() => {
                showNum += partsNumber;
                element.innerHTML = formatMoney(showNum);
            }, i * 50);
        }

        setTimeout(() => {
            element.innerHTML = formatMoney(num);
        }, time);
    }

    render() {
        return (
            <div className="evaluatz_dashboard h-100 m-1 rounded-lg d-flex flex-column align-items-center justify-content-around">
                <h1 className="display-2 text-light shadow-sm p-3 rounded evaluatz-green-bg">
                   <div id="evaluatz-index-dashboard-balance">
                    {this.balanceFormat}
                   </div> 
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
        user: { ...state.user, projects }
    };
};

export default connect(mapStateToProps)(Dashboard);

