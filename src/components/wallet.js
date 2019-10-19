import React from 'react';
import { connect } from 'react-redux';

import ListTransactions from './ListTransactions';


class Wallet extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
    render() {
        return (
            <div className="evaluatz_index_wallet">
                <ListTransactions transactions={this.props.user.transactions} />
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    const transactions = [{
        timestamp: "2019-01-01 10:00:20",
        project: "Pj On",
        value: "100",
        balance: "3000"
    },
    {
        timestamp: "2019-01-01 10:12:23",
        project: "Pj On",
        value: "100",
        balance: "2900"
    },
    {
        timestamp: "2019-01-01 10:15:25",
        project: "Pj On",
        value: "100",
        balance: "2800"
    }];
    return {
        user: { ...state.user, balance: 5000000, transactions }
    };
};

export default connect(mapStateToProps)(Wallet);

