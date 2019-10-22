import React from 'react';
import './App.css';
import './Animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

//Actions
import { getUser } from './actions/user';

//Components
import UserInfo from './components/UserInfo';
import Load_FullScreen from './components/Load_FullScreen';
import Index_before_auth from './components/index_before_auth';

const Header = React.lazy(() => import('./components/header'));
const Login = React.lazy(() => import('./components/login')); 

const Index_after_auth = React.lazy(() => import('./components/index_after_auth'));

//Pages
const Index = React.lazy(() => import('./pages/index'));
const Profile = React.lazy(() => import('./pages/profile'));
const Stock = React.lazy(() => import('./pages/stock'));



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
        <React.Suspense fallback={<Load_FullScreen />}>
          <Header />
          <div className="evaluatz_content bg-secondary">
            <div>
              {this.props.user.isLogged ?
                <React.Suspense fallback={<Load_FullScreen />}>
                  <Router>
                    <Switch>
                      <Route exact path="/" component={Index_after_auth} />
                      <Route path="/profile/:username" component={Profile} />
                      <Route path="/stock/:symbol" component={Stock} />
                      <Route component={Index} />
                    </Switch>
                  </Router>
                </React.Suspense>
                :
                <Router>
                  <Switch>
                    <Route component={Index_before_auth} />
                  </Switch>
                </Router>
              }
            </div>

          </div>
          {this.props.navigation.isShowLogin ? <Login /> : null}
          {this.props.navigation.isShowUserInfo ? <UserInfo /> : null}
          {this.props.navigation.isLoading ? <Load_FullScreen /> : null}
        </React.Suspense>
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
