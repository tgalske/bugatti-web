import React from 'react';

const SingleQuote = (props) => {
  const memberName = props.quote.nickname ? props.quote.nickname : props.quote.firstname;
  return (
    <div className="flex flex-row pb-4 m-4 border-grey-dark border-b text-xl lg:text-2xl">
      <p className="text-grey-darkest">
        {props.quote.quote_text}
      </p>

      {
        memberName &&
        <p className="ml-2 text-grey-darker">
        - {memberName}
        </p>
      }

    </div>
  )
};

export default SingleQuote;