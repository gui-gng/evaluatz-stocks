import React from 'react';
import './UserInfo.css';

import { connect } from 'react-redux';

//Actions
import { toggleIsShowLogin } from '../actions/navigation';

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
    }



    componentDidMount() {

    }

    componentDidUpdate() {

    }


    Logout() {
        console.log("Logout");
    }
    render() {
        return (
            <div className="evaluatz_userinfo bounceInRight animated">
                <ul >
                    <li >Settings</li>
                    <li onClick={this.Logout}>Logout</li>
                </ul>

            </div>
        );
    }
}

// export default Header;

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
        user: state.user
    };
};

export default connect(mapStateToProps)(UserInfo);