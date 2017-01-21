import React, { PropTypes } from 'react';

import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';

import EventCategoryLabel from 'components/EventCategoryLabel';
import EventCategoryTag from 'components/EventCategoryTag';

import Wrapper from './Wrapper';

function CardEvent({ event }) {
  const {
    categories,
    media,
  } = event;

  return (
    <Wrapper>
      <Card>
        <CardHeader
          subtitle={event.date}
        />
        <CardTitle
          title={event.name}
        >
          <EventCategoryLabel category={categories[0]} />
        </CardTitle>
        {media && <CardMedia style={{ padding: '0 1.25em' }}>
          <img src={media.value} role="presentation" />
        </CardMedia>}
        <CardText>
          {event.description}
        </CardText>
      </Card>
      <EventCategoryTag category={categories[0]} />
    </Wrapper>
  );
}

CardEvent.propTypes = {
  event: PropTypes.object,
};

export default CardEvent;
