import React, { Component } from 'react';

class Home extends Component {

  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <p>Home page</p>
        <br/>
        <br/>
        {
          !isAuthenticated() ? (
            <div onClick={this.login}>
              Click me to login
            </div>
          ) : (
            <div onClick={this.logout}>
              Click me to logout
            </div>
          )
        }

      </div>
    )
  }
}

export default Home;