import React from 'react';
import { Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class Auth extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
  constructor(props) {
    super(props);
    const { cookies } = props;
    cookies.set('token', props.match.params.token, { path: '/' });
  }
  
  render() {
    return  <Redirect to='/' />
  }
}
export default withCookies(Auth) ;


