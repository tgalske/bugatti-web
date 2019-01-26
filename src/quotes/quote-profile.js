import React, {Component} from 'react';
import {getQuotesEndpoint, sendHttpGet} from "../utils/helper-functions";
import Callback from "../callback/callback";
import QuoteForm from "./quote-form";
import NewItemButton from "../utils/new-item-button";

class QuoteProfile extends Component {

  constructor() {
    super();
    this.state = {
      quote : null,
      showQuoteForm : false,
    }
  }

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote = () => {
    console.log('fetching quote');
    const quote_id = this.props.match.params.quote_id;
    const quote_endpoint = getQuotesEndpoint() + quote_id;
    sendHttpGet(quote_endpoint,
      (response) => {
        console.log(response)
        this.setState( {quote: response})
      },
      (error) => console.log(error));
  };

  toggleShowQuoteForm = () => {
    this.setState({ showQuoteForm: !this.state.showQuoteForm });
  };

  quoteEditedCallback = () => {
    this.toggleShowQuoteForm();
    this.fetchQuote();
  };

  render() {
    if (this.state.quote) {
      return (
        <div>
          <p className="m-2 text-grey-darkest text-xl">
            {this.state.quote.quote_text}
          </p>

          <NewItemButton
            buttonTitle={"Edit Quote"}
            parentCallback={this.toggleShowQuoteForm}
            showButtonTitle={this.state.showQuoteForm}

          />

          {/* Edit quote form */}
          {
            this.state.showQuoteForm &&
            <QuoteForm
              quote={this.state.quote}
              parentCallback={this.quoteEditedCallback}
            />
          }


        </div>
      )
    }
    return (
      <Callback/>
    )
  }
}

export default QuoteProfile;