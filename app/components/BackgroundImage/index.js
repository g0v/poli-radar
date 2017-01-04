import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

import Wrapper from './Wrapper';
import Loading from './Loading';
import BG from './BG';
import Content from './Content';

import { Blue } from 'styles/colors';

class BackgroundImage extends React.Component {
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
      ...props
    } = this.props;

    const {
      loaded,
      error,
    } = this.state;

    if (!loaded || error) {
      return (
        <Loading>
          <LinearProgress color={Blue} />
        </Loading>
      );
    }

    const imgBg = {
      backgroundImage: `url('${src}')`,
    };

    return (
      <Wrapper>
        <BG {...props} style={imgBg} />
        <Content>
          {children}
        </Content>
      </Wrapper>
    );
  }
}

BackgroundImage.propTypes = {
  src: PropTypes.string,
  children: PropTypes.node,
};

export default BackgroundImage;
