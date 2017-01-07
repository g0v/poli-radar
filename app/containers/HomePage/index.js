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
import { Page, Row, Column } from 'hedron';
import { sampleSize, take } from 'lodash';

import Divider from 'material-ui/Divider';

import WithEvents from 'decorators/DataBinding/WithEvents';
import WithLegislators from 'decorators/DataBinding/WithLegislators';
import WithRouter from 'decorators/WithRouter';

import H4 from 'components/H4';
import Hero from 'components/Hero';

import CardEvent from './CardEvent';
import CardPersonSmall from './CardPersonSmall';
import SearchBoxWithSuggestion from './SearchBoxWithSuggestion';

@WithRouter
@WithEvents
@WithLegislators
class HomePage extends React.Component {
  static propTypes = {
    changeRoute: PropTypes.func,
    legislators: PropTypes.object,
    events: PropTypes.object,
  }

  onPersonSelected = (person) => {
    console.log(person);
    this.props.changeRoute(`persons/${person.id}`);
  }

  render() {
    const { legislators, events } = this.props;

    console.log(legislators);

    return (
      <div>
        <Hero>
          <SearchBoxWithSuggestion
            suggestions={legislators.data}
            placeholder="搜尋立委或相關行程"
            valueKey="name"
            renderKey="name"
            onSuggestionSelected={this.onPersonSelected}
          />
        </Hero>
        <Page>
          <Row>
            <Column sm={8}>
              <H4>熱門行程</H4>
              {take(events.data, 5).map((event) =>
                <CardEvent
                  key={`event-${event.id}`}
                  event={event}
                />
              )}
            </Column>
            <Column sm={4}>
              <H4>熱門立委</H4>
              <Divider />
              {sampleSize(legislators.data, 5).map((person) =>
                <CardPersonSmall
                  key={`person-${person.id}`}
                  person={person}
                  onClick={this.onPersonSelected}
                />
              )}
            </Column>
          </Row>
        </Page>
      </div>
    );
  }
}

export default HomePage;
