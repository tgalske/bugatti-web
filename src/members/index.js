import React, { Component } from 'react';
import Header from "../header";
import GridItem from './grid-item';
import connect from "react-redux/es/connect/connect";
import NewItemButton from "../utils/new-item-button";
import NewMemberForm from "./new-member-form";
import {getMembersEndpoint, sendHttpGet} from "../utils/helper-functions";

class Members extends Component {

  constructor(props) {
    super();
    this.state = {
      members: [],
      showMemberForm: false
    };
  }

  componentDidMount() {
    this.fetchMembers();
  }

  fetchMembers = () => {
    sendHttpGet(getMembersEndpoint(),
      (response) => this.setState({ members: response }),
      (error) => {} );
  };

  toggleShowMemberForm = () => {
    this.setState({ showMemberForm: !this.state.showMemberForm });
  };

  newMemberSubmittedCallback = () => {
    this.toggleShowMemberForm();
    this.fetchMembers();
  };

  render() {
    return (
      <div>
        <Header/>
        <NewItemButton
          buttonTitle={"New Member"}
          showButtonTitle={this.state.showMemberForm}
          parentCallback={this.toggleShowMemberForm}
        />

        {
          this.state.showMemberForm &&
          <NewMemberForm
            parentCallback={this.newMemberSubmittedCallback}
          />
        }

        {this.state.members.map((member) =>
          <GridItem
            member={member}
            key={member.member_id}
          />
        )}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (Members);