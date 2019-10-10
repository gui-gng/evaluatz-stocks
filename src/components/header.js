import React from 'react';
import './header.css';

import $ from 'jquery';

import { connect } from 'react-redux';

//Actions
import { toggleIsShowLogin, toggleIsShowUserInfo } from '../actions/navigation';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.showLoginScreen = this.showLoginScreen.bind(this);
    this.showUserInformation = this.showUserInformation.bind(this);
  }
  state = {
    isShowLogin: this.props.isShowLogin
  };


  componentDidMount() {

  }

  componentDidUpdate() {
    console.log(this.props.user.isLogged);
    if (this.props.user.isLogged) {
      console.log("Update Header");
      console.log(this.props.user);
    }
  }


  showLoginScreen() {
    this.props.dispatch(toggleIsShowLogin());
    console.log(this.props.isShowLogin);
  }

  showUserInformation() {

    if(this.props.navigation.isShowUserInfo){
     $(".evaluatz_userinfo").removeClass("bounceInRight");
     $(".evaluatz_userinfo").addClass("bounceOutRight");
    }
    setTimeout(()=>{
      this.props.dispatch(toggleIsShowUserInfo());
    }, this.props.navigation.isShowUserInfo ? 1000:0)
  }

  render() {
    return (
      <div className="evaluatz_header">
        <div className="evaluatz_logo_header">
          <img alt="" src="/logo.png"></img>
        </div>
        <div className="evaluatz_search_bar">
          
        </div>
        <div className="evaluatz_header_right">
          {!this.props.user.isLogged ?
            <div className="evaluatz_signin_btn" onClick={this.showLoginScreen}>Sign Up</div> :
            <div className="evaluatz_signin_btn" onClick={this.showUserInformation}>{this.props.user.username}</div>
          }

        </div>

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

export default connect(mapStateToProps)(Header);