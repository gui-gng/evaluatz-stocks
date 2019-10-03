import React from 'react';
import './login.css';
import $ from 'jquery';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.isReg = true;
        this.url = "https://evaluatz-api.herokuapp.com";
        // this.url = "http://localhost:5000";
        $('.login-mask').addClass('hiden');
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
        let email = $('#login-show-email').val();
        let password = $('#login-show-password').val();
        let urlLogin = `${this.url}/auth/classic?username=${email}&password=${password}`;

        $("#login-show-btn").prop('disabled', true);
        $(".evaluatz_mask_load").removeClass("hidden");
        
        $.ajax({url: urlLogin, success: function(result){
            let {username} = result.user;
            window.location.href = "/profile/" + username;
            $("#login-show-btn").prop('disabled', false);
            $(".evaluatz_mask_load").addClass("hidden");
        //    alert(JSON.stringify(result));
           
          }});
    }

    doRegister = () => {
        let email = $('#register-show-email').val();
        let password = $('#register-show-password').val();
        let password2 = $('#register-show-checkpassword').val();
        alert("Register");
    }
    
    render() {
        return (

            <div className="login-reg-panel">
                <div className="login-info-box">
                    <h2>Have an account?</h2>
                    <p>Lorem ipsum dolor sit amet</p>
                    <div id="label-register" onClick={this.changeValue} >Login</div>
                </div>

                <div className="register-info-box">
                    <h2>Don't have an account?</h2>
                    <p>Lorem ipsum dolor sit amet</p>
                    <div id="label-login" onClick={this.changeValue} >Register</div>
                </div>

                <div className="white-panel">
                    <div className="login-show">
                        <h2>LOGIN</h2>
                        <input id= "login-show-email" type="text" placeholder="Email" />
                        <input id= "login-show-password" type="password" placeholder="Password" />
                        <input id= "login-show-btn" type="button" value="Login" onClick={this.doLogin} />
                        <a href="">Forgot password?</a>

                        <div className="row kpx_row-sm-offset-3 kpx_socialButtons">
                            <div className="col">
                                <a href="#" className="btn btn-lg btn-block kpx_btn-facebook" data-toggle="tooltip" data-placement="top" title="Facebook">
                                    <i className="fa fa-facebook fa-2x"></i>
                                    <span className="hidden-xs"></span>
                                </a>
                            </div>
                            <div className="col">
                                <a href="#" className="btn btn-lg btn-block kpx_btn-google-plus" data-toggle="tooltip" data-placement="top" title="Google Plus">
                                    <i className="fa fa-google-plus fa-2x"></i>
                                    <span className="hidden-xs"></span>
                                </a>
                            </div>
                            <div className="col">
                                <a href="#" className="btn btn-lg btn-block kpx_btn-github" data-toggle="tooltip" data-placement="top" title="GitHub">
                                    <i className="fa fa-github fa-2x"></i>
                                    <span className="hidden-xs"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="register-show">
                        <h2>REGISTER</h2>
                        <input id="register-show-email" type="text" placeholder="Email" />
                        <input id="register-show-password"  type="password" placeholder="Password" />
                        <input id="register-show-checkpassword" type="password" placeholder="Confirm Password" />
                        <input type="button" value="Register" onClick={this.doRegister} />
                    </div>
                </div>
            </div>


        )
    }
}
export default Login
