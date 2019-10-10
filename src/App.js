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
   
      let decodedToken = jwt.decode(token, { complete: true })
      const url = "http://api.evaluatz.com/user/" + decodedToken.payload.sub;
      console.log(url);
      fetch(url,{
        credentials: 'same-origin'
      })
        .then(res => res.json())
        .then(
          (result) => {

            console.log(result);

            // this.props.dispatch(setUser(result));
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
                {this.haveToken ?
                  <div>
                    <Route path="/profile/:username" component={Profile} />
                    <Route path="/stock/:symbol" component={Stock} />
                  </div>
                  :
                  <Route component={Index} />
                }
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
