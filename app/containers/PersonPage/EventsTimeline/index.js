import React, { PureComponent, PropTypes } from 'react';
// import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { fade } from 'material-ui/utils/colorManipulator';

import { BG } from 'styles/colors';

import TimelineEventCard from './TimelineEventCard';
import Title from './Title';

import { color, lineWidth } from './style';

const TimelineContainer = styled.div`
  & {
    padding-top: 4em;
    padding: 4em 2em 0;
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: ${lineWidth};
    background-color: ${color};
    left: 1em;
    top: 0;
    bottom: 0;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: ${lineWidth};
    background: linear-gradient(${fade(BG, 1)} 30%, ${fade(BG, 0)} 100%);
    left: 1em;
    top: 0;
    height: 6em;
  }
`;

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
