/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { Page, Row, Column } from 'hedron';
import Autosuggest from 'react-autosuggest';
import { filter } from 'lodash';

import {
  selectPoliticians,
} from 'containers/App/selectors';

import withRouter from 'decorators/withRouter';

import VerticalCenter from 'components/VerticalCenter';
// import H1 from 'components/H1';
import Hero from './Hero';

const getSuggestionValue = (p) => p.name;

const renderSuggestion = (suggestion) => (
  <div>
    {suggestion.name}
  </div>
);

@withRouter
class HomePage extends React.Component {
  static propTypes = {
    changeRoute: PropTypes.func,
    politicians: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      value: '',
      id: 0,
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.openRoute(`politician/${suggestion.id}`);
  }

  getSuggestions = (input) => {
    const { politicians } = this.props;
    const inputValue = input.trim();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : filter(politicians.byId, (p) =>
      p.name.slice(0, inputLength) === inputValue
    );
  }

  openRoute = (route) => {
    this.props.changeRoute(route);
  }

  render() {
    const { suggestions, value } = this.state;
    const inputProps = {
      placeholder: '搜尋立委或相關行程',
      value,
      onChange: this.onChange,
    };
    return (
      <div>
        <Hero
          src="http://placehold.it/1000x250"
        >
          <VerticalCenter align="center">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </VerticalCenter>
        </Hero>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  politicians: selectPoliticians(),
});

export default connect(mapStateToProps)(HomePage);
