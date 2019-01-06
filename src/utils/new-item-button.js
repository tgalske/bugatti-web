import React from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import {FaMinusCircle} from "react-icons/fa/index";

const NewItemButton = (props) => {
  return (
    <button
      className="w-full py-2 mb-2 bg-grey-light"
      onClick={ () => props.parentCallback() }>

      <div className="flex justify-center items-center">
        <div className="mt-1 text-teal text-center text-3xl ">
          {
            props.showButtonTitle ? (
              <FaMinusCircle/>
            ) : (
              <div className="mr-4">
                <FaPlusCircle/>
              </div>
            )
          }
        </div>
        {
          !props.showButtonTitle &&
          <div className="text-grey-darkest text-center text-2xl">{props.buttonTitle}</div>
        }

      </div>

    </button>
  )
};

export default NewItemButton;