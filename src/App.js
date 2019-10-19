import React from 'react';
import './App.css';
import './Animate.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';


//Components
import Header from './components/header';
import Login from './components/login';
import UserInfo from './components/UserInfo';

//Pages
import Index from './pages/index';
import Profile from './pages/profile';
import Stock from './pages/stock';

//Actions
import { getUser } from './actions/user';

class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.cookies = cookies;
    let token = this.cookies.get('token');
    if (token) {
     
      this.props.dispatch(getUser(
        token,
        () => {
        },
        () => {
          this.cookies.remove("token", { path: '/' });
        }
      ));


    }
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }


  render() {
    return (
      <div className="App">
        <Header />
        <div className="evaluatz_content bg-secondary">
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/stock/:symbol" component={Stock} />
                <Route component={Index} />
              </Switch>
            </div>
          </Router>
        </div>
        {this.props.navigation.isShowLogin ? <Login isReg="false" /> : null}
        {this.props.navigation.isShowUserInfo ? <UserInfo /> : null}
        {this.props.navigation.isLoading ? 
            <div className="evaluatz_mask_load">
              <img alt="" src="/logoEv.png"></img>
            </div> 
            : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.navigation);
  return {
    navigation: state.navigation,
    user: state.user
  };
};

export default connect(mapStateToProps)(withCookies(App));
