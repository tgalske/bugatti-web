import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import { LOAD_APP_CONFIGURATIONS } from './redux-helpers/actions';
import PrivateRoute from './auth/private-route';
import Home from './home/index';
import Upload from './upload/index';
import Quotes from './quotes/index';
import Search from './search/index';
import Members from './members/index';
import MemberProfile from './members/member-profile';
import Login from './auth/login';
import Logout from './auth/logout';
import {sendHttpGet} from "./utils/helper-functions";
import Alert from "./utils/alert";
import Callback from "./auth/callback";
import Header from "./header";

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
    const { renewSession } = this.props.auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  setRemoteConfigs = (configs) => {
    // set endpoint based on development or production environment
    if (process.env.NODE_ENV === 'development') {
      configs.bugatti_api_endpoint = configs.api_endpoints.develop;
    } else {
      configs.bugatti_api_endpoint = configs.api_endpoints.prod;
    }

    this.props.dispatch({
      type: LOAD_APP_CONFIGURATIONS,
      appConfigs: configs
    });

  };

  render() {

    const auth = this.props.auth;

    if (this.props.appConfigs) {
      return (
        <Router>
          <div>
            <Header auth={auth}/>
            <Switch>
              <Route path="/login" render={(props) => <Login {...props} auth={auth} /> } />
              <Route exact path='/callback' render={() => (<Callback auth={auth}/>)}/>
              <Route exact path="/"component={Home} auth={auth}/>
              <PrivateRoute path="/upload" component={Upload} auth={auth}/>
              <PrivateRoute path="/quotes" component={Quotes} auth={auth}/>
              <PrivateRoute path="/search" component={Search} auth={auth}/>
              <PrivateRoute path="/members/:member_id" component={MemberProfile} auth={auth}/>
              <PrivateRoute path="/members" component={Members} auth={auth}/>
              <PrivateRoute path="/logout" component={Logout} auth={auth}/>
            </Switch>
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
        <p>Loading...</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (App);