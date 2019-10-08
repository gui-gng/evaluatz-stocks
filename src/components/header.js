import React from 'react';
import './header.css';

import { connect } from 'react-redux';

//Actions
import {getUser} from '../actions/user';
import { toggleIsShowLogin } from '../actions/navigation';

class Header extends React.Component {
 
  constructor(props) {
    super(props);

    this.showLoginScreen = this.showLoginScreen.bind(this);
    this.showUserInformation = this.showUserInformation.bind(this);
  }
  state = {
    isShowLogin: this.props.isShowLogin
  };


  componentDidMount(){
   
  }

  componentDidUpdate(){
    console.log(this.props.user.isLogged);
    if(this.props.user.isLogged){

    } 
  }


  showLoginScreen() {
    this.props.dispatch(toggleIsShowLogin());
    console.log(this.props.isShowLogin);
  }

  showUserInformation(){

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
    isShowLogin: state.navigation.isShowLogin,
    user: state.user
  };
};

export default connect(mapStateToProps)(Header);