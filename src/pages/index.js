import React from 'react';
import './css/index.css';

import { connect } from 'react-redux';
//Components
import Chart from '../components/chartSample';

import Discover from '../components/discover';
import Dashboard from '../components/dashboard';
import Wallet from '../components/wallet';

const pageInfo = (
    <div className="evaluatz_index container shadow-lg mt-2">
        <div className="evaluatz_index_container jumbotron jumbotron-fluid bg-secondary text-white pt-3 pb-3 mb-0 ">
            <h1 className="display-4">Find your forecast for the stocks</h1>
            <p className="lead">Develop your own way to predict the future values for the stocks</p>
            <Chart />
        </div>
    </div>

);

const pageDashboard = (
    <div>
        <div className="evaluatz_menu ">
            <ul className="list-group list-group-flush">
                <li className="list-group-item" >Dashboard</li>
                <li className="list-group-item" >Wallet</li>
                <li className="list-group-item" >Discover</li>
            </ul>
        </div>
        <div className="evaluatz_menu_content">
            {}
            {/* <Dashboard />
            <Discover />
            <Wallet /> */}
        </div>
    </div>
);



class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return this.props.isAuthed ? pageDashboard : pageInfo;
    }
}

// export default Header;

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
        user: state.user
    };
};

export default connect(mapStateToProps)(Index);

