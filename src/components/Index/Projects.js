import React from 'react';
import { connect } from 'react-redux';

import ListTransactions from '../Tables/ListTransactions';

import {formatMoney} from '../../Auxiliar';

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
            <div className="evaluatz_index_projects">
             
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

