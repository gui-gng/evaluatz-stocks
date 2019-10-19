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
    }

    componentDidMount() {
        this.balanceFormat = formatMoney(this.balance);
    }

    componentDidUpdate() {
        this.balanceFormat = formatMoney(this.balance);

    }

    animateBalance() {

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
        user: { ...state.user, projects }
    };
};

export default connect(mapStateToProps)(Dashboard);

