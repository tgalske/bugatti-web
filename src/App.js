import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {
  LOAD_APP_CONFIGURATIONS
} from './redux-helpers/actions';
import axios from 'axios';
import Home from './home/index';
import Members from './members/index';
import Content from './content/index';

const APP_CONFIGURATIONS_ENDPOINT = "https://s3.amazonaws.com/project-bugatti/bugatti-web-configs.json";

class App extends Component {

  ComponentFromString = () => {
    var MyComponent = Members;
    return React.createElement(MyComponent, {});
  };

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
          <div>{
            this.props.appConfigs.pages.forEach( (page) =>
              <Route exact path={page.route} component={this.ComponentFromString} key={page.title}/>
            )
          }


          </div>
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