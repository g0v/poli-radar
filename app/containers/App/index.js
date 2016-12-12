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
import { createStructuredSelector } from 'reselect';

import AppBar from 'material-ui/AppBar';

import { requestData } from './actions';
import {
  selectLoadingState,
  selectErrorState,
  selectLoaded,
} from './selectors';

import Loading from './Loading';

class App extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.initData();
    }
  }

  render() {
    const { loading } = this.props;
    return (
      <Loading loading={loading}>
        <AppBar
          title="Poli Radar"
        />
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
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingState(),
  error: selectErrorState(),
  isLoaded: selectLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    initData: () => dispatch(requestData()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
