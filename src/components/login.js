import React from 'react';
import './login.css';
import $ from 'jquery';
import { connect } from 'react-redux';

import { toggleIsShowLogin } from '../actions/navigation';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.isReg = true;
        // this.url = "http://api.evaluatz.com";
        this.url = "https://evaluatz-api.herokuapp.com";
    }

    componentDidMount() {
        $('.login-info-box').fadeOut();
        $('.login-show').addClass('show-log-panel');
        this.isReg = true;
    }

    changeValue = () => {
        if (this.isReg) {
            $('.register-info-box').fadeOut();
            $('.login-info-box').fadeIn();

            $('.white-panel').addClass('right-log');
            $('.register-show').addClass('show-log-panel');
            $('.login-show').removeClass('show-log-panel');
        }
        else {

            $('.register-info-box').fadeIn();
            $('.login-info-box').fadeOut();

            $('.white-panel').removeClass('right-log');

            $('.login-show').addClass('show-log-panel');
            $('.register-show').removeClass('show-log-panel');
        }
        this.isReg = !this.isReg;
    }

    doLogin = () => {
        let email = $('#login_email').val();
        let password = $('#login_password').val();
        let urlLogin = `${this.url}/auth/classic?username=${email}&password=${password}`;

        $("#login_btn").prop('disabled', true);
        $(".evaluatz_mask_load").removeClass("hidden");

        $.ajax({
            url: urlLogin, success: function (result) {
                let { username } = result.user;
                window.location.href = "/profile/" + username;
                $("#login_btn").prop('disabled', false);
            }
        });
    }

    doRegister = () => {
        let email = $('#register-show-email').val();
        let password = $('#register-show-password').val();
        let password2 = $('#register-show-checkpassword').val();
        alert("Register");
    }

    closeLogin = () => {
        $('.login-mask').removeClass('hiden');
        this.props.dispatch(toggleIsShowLogin());
    }

    render() {
        return (
            <div className="login-mask" >
                <div className="login-mask-close" onClick={this.closeLogin}>
                    <div>X</div>
                </div>
                <div className="evaluatz_login_container">
                    <img alt="" src="/logo.png"></img>
                    <div className="evaluatz_login_inner_container text-white" >
                        <div className="form-group">
                            <input type="email" className="form-control" id="login_email" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="login_password" placeholder="Password" />
                        </div>

                        <button type="submit" id="login_btn" className="btn btn-secondary evaluatz_login_submit" onClick={this.doLogin}>Login</button>

                        <div className="evaluatz_login_social_container">
                            <a href="#" className="evaluatz_login_social_container_item text-white evaluatz_btn-facebook" data-toggle="tooltip" data-placement="top" title="Facebook">
                                <i className="fa fa-facebook fa-2x"></i>
                                <span className="hidden-xs"></span>
                            </a>
                            <a href={this.url + "/auth/getGoogleAuthLink"} className="evaluatz_login_social_container_item text-white evaluatz_btn-google-plus" data-toggle="tooltip" data-placement="top" title="Google Plus">
                                <i className="fa fa-google-plus fa-2x"></i>
                                <span className="hidden-xs"></span>
                            </a>
                            <a href="#" className="evaluatz_login_social_container_item text-white evaluatz_btn-github" data-toggle="tooltip" data-placement="top" title="GitHub">
                                <i className="fa fa-github fa-2x"></i>
                                <span className="hidden-xs"></span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isShowLogin: state.navigation.isShowLogin
    };
};

export default connect(mapStateToProps)(Login);