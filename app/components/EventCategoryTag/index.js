import React, { PropTypes } from 'react';
import { eventColors } from 'styles/colors';

import Tag from './Tag';

function EventCategoryTag(props) {
  const { category } = props;

  return (
    <Tag color={eventColors.get(category)}>
      {category}
    </Tag>
  );
}

EventCategoryTag.propTypes = {
  category: PropTypes.string,
};

export default EventCategoryTag;
