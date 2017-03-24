import React, { Component, PropTypes } from 'react';

import {
  Card,
  CardHeader,
  CardMedia,
  CardText,
} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

import EventCategoryTag from 'components/EventCategoryTag';
import CardTitle from 'components/CardTitle';
import Wrapper from './Wrapper';
import WithRouter from 'decorators/WithRouter';

@WithRouter
export default class CardEvent extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    event: PropTypes.object,
    changeRoute: PropTypes.func,
  }

  render() {
    const {
      event,
      changeRoute,
    } = this.props;

    const {
      persons: { data: [person] },
      media,
    } = event;

    return (
      <Wrapper>
        <Card>
          <CardHeader
            title={
              <span
                style={{ fontWeight: 'bold', cursor: 'pointer' }}
                onTouchTap={() => { changeRoute(`/persons/${person.id}`); }}
              >
                {person.name}
              </span>
            }
            subtitle={event.date}
            avatar={
              <Avatar
                src={person.image}
                style={{ cursor: 'pointer' }}
                onTouchTap={() => { changeRoute(`/persons/${person.id}`); }}
              />
            }
          />
          <CardTitle title={event.name} />
          {media && <CardMedia style={{ padding: '0 1.25em' }}>
            <img src={media.value} role="presentation" />
          </CardMedia>}
          <CardText>
            {event.description}
          </CardText>
        </Card>
        {event.categories && <EventCategoryTag category={event.categories[0]} />}
      </Wrapper>
    );
  }
}
