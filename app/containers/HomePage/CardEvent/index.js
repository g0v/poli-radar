import React, { PropTypes } from 'react';

import {
  Card,
  CardHeader,
  // CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';

import EventCategoryTag from 'components/EventCategoryTag';
import Wrapper from './Wrapper';

function CardEvent(props) {
  const {
    event,
  } = props;

  const {
    person,
  } = event;

  console.log(event.categories);

  return (
    <Wrapper>
      <Card>
        <CardHeader
          title={person.name}
          subtitle={event.date}
          avatar={person.image}
        />
        <CardTitle title={event.name} />
        <CardText>
          {event.description}
        </CardText>
      </Card>
      <EventCategoryTag category={event.categories[0]} />
    </Wrapper>
  );
}

CardEvent.propTypes = {
  event: PropTypes.object,
};

export default CardEvent;
