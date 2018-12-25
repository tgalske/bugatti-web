import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InitialsCircle from "./initials-circle";

const getMemberDescription = (props) => {
  if (props.description) {
    return <span className="italic">{props.description}</span>
  } else {
    return <span></span>
  }
};

const getMemberProfileLink = (memberId) => {
  return '/members/' + memberId;
};

class GridItem extends Component {

  description = getMemberDescription(this.props.member);
  memberProfileLink = getMemberProfileLink(this.props.member.member_id);

  render() {
    return (
      <div className="m-1 mb-4 rounded overflow-hidden shadow-lg bg-grey-lightest text-grey-darkest">
        <Link
          to={this.memberProfileLink}
          className="no-underline"
        >

          <div className="flex ml-4 mt-4 text-grey-darkest">
            <InitialsCircle member={this.props.member} />
            <div className="self-center font-bold text-xl ml-4 mt-1 mb-2">
              {this.props.member.firstname} {this.props.member.lastname}
            </div>
            <div className="self-center text-xl ml-2 mr-1 mt-1 mb-2">
              ({this.props.member.nickname})
            </div>
          </div>
          <div className="px-4 py-4">

            <p className="text-grey-darker text-base">
              {this.description}
            </p>
          </div>
        </Link>
      </div>

    )
  }
}

export default GridItem;