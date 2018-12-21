import React from 'react';

const GridItem = (props) => (
  <div className="">
    <p>{props.member.firstname} {props.member.lastname}</p>
    <p>{props.member.nickname}</p>
    <p>{props.member.phone}</p>
  </div>
);

export default GridItem;