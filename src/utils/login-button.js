import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

class LoginButton extends Component {

  constructor(props) {
    super(props);
    this.state = { doRedirect: false }
  }


  render() {
    if (this.state.doRedirect) {
      return (
        <Redirect to='/login' />
      )
    }
    return (
      <button
        className="py-2 px-4 rounded bg-white text-teal-dark font-semibold hover:underline"
        onClick={() => this.setState({ doRedirect: true })}
      >
        Login
      </button>
    )
  }
}

export default LoginButton;