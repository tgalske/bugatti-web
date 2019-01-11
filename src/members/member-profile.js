import React, { Component } from 'react';
import InitialsCircle from "./initials-circle";
import {getMembersEndpoint, prettyPrintPhone, sendHttpGet} from '../utils/helper-functions';
import {FaMobileAlt, FaCaretUp} from 'react-icons/fa';
import SingleQuote from "../quotes/single-quote";
import {FaCaretDown} from "react-icons/fa/index";
import connect from "react-redux/es/connect/connect";

class MemberProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      member: {
        quotes: []
      },
      showQuotes: true
    }
  }

  componentDidMount() {
    this.fetchMember();
  }

  fetchMember = () => {
    const memberUrl = getMembersEndpoint() + this.props.match.params.member_id;
    sendHttpGet(memberUrl,
      (response) => this.setState( {member: response }),
      (error) => {});
  };

  handleQuotes = () => {
    return (
      <div>
        <div
          onClick={ () => this.setState({showQuotes : !this.state.showQuotes })}
          className="flex justify-between m-4 py-4 text-2xl">
          <p className="text-grey-darkest font-bold">Quotes</p>
          {
            this.state.showQuotes ? (
              <FaCaretUp/>
            ) : (
              <FaCaretDown/>
            )
          }
        </div>
        <div>
          {
            this.state.showQuotes &&

            this.state.member.quotes.map( (quote, index) =>
              <SingleQuote quote={quote} key={index}/>
            )
          }
        </div>
      </div>
    )
  };

  render() {
    return (
      <div>
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
          <FaMobileAlt className="mr-2"/> {prettyPrintPhone(this.state.member.phone)}
        </div>

        {/* Quotes */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm mt-4">
            {this.handleQuotes()}
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (MemberProfile);