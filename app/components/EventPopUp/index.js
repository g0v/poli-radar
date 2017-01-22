import React, { Component, PropTypes } from 'react';

import {
  CardMedia,
  CardText,
} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

import EventCategoryLabel from '../EventCategoryLabel';

export default class EventPopUp extends Component {
  static propTypes = {
    event: PropTypes.object,
    loaded: PropTypes.bool,
    onLoad: PropTypes.func,
  }

  componentWillMount() {
    const { media } = this.props.event;
    if (media) {
      this.preLoader = new Image();
      this.preLoader.onload = this.props.onLoad;
      this.preLoader.src = media.value;
    } else {
      this.props.onLoad();
    }
  }

  render() {
    const { event, loaded } = this.props;
    const { media } = event;
    if (!loaded) return <CircularProgress />;
    return (
      <div>
        <EventCategoryLabel category={event.categories[0]} />
        {media && <CardMedia style={{ padding: '0 1.25em' }}>
          <img
            src={this.preLoader.src}
            height={this.preLoader.height}
            width={this.preLoader.width}
            role="presentation"
          />
        </CardMedia>}
        <CardText>
          {event.description}
        </CardText>
      </div>
    );
  }
}
