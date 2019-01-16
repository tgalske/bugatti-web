import { Component } from 'react';
import Auth from "./auth";

class Login extends Component {

  render() {
    const auth = new Auth();
    auth.login();
    return null;
  }
}

export default Login;