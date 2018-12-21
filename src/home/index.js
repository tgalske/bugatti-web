import React, { Component } from 'react';
import Header from "../header";
import connect from "react-redux/es/connect/connect";

class Home extends Component {

  render() {
    return (
      <div>
        <Header/>
        {this.props.appConfigs.site_title}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (Home);