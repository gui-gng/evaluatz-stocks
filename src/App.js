import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import $ from 'jquery';



//Components
import Header from './components/header';
import Login from './components/login';

//Pages
import Index from './pages/index';
import Profile from './pages/profile';

class App extends React.Component {
  constructor(props) {
    super(props);
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
              </Switch>
            </div>
          </Router>
        </div>

        {this.props.isShowLogin ?
         
            <Login isReg="false" />
          
          : 
          null
        }

          <div className="evaluatz_mask_load hidden">
          <img alt="" src="/logo.png"></img>
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

export default connect(mapStateToProps)(App);
