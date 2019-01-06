import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import { LOAD_APP_CONFIGURATIONS } from './redux-helpers/actions';
import Home from './home/index';
import Upload from './upload/index';
import Quotes from './quotes/index';
import Search from './search/index';
import Members from './members/index';
import MemberProfile from './members/member-profile';
import {sendHttpGet} from "./utils/helper-functions";
import Alert from "./utils/alert";

class App extends Component {

  constructor() {
    super();
    this.state = {
      remoteConfigError: false
    }
  }

  remoteConfigError = false;

  componentDidMount() {
    const APP_CONFIGURATIONS_ENDPOINT = "https://s3.amazonaws.com/project-bugatti/bugatti-web-configs.json";
    sendHttpGet(APP_CONFIGURATIONS_ENDPOINT,
      (response) => this.setRemoteConfigs(response),
      (error) => this.setState({remoteConfigError: true })
    );
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
    if (this.props.appConfigs) {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/upload" component={Upload} />
            <Route path="/quotes" component={Quotes} />
            <Route path="/search" component={Search} />
            <Route path="/members/:member_id" component={MemberProfile} />
            <Route path="/members" component={Members} />
            <Route path="/profile" component={MemberProfile} />
          </Switch>
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