import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import $ from 'jquery';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

//Components
import Header from './components/header';
import Login from './components/login';
import Auth from './components/Auth';


//Pages
import Index from './pages/index';
import Profile from './pages/profile';

class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    console.log(props);
    const { cookies } = props;
    cookies.set('name', "G", { path: '/' });
    this.state = {
      name: cookies.get('name') || 'Anonymous'
    };
  }

  handleNameChange(name) {
    const { cookies } = this.props;
 
    cookies.set('name', name, { path: '/' });
    this.setState({ name });
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
