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
// import { Page, Row, Column } from 'hedron';

import WithRouter from 'decorators/WithRouter';
import WithPolitician from 'decorators/DataBinding/WithPolitician';

import VerticalCenter from 'components/VerticalCenter';
import SearchBoxWithSuggestion from 'components/SearchBoxWithSuggestion';
// import H1 from 'components/H1';
import Hero from './Hero';

@WithRouter
@WithPolitician
class HomePage extends React.Component {
  static propTypes = {
    changeRoute: PropTypes.func,
    politicians: PropTypes.object,
  }

  onSuggestionSelected = (suggestion) => {
    console.log(suggestion);
    // this.openRoute(`politician/${suggestion.id}`);
  }

  openRoute = (route) => {
    this.props.changeRoute(route);
  }

  render() {
    const { politicians } = this.props;

    return (
      <div>
        <Hero
          src="http://placehold.it/1000x250"
        >
          <VerticalCenter align="center">
            <SearchBoxWithSuggestion
              suggestions={politicians.allId.map((id) => politicians.byId[id])}
              placeholder="搜尋立委或相關行程"
              valueKey="name"
              renderKey="name"
              onSuggestionSelected={this.onSuggestionSelected}
            />
          </VerticalCenter>
        </Hero>
      </div>
    );
  }
}

export default HomePage;
