import React, { PureComponent, PropTypes } from 'react';

import TimelineContainer from './TimelineContainer';
import TimelineEventCard from './TimelineEventCard';
import Title from './Title';

import { appBar } from 'styles/units';

class EventsTimeline extends PureComponent {
  static propTypes = {
    events: PropTypes.array,
  }

  componentDidMount() {
    window.onscroll = () => {
      const { top } = this.container.getBoundingClientRect();
      if (top < parseInt(appBar, 10)) {
        if (!this.container.classList.contains('pinned')) this.container.classList.add('pinned');
      } else if (this.container.classList.contains('pinned')) {
        this.container.classList.remove('pinned');
      }
    };
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  render() {
    const { events } = this.props;
    return (
      <div>
        <Title>歷史行程時間軸</Title>
        <TimelineContainer innerRef={(ref) => { this.container = ref; }}>
          {events.map((event, index) => <TimelineEventCard key={`timeline-event-${index}`} event={event} />)}
        </TimelineContainer>
      </div>
    );
  }
}

export default EventsTimeline;
