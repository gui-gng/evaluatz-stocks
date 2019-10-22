import React from 'react';
import { connect } from 'react-redux';

import ListTransactions from './ListTransactions';

import {formatMoney} from '../Auxiliar';

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.transactions = [];
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {

        
    }

    render() {
        return (
            <div className="evaluatz_index_wallet">
              <h1 className="evaluatz-text-xxlarge text-light shadow-sm p-3 rounded ">
                    {formatMoney(this.props.user.balance)}
                </h1>
                <ListTransactions />
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Wallet);

