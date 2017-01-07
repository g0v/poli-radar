import React, { PropTypes } from 'react';

import {
  Card,
  CardHeader,
  // CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';

import Wrapper from './Wrapper';

function CardEvent(props) {
  const {
    event,
  } = props;

  const {
    person,
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
        <CardText>
          {event.description}
        </CardText>
      </Card>
    </Wrapper>
  );
}

CardEvent.propTypes = {
  event: PropTypes.object,
};

export default CardEvent;
