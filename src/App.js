import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import { LOAD_APP_CONFIGURATIONS } from './redux-helpers/actions';
import {sendHttpGet} from "./utils/helper-functions";
import Alert from "./utils/alert";
import Header from "./header/header";
import Callback from "./callback/callback";
import history from './utils/history';
import Auth from './auth/auth';
import PrivateRoute from './auth/private-route';
import Home from './home/home';
import Members from "./members/index";


const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      remoteConfigError: false
    }
  }

  remoteConfigError = false;

  componentDidMount() {
    // fetch remote configs
    const APP_CONFIGURATIONS_ENDPOINT = "https://s3.amazonaws.com/project-bugatti/bugatti-web-configs.json";
    sendHttpGet(APP_CONFIGURATIONS_ENDPOINT,
      (response) => this.setRemoteConfigs(response),
      (error) => this.setState({remoteConfigError: true })
    );

    // handle auth
    const { renewSession } = auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  setRemoteConfigs = (configs) => {
    configs.bugatti_api_endpoint = configs.api_endpoints.prod;

    this.props.dispatch({
      type: LOAD_APP_CONFIGURATIONS,
      appConfigs: configs
    });

  };

  render() {

    if (this.props.appConfigs) {
      return (
        <Router history={history}>
          <div>
            <Route path="/" render={(props) => <Header auth={auth} {...props} /> } />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />
            }}/>
            <PrivateRoute path="/members" component={Members} auth={auth}/>
          </div>
        </Router>
      );
    } else if (this.state.remoteConfigError) {
      return <Alert
        alertTitle={"There was an error starting up the app"}
        alertSubtext={"Please try again later and thank you for your patience"}
        alertLevel={1}
      />
    }
    return (
      <div>
        <Callback/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (App);