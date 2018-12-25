import React, { Component } from 'react';
import GridItem from './grid-item';

class Grid extends Component {
  render() {
    return (
      <div className="m-2">
        {this.props.members.map((member) =>
          <GridItem
            member={member}
            key={member.member_id}
          />
        )}
      </div>
    );
  }
}

export default Grid;
