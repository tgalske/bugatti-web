import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {
  LOAD_APP_CONFIGURATIONS
} from './redux-helpers/actions';
import Home from './home/index';
import Upload from './upload/index';
import Quotes from './quotes/index';
import Search from './search/index';
import Members from './members/index';
import MemberProfile from './members/member-profile';

import axios from 'axios';

const APP_CONFIGURATIONS_ENDPOINT = "https://s3.amazonaws.com/project-bugatti/bugatti-web-configs.json";

class App extends Component {

  componentDidMount() {

    axios.get(APP_CONFIGURATIONS_ENDPOINT)
      .then((response) => {
        this.props.dispatch({
          type: LOAD_APP_CONFIGURATIONS,
          appConfigs: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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