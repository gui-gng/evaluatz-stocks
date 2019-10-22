import React from 'react';
import './header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'




import $ from 'jquery';

import { connect } from 'react-redux';

//Actions
import { toggleIsShowLogin, toggleIsShowUserInfo, toggleIsShowMenu } from '../actions/navigation';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.showLoginScreen = this.showLoginScreen.bind(this);
    this.showUserInformation = this.showUserInformation.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  state = {
    isShowLogin: this.props.isShowLogin
  };


  componentDidMount() {

  }

  componentDidUpdate() {
    // console.log(this.props.user.isLogged);
    // if (this.props.user.isLogged) {
    //   console.log("Update Header");
    //   console.log(this.props.user);
    // }
  }


  showLoginScreen() {
    this.props.dispatch(toggleIsShowLogin());
  }

  showUserInformation() {

    if (this.props.navigation.isShowUserInfo) {
      $(".evaluatz_userinfo").removeClass("bounceInRight");
      $(".evaluatz_userinfo").addClass("bounceOutRight");
    }
    setTimeout(() => {
      this.props.dispatch(toggleIsShowUserInfo());
    }, this.props.navigation.isShowUserInfo ? 1000 : 0)
  }

  toggleMenu() {
    if (this.props.navigation.isShowMenu) {
      $(".evaluatz_menu").removeClass("fadeInLeft");
      $(".evaluatz_menu").addClass("fadeOutLeft");
    }
    setTimeout(() => {
      this.props.dispatch(toggleIsShowMenu());
    }, this.props.navigation.isShowMenu ? 500 : 0)
  }



  render() {
    return (
      <div className="evaluatz_header d-flex align-items-center justify-content-between">
        {
          this.props.user.isLogged ?
            <div onClick={this.toggleMenu} className="evaluatz_header_toggleMenu text-white p-2  ">
               <FontAwesomeIcon icon={faBars} />
            </div>
            : null
        }
        <div className="evaluatz_logo_header">
          <img alt="" src="/logoEv.png"></img>
        </div>
        <div className="evaluatz_header_right d-flex align-items-center justify-content-between">
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