import React, { Component } from 'react';
import {getMembersEndpoint, sendHttpGet, submitNewQuote} from '../utils/helper-functions';
import connect from "react-redux/es/connect/connect";
import {FaUpload} from "react-icons/fa/index";

class NewQuoteForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      members: [],
      quote_text: '',
      target_member_id: ''
    };
  }

  componentDidMount() {
    sendHttpGet(getMembersEndpoint(),
      (response) => this.setState({members: response }),
      (error) => {} );
  }

  handleFormChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      [key]: value
    });
  };

  handleSubmit = () => {
    if (this.state.target_member_id.length <= 1) {
      return;
    }

    if (this.state.quote_text.length <= 2) {
      return;
    }

    const newQuoteRequest = {
      target_member_id: this.state.target_member_id,
      quote_text: this.state.quote_text
    };

    submitNewQuote(newQuoteRequest, (postResponse) => {
      // use callback to close form
      this.props.parentCallback();

      //
    });

  };

  render() {
    const FORM_INPUT_STYLES = "block appearance-none w-full bg-grey-lighter border " +
      "border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight " +
      "focus:outline-none focus:bg-white focus:border-grey";

    return(
      <div className="flex justify-center">
        <div className="w-full max-w-sm text-grey-darkest">
          <p className="ml-4 mb-1 text-2xl">Add a new quote</p>
          <form className="px-2 pt-6 pb-8 mb-4 bg-white">

            {/* Member dropdown */}
            <div className="px-4">
              <p className="mb-2 font-bold">Who said it?</p>
              <select
                name="target_member_id"
                onChange={this.handleFormChange}
                className={FORM_INPUT_STYLES}
                defaultValue={"Choose a member"}>
                <option disabled>Choose a member</option>
                {
                  this.state.members.map( member =>
                    <option
                      value={member.member_id}
                      key={member.member_id}
                    >{member.firstname} {member.lastname}</option>
                  )
                }
              </select>
            </div>

            {/* Quote text */}
            <div className="px-4 mt-4">
              <p className="mb-2 font-bold">What's the quote?</p>
              <textarea
                name="quote_text"
                onChange={this.handleFormChange}
                className={FORM_INPUT_STYLES}
                type="text"/>
            </div>

            {/* Submit button */}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="px-2 py-3 bg-teal font-bold text-white rounded-lg"
                onClick={this.handleSubmit}
              >
                <FaUpload/> Submit new quote
              </button>
            </div>

          </form>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  members: state.members
});

export default connect(mapStateToProps) (NewQuoteForm);