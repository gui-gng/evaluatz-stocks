import React from 'react';
import { connect } from 'react-redux';

import './ListTransactions.css';

import { formatMoney } from '../Auxiliar';

import { getTransactions } from '../actions/user'
import { done } from '../actions/navigation'

class ListTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.isLoading = true;
        this.currentPage = 1;
        this.linesPerPage = 10;
        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getTransactions(this.props.token, this.currentPage, this.linesPerPage));
    }

    componentDidUpdate() {
        console.log(this.currentPage);
    }

    next() {
        this.currentPage++;
        this.props.dispatch(getTransactions(this.props.token, this.currentPage, this.linesPerPage));
    }

    back() {
        this.currentPage--;
        this.props.dispatch(getTransactions(this.props.token, this.currentPage, this.linesPerPage));
    }



    render() {
        return (
            <div className="evaluatz_list_transactions d-flex flex-column p-3 text-white">
                <div className="d-flex border-bottom">
                    <div className="col-4 p-3">Project</div>
                    <div className="col-4 p-3">Value</div>
                    <div className="col-4 p-3">Date</div>
                </div>
                <div className="evaluatz_list_transactions_content container overflow-auto">
                    {this.props.isLoadingTransactions ?
                        <div className="w-100 h-100 d-flex align-items-center justify-content-around ">
                            <i className="fas fa-7x rotateDiv bg-load fa-asterisk text-dark"></i>
                            {/* <img alt="" className="rotateDiv" src="/logoEv.png"></img> */}
                        </div>
                        :
                        this.props.transactions
                            .map((transaction, i) =>
                                <div className="row border-bottom border-secondary">
                                    <div className="col-4 p-3">{transaction.project_name}</div>
                                    <div className="col-4 p-3">{formatMoney(transaction.value)}</div>
                                    <div className="col-4 p-3">{transaction.timestamp}</div>
                                </div>
                            )
                    }
                </div>
                {/* <table class="table table-hover table-dark mb-0  rounded">
                    <thead>
                        <tr>
                            <th scope="col">Project</th>
                            <th scope="col">Value</th>
                            <th scope="col">Date</th>

                        </tr>
                    </thead>
                    <tbody className="d-flex h-10">

                        {this.props.isLoadingTransactions ?
                            <div className="w-100"><i className="fas fa-asterisk"></i></div>
                            :
                            this.props.transactions
                                .map((transaction, i) =>
                                    <tr>
                                        <th scope="row">{transaction.project_name}</th>
                                        <td>{formatMoney(transaction.value)}</td>
                                        <td>{transaction.timestamp}</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table> */}
                <div className="d-flex w-100  justify-content-around text-white" >
                    <div onClick={this.back}><i className="fas fa-chevron-left"></i></div>
                    <div >{this.currentPage}</div>
                    <div onClick={this.next}><i className="fas fa-chevron-right"></i></div>
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {

        transactions: state.user.transactions,
        isLoadingTransactions: state.user.isLoadingTransactions,
        token: state.user.token
    };
};

export default connect(mapStateToProps)(ListTransactions);