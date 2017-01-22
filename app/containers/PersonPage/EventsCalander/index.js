import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import BigCalendar from 'react-big-calendar';
import Dialog from 'material-ui/Dialog';
import globalize from 'globalize';
import 'globalize/lib/cultures/globalize.culture.zh-TW';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import EventPopUp from 'components/EventPopUp';
import { eventColors } from 'styles/colors';

BigCalendar.setLocalizer(
  BigCalendar.globalizeLocalizer(globalize)
);

const eventsTransformer = (evt) => ({
  ...evt,
  title: evt.name,
  start: parse(`${evt.date}${evt.start ? ` ${evt.start}` : ''}`),
  end: parse(`${evt.date}${evt.end ? ` ${evt.end}` : ''}`),
  allDay: !evt.start || !evt.end,
});

const Wrapper = styled.div`
  & {
    margin-top: 2em;
    height: 40em;
  }
`;

const eventPropGetter = (event) => {
  const background = eventColors.get(event.categories[0].parent.name);
  return {
    style: {
      background,
    },
  };
};

class EventsCalander extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      activeEvent: null,
      loaded: false,
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
      loaded: false,
    });
  }

  handleSelectEvent = (activeEvent) => {
    this.setState({
      activeEvent,
      open: true,
    });
  }

  handleOnLoad = () => {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const { events } = this.props;
    const { activeEvent, loaded, open } = this.state;
    return (
      <Wrapper>
        <BigCalendar
          culture="zh-TW"
          eventPropGetter={eventPropGetter}
          events={events.map(eventsTransformer)}
          onSelectEvent={this.handleSelectEvent}
        />
        <Dialog
          open={open}
          title={activeEvent && loaded && activeEvent.name}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <EventPopUp
            event={activeEvent}
            loaded={loaded}
            onLoad={this.handleOnLoad}
          />
        </Dialog>
      </Wrapper>
    );
  }
}

EventsCalander.propTypes = {
  events: PropTypes.array,
};

export default EventsCalander;
