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

    closeLogin = () => {
        $('.login-mask').removeClass('hiden');
        this.props.dispatch(toggleIsShowLogin());
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
                window.location.href = "/Auth/" + result;
                $("#login_btn").prop('disabled', false);
            }
        });
    }

    doRegister = () => {
        let isFieldsOk = true;

        let firstname = $("#register_firstname").val();
        let lastname = $("#register_lastname").val();
        let username = $("#register_username").val();
        let email = $('#register_email').val();
        let password = $('#register_password').val();
        let password2 = $('#register_password_c').val();


        isFieldsOk =
            this.validateField("#register_firstname", firstname, ["isRequired"]) &
            this.validateField("#register_username", username, ["isRequired"]) &
            this.validateField("#register_email", email, ["isRequired", "isEmail"]) &
            this.validateField("#register_password", password, ["isRequired"]) &
            this.validateField("#register_password_c", password2, ["isRequired"])
            ;

        if (isFieldsOk) {
            $("#register_btn").prop('disabled', true);
            $(".evaluatz_mask_load").removeClass("hidden");
            let urlRegister = `${this.url}/signup/classic?firstname=${firstname}&lastname=${lastname}&username=${username}&email=${email}&password=${password}`;
            $.ajax(urlRegister)
                .done(function (result) {
                    try{
                        alert(result);
                        let { username } = result.user;
                        window.location.href = "/profile/" + username;
                    }catch(error){
                        alert(error);
                    }
                })
                .fail(function (data) {
                    // alert(JSON.stringify(data) );
                    alert(data.statusText);
                })
                .always(function () {
                    $(".evaluatz_mask_load").addClass("hidden");
                    $("#register_btn").prop('disabled', false);
                });
        }
    }

    validateField(fieldName, value, methods) {
        for (let i = 0; i < methods.length; i++) {
            let error = eval("this." + methods[i] + "(value)");
            if (error) {
                $(fieldName).addClass("evaluatz_input_error");
                $(fieldName + "_error").removeClass("d-none");
                $(fieldName + "_error").html(error);
                return false;
            }
        }
        $(fieldName).removeClass("evaluatz_input_error");
        $(fieldName + "_error").addClass("d-none");
        return true;
    }

    isRequired(value) {
        if (value.length > 0) {
            return "";
        } else {
            return "Value is required";
        }
    }

    isEmail(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return "";
        } else {
            return "Invalid email address";
        }

    };


    render() {
        return (
            <div className="login-mask" >

                <div className="login-mask-close" onClick={this.closeLogin}>
                    <div>X</div>
                </div>
                <div className="evaluatz_login_container">
                    <img alt="" src="/logo.png"></img>
                    <div className="evaluatz_login_inner_container text-white" >


                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-login" role="tab" aria-controls="nav-login" aria-selected="true">Login</a>
                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-register" role="tab" aria-controls="nav-register" aria-selected="false">Register</a>
                        </div>

                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="evaluatz_form_login">
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="login_email" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="login_password" placeholder="Password" />
                                    </div>
                                    <button type="submit" id="login_btn" className="btn btn-secondary evaluatz_login_submit" onClick={this.doLogin}>Login</button>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-register" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <div className="evaluatz_form_register ">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="register_firstname" aria-describedby="emailHelp" placeholder="First name" data-toggle="tooltip" data-placement="right" title="Tooltip on right" />
                                        <small id="register_firstname_error" className="evaluatz_error_text d-none"></small>

                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="register_lastname" aria-describedby="emailHelp" placeholder="Last name" />
                                        <small id="register_lastname_error" className="evaluatz_error_text d-none"></small>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="register_email" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <small id="register_email_error" className="evaluatz_error_text d-none"></small>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="register_username" aria-describedby="emailHelp" placeholder="Username" />
                                        <small id="register_username_error" className="evaluatz_error_text d-none"></small>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="register_password" placeholder="Password" />
                                        <small id="register_password_error" className="evaluatz_error_text d-none"></small>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="register_password_c" placeholder="Confirm Password" />
                                        <small id="register_password_c_error" className="evaluatz_error_text d-none"></small>
                                    </div>
                                    <button type="submit" id="register_btn" className="btn btn-secondary evaluatz_login_submit" onClick={this.doRegister}>Register</button>
                                </div>
                            </div>
                        </div>

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