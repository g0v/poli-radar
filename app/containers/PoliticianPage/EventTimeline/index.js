/*
 *
 * EventList
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import { reverse, shuffle } from 'lodash';

import {
  indigo500,
  blue500,
  teal500,
  lightGreen500,
  lime600,
  deepOrange500,
} from 'material-ui/styles/colors';
// import Location from 'material-ui/svg-icons/communication/location-on';

import { DATE_FORMAT } from 'config';
import WithLoading from 'containers/WithLoading';

import DateLabel from './DateLabel';
import CategoryLabel from './CategoryLabel';

const colorMapper = ((colors) => {
  const map = new Map();
  return {
    getColor: (key) => {
      let color = map.get(key);
      if (color) return color;
      color = colors.pop();
      map.set(key, color);
      return color;
    },
  };
})(shuffle([
  indigo500,
  blue500,
  teal500,
  lightGreen500,
  lime600,
  deepOrange500,
]));

export class EventList extends React.Component {
  renderEvent = (evt, index) => {
    const category = evt.categories[0].name;
    const color = colorMapper.getColor(category);
    const date = moment(evt.date).format(DATE_FORMAT);
    const time = evt.start ? ` ${evt.start}` : '';
    const title = <CategoryLabel color={color}>{category}</CategoryLabel>;
    const createdAt = <DateLabel>{`${date}${time}`}</DateLabel>;
    return (
      <TimelineEvent
        key={`evt-${index}`}
        title={createdAt}
        createdAt={title}
        iconColor={color}
      >
        <h4>{evt.name}</h4>
        <p>地址：{evt.location.address}</p>
      </TimelineEvent>
    );
  }

  render() {
    const {
      data,
    } = this.props;

    return (
      <Timeline>
        {reverse(data).map(this.renderEvent)}
      </Timeline>
    );
  }
}

EventList.propTypes = {
  data: PropTypes.array,
};

export default WithLoading(EventList);
