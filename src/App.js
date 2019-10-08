import React from 'react';
import './App.css';
import './Animate.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import jwt from 'jsonwebtoken';

import privateKEY from './private.key';


//Components
import Header from './components/header';
import Login from './components/login';
import Auth from './components/Auth';

//Pages
import Index from './pages/index';
import Profile from './pages/profile';

//Actions
import {getUser} from './actions/user';

class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.cookies = cookies;
  }

  componentDidMount(){
    if(this.cookies.get('token') ){
      this.props.dispatch(getUser(this.cookies.get('token')));
    }
  }

  handleNameChange(name) {
    const { cookies } = this.props;
 
    cookies.set('name', name, { path: '/' });
    this.setState({ name });
  }


  sign(payload, $Options){

    var signOptions = {
        issuer: $Options.issuer,
        subject: $Options.subject,
        audience: $Options.audience,
        expiresIn: "1h",
        algorithm: "RS256"
    };
    return jwt.sign(payload, privateKEY, signOptions);
}
haveToken(){
  
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
    isShowLogin: state.navigation.isShowLogin
  };
};

export default connect(mapStateToProps)(withCookies(App));
