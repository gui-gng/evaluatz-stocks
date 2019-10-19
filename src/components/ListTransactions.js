import React from 'react';
import { connect } from 'react-redux';

import { formatMoney } from '../Auxiliar';

import { getTransactions } from '../actions/user'


class ListTransactions extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getTransactions(this.props.token));
    }

    componentDidUpdate() {

    }
    render() {
        return (
            <div className="evaluatz_list_transactions p-3">
                <table class="table table-hover table-dark mb-0  rounded">
                    <thead>
                        <tr>
                            <th scope="col">Project</th>
                            <th scope="col">Value</th>
                            <th scope="col">Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props.transactions.map((transaction, i) =>
                            <tr>
                                <th scope="row">{transaction.project_name}</th>

                                <td>{formatMoney(transaction.value)}</td>
                                <td>{transaction.timestamp}</td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        transactions: state.user.transactions,
        token: state.user.token
    };
};

export default connect(mapStateToProps)(ListTransactions);