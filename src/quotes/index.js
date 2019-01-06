import React, { Component } from 'react';
import Header from "../header";
import SingleQuote from "./single-quote";
import NewItemButton from "../utils/new-item-button";
import NewQuoteForm from "./new-quote-form";
import connect from "react-redux/es/connect/connect";
import {getQuotesEndpoint, sendHttpGet} from "../utils/helper-functions";

class Quotes extends Component {

  constructor() {
    super();
    this.state = {
      quotes: [],
      showQuoteForm: false
    };
  }

  componentDidMount() {
    this.fetchQuotes();
  }

  fetchQuotes = () => {
    sendHttpGet(getQuotesEndpoint(),
      (response) => this.setState({quotes: response}),
      (error) => {} );
  };

  toggleShowQuoteForm = () => {
    this.setState({ showQuoteForm: !this.state.showQuoteForm });
  };

  newQuoteSubmittedCallback = () => {
    // hide the form and refresh quotes
    this.toggleShowQuoteForm();
    this.fetchQuotes();
  };

  render() {
    return (
      <div>
        <Header/>

        <NewItemButton
          buttonTitle={"New Quote"}
          showButtonTitle={this.state.showQuoteForm}
          parentCallback={this.toggleShowQuoteForm}
        />

        {
          this.state.showQuoteForm &&
          <NewQuoteForm
            parentCallback={this.newQuoteSubmittedCallback}
          />
        }

        {
          this.state.quotes.map( quote =>
            <SingleQuote quote={quote} key={quote.quote_id} />
          )
        }
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (Quotes);