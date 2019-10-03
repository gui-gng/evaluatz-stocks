import React from 'react';
import './header.css';

import { connect } from 'react-redux';
import { toggleIsShowLogin } from '../actions/navigation';

class Header extends React.Component {
 
  constructor(props) {
    super(props);

    // this.state = this.props.getStore();
    console.log(props);
    
		this.showLoginScreen = this.showLoginScreen.bind(this);
  }
  state = {
    isShowLogin: this.props.isShowLogin
  };

  showLoginScreen() {
    this.props.dispatch(toggleIsShowLogin());
    console.log(this.props.isShowLogin);
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
          <div className="evaluatz_signin_btn" onClick={this.showLoginScreen}>Sign Up</div>
        </div>
       
      </div>
    );
  }
}

// export default Header;

const mapStateToProps = (state) => {
  return {
    isShowLogin: state.navigation.isShowLogin
  };
};

export default connect(mapStateToProps)(Header);