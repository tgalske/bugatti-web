import { Component } from 'react';
import Auth from "./auth";

class Logout extends Component {

  render() {
    const auth = new Auth();
    auth.logout();

    return null;
  }
}

export default Logout;