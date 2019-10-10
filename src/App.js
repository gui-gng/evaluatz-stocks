import React from 'react';
import './App.css';
import './Animate.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import jwt from 'jsonwebtoken';



//Components
import Header from './components/header';
import Login from './components/login';
import Auth from './components/Auth';

//Pages
import Index from './pages/index';
import Profile from './pages/profile';
import Stock from './pages/stock';

//Actions
import { setUser } from './actions/user';

class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.cookies = cookies;
    this.haveToken = this.haveToken.bind(this);
  }

  componentDidMount() {
    let token = this.cookies.get('token');
    if (token) {

      const url = "http://api.evaluatz.com/user/" + token;
      console.log(url);
      fetch(url, {
        credentials: 'same-origin'
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (result.Error) {
              console.log("REMOVE TOKEN");
              console.log(this.cookies);
              this.cookies.remove("token", { path: '/' });
            } else {
              let user = { ...result, isLogged: true, token };
              this.props.dispatch(setUser(user));
            }
            console.log(result);

            // console.log(this);
          },
          (error) => {
            alert(error);
          }
        )
    }
  }




  handleNameChange(name) {
    const { cookies } = this.props;

    cookies.set('name', name, { path: '/' });
    this.setState({ name });
  }


  haveToken() {
    alert("Check token");
    return this.cookies.get('token') ? true : false;
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
                <Route path="/Auth/:token" component={Auth} />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/stock/:symbol" component={Stock} />
                <Route component={Index} />
              </Switch>
            </div>
          </Router>
        </div>

        {this.props.isShowLogin ? <Login isReg="false" /> : null}

        <div className="evaluatz_mask_load hidden">
          <img alt="" src="/logoEv.png"></img>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isShowLogin: state.navigation.isShowLogin,
    user: state.user
  };
};

export default connect(mapStateToProps)(withCookies(App));
