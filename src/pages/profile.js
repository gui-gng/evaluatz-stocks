import React from 'react';
import './css/profile.css';
import { Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';


class Profile extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        console.log(props);
        const { cookies } = props;

        this.state = {
            name: cookies.get('token') || 'Anonymous'
        };
    }

    haveToken() {
        console.log()
    }
    render() {
        if (this.props.cookies.get('token')) {
            this.haveToken();
            return (

                <div className="evaluatz_profile">
                    <div className="">
                        <h1>{this.props.match.params.username}</h1>

                    </div>
                </div>
            )
        } else {
            return <Redirect to='/' />
        }

    }
}
export default withCookies(Profile);
