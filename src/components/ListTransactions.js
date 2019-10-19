import React from 'react';

class ListTransactions extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
    
    }

    componentDidUpdate() {

    }
    render() {
        return (
            <div className="evaluatz_list_transactions">
            <table class="table table-dark mb-0 rounded">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Project</th>
                        <th scope="col">Value</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.transactions.map((transaction, i) =>
                        <tr>
                            <th scope="row">{transaction.timestamp}</th>
                            <td>{transaction.project}</td>
                            <td>{transaction.value}</td>
                            <td>{transaction.balance}</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
            );
    }
}


export default ListTransactions;