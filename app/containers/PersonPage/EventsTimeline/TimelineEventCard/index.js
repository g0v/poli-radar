import React, { PropTypes } from 'react';
import {
  Card,
  // CardHeader,
  CardMedia,
  CardText,
} from 'material-ui/Card';

import EventCategoryLabel from 'components/EventCategoryLabel';
import EventCategoryTag from 'components/EventCategoryTag';
import CardTitle from 'components/CardTitle';

import DateCircle from './DateCircle';
import EventWrapper from './EventWrapper';

function TimelineEventCard(props) {
  const { event } = props;
  const { media } = event;
  return (
    <EventWrapper>
      <DateCircle date={event.date} />
      <Card>
        <CardTitle
          title={event.name}
        >
          <EventCategoryLabel category={event.categories[0]} />
        </CardTitle>
        {media && <CardMedia style={{ padding: '0 1.25em' }}>
          <img src={media.value} role="presentation" />
        </CardMedia>}
        <CardText>
          {event.description}
        </CardText>
      </Card>
      <EventCategoryTag category={event.categories[0]} />
    </EventWrapper>
  );
}

TimelineEventCard.propTypes = {
  event: PropTypes.object,
};

export default TimelineEventCard;
