import React, { PropTypes } from 'react';

import {
  Card,
  CardHeader,
  CardMedia,
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
    persons: { data: [person] },
    media,
  } = event;

  return (
    <Wrapper>
      <Card>
        <CardHeader
          title={person.name}
          subtitle={event.date}
          avatar={person.image}
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

CardEvent.propTypes = {
  event: PropTypes.object,
};

export default CardEvent;
