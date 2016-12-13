/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import AppBar from 'material-ui/AppBar';

import { requestData } from './actions';
import {
  selectLoadingState,
  selectErrorState,
  selectLoaded,
  selectPolitician,
} from './selectors';

import Wrapper from './Wrapper';
import Loading from './Loading';

const style = {
  position: 'fixed',
};

class App extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.initData();
    }
  }

  goHome = () => {
    this.props.openRoute('/');
  }

  render() {
    const { loading, politician } = this.props;
    return (
      <Loading loading={loading}>
        <Wrapper>
          <AppBar
            title={`Poli Radar${politician ? ` - ${politician}` : ''}`}
            style={style}
            onTitleTouchTap={this.goHome}
          />
        </Wrapper>
        {React.Children.toArray(this.props.children)}
      </Loading>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  loading: React.PropTypes.bool,
  isLoaded: React.PropTypes.bool,
  initData: React.PropTypes.func,
  openRoute: React.PropTypes.func,
  politician: React.PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingState(),
  error: selectErrorState(),
  isLoaded: selectLoaded(),
  politician: selectPolitician(),
});

function mapDispatchToProps(dispatch) {
  return {
    initData: () => dispatch(requestData()),
    openRoute: (route) => dispatch(push(route)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
