import React from 'react';
import './UserInfo.css';

import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';

import { instanceOf } from 'prop-types';

//Actions
import { toggleIsShowUserInfo } from '../../actions/navigation';
import { clearUser } from '../../actions/user';


class UserInfo extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.cookies = cookies;
        this.Logout = this.Logout.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }


    Logout() {
        console.log("Logout");
        this.cookies.remove("token", { path: '/' });
        this.props.dispatch(toggleIsShowUserInfo());
        this.props.dispatch(clearUser());
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

export default connect(mapStateToProps)(withCookies(UserInfo));