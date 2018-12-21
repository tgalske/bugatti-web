import React, { Component } from 'react';
import axios from 'axios';
import Grid from "./grid";
import Header from "../header";

const MEMBERS_ENDPOINT = 'http://localhost:3000/members/';

class Members extends Component {

  constructor() {
    super();
    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    this.fetchMembers();
  }

  render() {
    return (
      <div>
        <Header/>
        <Grid members={this.state.members}/>
      </div>
    );
  }

  fetchMembers = () => {
    var self = this;
    axios.get(MEMBERS_ENDPOINT)
      .then(function (response) {
        self.setState({
          members: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

}

export default Members;
