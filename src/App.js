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
  }

  componentDidMount() {
    let token = this.cookies.get('token');
    if (token) {
      this.props.dispatch(getUser(token));

      let decodedToken = jwt.decode(token, { complete: true })
      console.log(decodedToken);

      //CHANGE TO API

      const url = "http://api.evaluatz.com/user/1/" + decodedToken.payload.sub;
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              user: {
                isLoaded: true,
                username: result.username,
                firstname: result.firstname
              }

            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
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
                {this.haveToken ?
                  <Route path="/profile/:username" component={Profile} />
                  :
                  null
                }
              </Switch>
            </div>
          </Router>
        </div>

        {this.props.isShowLogin ? <Login isReg="false" /> : null}
        
        <div className="evaluatz_mask_load hidden">
          <img alt="" src="/logoEv.png"></img>
          {/* <div className="evaluatz_mask_load_txt">Loading</div> */}
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
