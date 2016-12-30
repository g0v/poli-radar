import React, { PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';

import Wrapper from './Wrapper';
import SearchIcon from './SearchIcon';
import theme from '!style!css?modules!./theme.css';

class SearchBarWithSuggestion extends React.PureComponent {
  static propTypes = {
    suggestions: PropTypes.array,
    placeholder: PropTypes.string,
    valueKey: PropTypes.string,
    renderKey: PropTypes.string,
    onSuggestionSelected: PropTypes.func,
    suggestionCompoent: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: props.suggestions,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { suggestions } = nextProps;
    if (suggestions && suggestions.length && suggestions !== this.props.suggestions) {
      this.setState({ suggestions });
    }
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
    this.props.onSuggestionSelected(suggestion);
  }

  getSuggestions = (input) => {
    const { suggestions } = this.props;
    const { valueKey } = this.props;
    const inputValue = input.trim();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggestions.filter((suggestion) =>
      suggestion[valueKey].slice(0, inputLength) === inputValue
    );
  }

  getSuggestionValue = (suggestion) => {
    const { valueKey } = this.props;
    return suggestion[valueKey];
  }

  renderSuggestion = (suggestion) => {
    const { renderKey, suggestionCompoent } = this.props;
    if (suggestionCompoent) {
      return <suggestionCompoent suggestion={suggestion} />;
    }
    return (
      <div>
        {suggestion[renderKey]}
      </div>
    );
  }

  render() {
    const {
      placeholder,
    } = this.props;
    const {
      value,
      suggestions,
    } = this.state;
    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange,
    };

    return (
      <Wrapper>
        <Autosuggest
          theme={theme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <SearchIcon />
      </Wrapper>
    );
  }
}

export default SearchBarWithSuggestion;
