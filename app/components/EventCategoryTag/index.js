import React, { PropTypes } from 'react';
import { eventColors } from 'styles/colors';

import Tag from './Tag';

function EventCategoryTag(props) {
  const { name } = props.category.parent;

  return (
    <Tag color={eventColors.get(name)}>
      {name}
    </Tag>
  );
}

EventCategoryTag.propTypes = {
  category: PropTypes.object,
};

export default EventCategoryTag;
