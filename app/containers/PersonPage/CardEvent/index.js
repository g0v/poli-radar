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

  return (
    <Wrapper>
      <Card>
        <CardHeader
          subtitle={event.date}
        />
        <CardTitle
          title={event.name}
        />
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
