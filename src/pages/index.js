import React from 'react';
import './css/index.css';

import { connect } from 'react-redux';

import $ from 'jquery';

//Components
import Chart from '../components/chartSample';
import ChartIndex from '../components/ChartIndex';

import { setIndexSubpage } from '../actions/navigation';

import Discover from '../components/discover';
import Dashboard from '../components/dashboard';
import Wallet from '../components/wallet';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    pageInfo() {
        return (
            <div className="evaluatz_index container shadow-lg mt-2">
                <div className="evaluatz_index_container jumbotron jumbotron-fluid bg-secondary text-white pt-3 pb-3 mb-0 ">
                    <h1 className="display-4">Find your forecast for the stocks</h1>
                    <p className="lead">Develop your own way to predict the future values for the stocks</p>
                    <Chart />
                    {/* <ChartIndex /> */}
                </div>
            </div>
        );
    }

    pageDashboard() {
        return (
            <div>
                {this.props.navigation.isShowMenu ?
                    <div className="evaluatz_menu fadeInLeft animated faster">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item active" onClick={this.navSubPage.bind(this)} showPage="Dashboard" >Dashboard</li>
                            <li className="list-group-item" onClick={this.navSubPage.bind(this)} showPage="Wallet">Wallet</li>
                            <li className="list-group-item" onClick={this.navSubPage.bind(this)} showPage="Discover">Discover</li>
                        </ul>
                    </div>
                    :
                    null
                }

                <div className="evaluatz_index_content bg-dark">
                    {this.getSubPage()}
                </div>
            </div>
        );
    }

    getSubPage() {
        switch (this.subpage) {
            case "Dashboard":
                return <Dashboard />;
            case "Discover":
                return <Discover />;
            case "Wallet":
                return <Wallet />;
            default:
                return <Dashboard />;
        }
    }


    navSubPage(e) {
        this.subpage = e.target.getAttribute("showPage");
        this.props.dispatch(setIndexSubpage(this.subpage));
        $(".evaluatz_menu .list-group-item").removeClass("active");
        e.target.classList.add("active");
    }


    componentDidMount() {

    }

    componentDidUpdate() {
        this.subpage = this.props.navigation.index_subpage;
    }

    render() {
        return this.props.user.isLogged ? this.pageDashboard() : this.pageInfo();
    }
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
        user: state.user
    };
};

export default connect(mapStateToProps)(Index);

