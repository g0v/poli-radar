/*
 * PersonPage
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

import { Tabs, Tab } from 'material-ui/Tabs';

import WithPerson from 'decorators/DataBinding/WithPerson';
import WithRouter from 'decorators/WithRouter';

// import BackgroundImage from 'components/BackgroundImage';
import H2 from 'components/H2';
import Hero from 'components/Hero';

import CardEvent from './CardEvent';
import CardPerson from './CardPerson';
import EventsTimeline from './EventsTimeline';
import PersonEventsRatio from './PersonEventsRatio';

const newEvents = 3;

@WithRouter
@WithPerson
class PersonPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    person: PropTypes.object,
  }

  render() {
    const { person } = this.props;

    // console.log(person.events);

    return (
      <div>
        <Hero>
          <CardPerson person={person} />
        </Hero>
        <Page>
          <Tabs>
            <Tab label="近日行程">
              <Row>
                <Column sm={4}>
                  <PersonEventsRatio person={person} />
                </Column>
                <Column sm={8}>
                  <H2>近日行程</H2>
                  {person.events.slice(0, newEvents).reverse().map((event) => (
                    <CardEvent
                      key={`event-${event.id}`}
                      event={event}
                    />
                  ))}
                </Column>
              </Row>
            </Tab>
            <Tab label="歷史行程">
              <EventsTimeline events={person.events.slice(newEvents)} />
            </Tab>
          </Tabs>
        </Page>
      </div>
    );
  }
}

export default PersonPage;
