import React, { PropTypes } from 'react';
import { eventColors } from 'styles/colors';

import Label from './Label';

function EventCategoryLabel(props) {
  const { category } = props;

  return (
    <Label color={eventColors.get(category.parent.name)}>
      {category.name}
    </Label>
  );
}

EventCategoryLabel.propTypes = {
  category: PropTypes.object,
};

export default EventCategoryLabel;
