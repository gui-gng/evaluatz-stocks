import React from 'react';
import './header.css';
import Login from './login';
import { connect } from 'react-redux';

class Header extends React.Component {

  constructor(props) {
    super(props);
    // this.state = this.props.getStore();
    // console.log(props);
    this.state = {isShowLogin: props.isShowLogin};
		this.showLoginScreen = this.showLoginScreen.bind(this);
	}
  showLoginScreen() {
    // this.props.dispatch({navigation:{isShowLogin: this.state.isShowLogin}});
    this.setState(() => ({ navigation:{isShowLogin: true} }));
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
        {this.state.isShowLogin ? <Login /> : null}
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