import React from 'react';
import '../css/index.css'


import { connect } from 'react-redux';

import $ from 'jquery';

//Components
import { setIndexSubpage } from '../../actions/navigation';
import Load_FullScreen from '../../components/00-General/Load_FullScreen';

// import Discover from './discover';
// import Dashboard from './dashboard';
// import Wallet from './wallet';

const Discover = React.lazy(() => import('../../components/Index/discover'));
const Dashboard = React.lazy(() => import('../../components/Index/dashboard'));
const Wallet = React.lazy(() => import('../../components/Index/wallet'));


class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    getSubPage() {
        let element = {};
        switch (this.subpage) {
            case "Dashboard":
                element = <Dashboard />
                break;
            case "Discover":
                element = <Discover />
                break;
            case "Wallet":
                element = <Wallet />
                break;
            default:
                element = <Dashboard />
                break;
        }
        return <React.Suspense fallback={<Load_FullScreen />}>
            {element}
        </React.Suspense>
    }


    navSubPage(e) {
        this.subpage = e.target.getAttribute("showPage");
        this.props.dispatch(setIndexSubpage(this.subpage));
    }


    componentDidMount() {

    }

    componentDidUpdate() {
        this.subpage = this.props.navigation.index_subpage;

        //UPDATE ACTIVE CLASS
        $(".evaluatz_menu .list-group-item").removeClass("active");
        let filter_selector = `[showPage='${this.subpage}']`;
        if ($(".evaluatz_menu .list-group-item").length > 0) {
            $(".evaluatz_menu .list-group-item").filter(filter_selector).addClass("active");
        }
    }

    render() {
        return (
            <div>
                {this.props.navigation.isShowMenu ?
                    <div className="evaluatz_menu fadeInLeft animated faster">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" onClick={this.navSubPage.bind(this)} showPage="Dashboard" >Dashboard</li>
                            <li className="list-group-item" onClick={this.navSubPage.bind(this)} showPage="Wallet">Wallet</li>
                            <li className="list-group-item" onClick={this.navSubPage.bind(this)} showPage="Discover">Discover</li>
                        </ul>
                    </div>
                    :
                    null
                }

                <div className="evaluatz_index_content bg-dark">

                    {this.getSubPage()}
                    <React.Suspense />
                </div>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
        user: state.user
    };
};

export default connect(mapStateToProps)(Index);

