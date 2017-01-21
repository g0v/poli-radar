import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import LinearProgress from 'material-ui/LinearProgress';

class BackgroundImage extends Component {
  static propTypes = {
    children: PropTypes.node,
    padding: PropTypes.number,
    fullHeight: PropTypes.bool,
    src: PropTypes.string.isRequired,
  }

  static defaultProps = {
    padding: 0,
  }

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: false,
    };
  }

  componentDidMount() {
    // Making this a global so it can be later
    // nullified when the component unmounts
    this.image = new Image();
    this.image.src = this.props.src;
    this.image.onload = this.handleLoad;
    this.image.onerror = this.handleError;
  }

  shouldComponentUpdate = (nextProps) => (
    !this.state.loaded || this.props.children !== nextProps.children
  )

  componentWillUnmount() {
    this.image = null;
  }

  handleLoad = () => {
    this.setState({
      loaded: true,
    });
  }

  handleError = () => {
    this.setState({
      error: true,
    });
  }

  render() {
    const {
      src,
      children,
      padding,
      fullHeight,
      ...props
    } = this.props;

    const {
      loaded,
      error,
    } = this.state;

    if (!loaded || error) {
      return (
        <div {...props}>
          <LinearProgress />
        </div>
      );
    }

    const BG = styled.div`
      & {
        background-image: url(${src});
        background-size: cover;
        background-position: 50% 50%;
        ${padding && `padding: ${padding}px 0`};
        ${fullHeight && 'height: 100%;'};
      }
    `;

    return (
      <BG {...props}>
        {children}
      </BG>
    );
  }
}

export default BackgroundImage;
