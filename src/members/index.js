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

  fetchMembers = () => {
    var self = this;
    axios.get(MEMBERS_ENDPOINT)
      .then(function (response) {
        self.setState({
          members: response.data.Items.sort()
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Header/>
        <Grid members={this.state.members}/>
      </div>
    );
  }

}

export default Members;
