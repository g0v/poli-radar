import React, { PureComponent, PropTypes } from 'react';

import TimelineContainer from './TimelineContainer';
import TimelineEventCard from './TimelineEventCard';
import Title from './Title';

class EventsTimeline extends PureComponent {
  componentDidMount() {
    // console.log(this.container);
    // window.onscroll =
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  render() {
    const { events } = this.props;
    return (
      <div ref={(ref) => { this.container = ref; }}>
        <Title>歷史行程時間軸</Title>
        <TimelineContainer>
          {events.map((event, index) => <TimelineEventCard key={`timeline-event-${index}`} event={event} />)}
        </TimelineContainer>
      </div>
    );
  }
}

EventsTimeline.propTypes = {
  events: PropTypes.array,
};

export default EventsTimeline;
