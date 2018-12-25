import React, { Component } from 'react';
import axios from "axios";
import Header from "../header";
import InitialsCircle from "./initials-circle";
import { prettyPrintPhone } from '../utils/HelperFunctions';

class MemberProfile extends Component {

  MEMBER_PROFILE_ENDPOINT = 'http://localhost:3000/members/' + this.props.match.params.member_id;

  constructor(props) {
    super(props);

    this.state = {
      member: {}
    }
  }

  componentDidMount() {
    this.fetchMember();
  }

  fetchMember = () => {
    axios.get(this.MEMBER_PROFILE_ENDPOINT)
      .then( (response) =>{
        this.setState({
          responseReceived: true,
          member: response.data
        });
      })
      .catch( (error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.responseReceived) {
      return (
        <div>
          <Header/>

          {/* Initials Circle */}
          <div className="flex justify-center mt-4">
            {
              this.state.member.member_id &&
              <InitialsCircle member={this.state.member}/>
            }
          </div>

          {/* Name */}
          <div className="flex justify-center font-bold text-2xl mt-2">
            {this.state.member.firstname} {this.state.member.lastname}
          </div>

          {/* Phone */}
          <div className="flex justify-center text-2xl mt-4">
            {prettyPrintPhone(this.state.member.phone)}
          </div>

          {/* Quotes */}
          {showMemberQuotes(this.state.member.quotes)}

        </div>
      )
    }
    return (
      <div>
        <Header/>

      </div>
    )
  }
}

function showMemberQuotes(props) {
  return <div>Hello!</div>
}


export default MemberProfile;