/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { PropTypes } from 'react';
import { Page, Row, Column } from 'hedron';
import { sampleSize } from 'lodash';

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
export default class HomePage extends React.Component {
  static propTypes = {
    changeRoute: PropTypes.func,
    legislators: PropTypes.array,
    events: PropTypes.array,
  }

  onPersonSelected = (person) => {
    this.props.changeRoute(`persons/${person.id}`);
  }

  render() {
    const { legislators, events } = this.props;

    return (
      <div>
        <Hero>
          <SearchBoxWithSuggestion
            suggestions={legislators}
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
              {sampleSize(events, 5).map((event) =>
                <CardEvent
                  key={`event-${event.id}`}
                  event={event}
                />
              )}
            </Column>
            <Column sm={4}>
              <H4>熱門立委</H4>
              <Divider />
              {sampleSize(legislators, 5).map((person) =>
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
