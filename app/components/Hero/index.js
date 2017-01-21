import 'whatwg-fetch';
import React, { Component, PropTypes } from 'react';
import StackBlur from 'stackblur-canvas';

import BackgroundImage from 'components/BackgroundImage';
import image from './01.jpg';

export default class Hero extends Component {
  static propTypes = {
    children: PropTypes.node,
    image: PropTypes.string,
  }

  static defaultProps = {
    image,
  }

  constructor(props) {
    super(props);
    this.state = {
      blured: null,
    };
  }

  componentWillMount() {
    const bg = new Image();
    const canvas = document.createElement('canvas');
    bg.onload = () => {
      StackBlur.image(bg, canvas, 4);
      this.setState({ blured: canvas.toDataURL() });
    };
    bg.src = this.props.image;
  }

  render() {
    const { blured } = this.state;
    if (!blured) return null;
    return (
      <BackgroundImage src={blured} padding={100}>
        {this.props.children}
      </BackgroundImage>
    );
  }
}
