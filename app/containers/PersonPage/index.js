import React, { PropTypes } from 'react';
import { Page, Row, Column } from 'hedron';
import { isArray } from 'lodash';
import { fromJS } from 'immutable';

import { Tabs, Tab } from 'material-ui/Tabs';

import WithPerson from 'decorators/DataBinding/WithPerson';
import WithRouter from 'decorators/WithRouter';

// import BackgroundImage from 'components/BackgroundImage';
import H2 from 'components/H2';
import Hero from 'components/Hero';

import CardEvent from './CardEvent';
import CardPerson from './CardPerson';
import CategoryFilter from './CategoryFilter';
import EventsCalander from './EventsCalander';
import EventsTimeline from './EventsTimeline';
import PersonEventsRatio from './PersonEventsRatio';

const newEventCount = 3;

const getEventStructure = (structure, evt) => {
  if (isArray(evt.categories)) {
    evt.categories.forEach((cat) => {
      const parentName = cat.parent.name;
      structure[parentName] = structure[parentName] || {}; // eslint-disable-line no-param-reassign
      structure[parentName][cat.name] = true; // eslint-disable-line no-param-reassign
    });
  }
  return structure;
};

@WithRouter
@WithPerson
export default class PersonPage extends React.Component {
  static propTypes = {
    person: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      categories: fromJS(props.person.events.reduce(getEventStructure, {})),
    };
  }

  setRootFilter = (key, test) => {
    const { categories } = this.state;
    this.setState({
      categories: categories.set(key, categories.get(key).map(() => test)),
    });
  }

  toggleFilter = (keyPath) => {
    const { categories } = this.state;
    this.setState({
      categories: categories.setIn(keyPath, !categories.getIn(keyPath)),
    });
  }

  eventsCategoryFilter = (event) =>
    event.categories.every((category) =>
      this.state.categories.getIn([category.parent.name, category.name])
    )

  render() {
    const { person } = this.props;

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
                  {person.events
                    .slice(0, newEventCount)
                    .reverse()
                    .filter(this.eventsCategoryFilter)
                    .map((event) => (
                      <CardEvent
                        key={`event-${event.id}`}
                        event={event}
                      />
                    ))
                  }
                </Column>
              </Row>
            </Tab>
            <Tab label="歷史行程">
              <EventsTimeline
                events={
                  person.events
                    .slice(newEventCount)
                    .filter(this.eventsCategoryFilter)
                }
              />
            </Tab>
            <Tab label="委員行事曆">
              <EventsCalander
                events={
                  person.events
                    .filter(this.eventsCategoryFilter)
                }
              />
            </Tab>
          </Tabs>
          <CategoryFilter
            categories={this.state.categories}
            onToogleFilter={this.toggleFilter}
            onToogleRootFilter={this.setRootFilter}
          />
        </Page>
      </div>
    );
  }
}
