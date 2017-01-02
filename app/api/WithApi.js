import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  requestData,
} from './actions';

import {
  selectData,
  selectStatus,
} from './selectors';

export default function withRouter(Component) {
  class InnerComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  const mapStateToProps = createStructuredSelector({
    apiStauts: selectStatus(),
    apiData: selectData(),
  });

  function mapDispatchToProps(dispatch) {
    return {
      fetchData: (route, params) => dispatch(requestData(route, params)),
      dispatch,
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(InnerComponent);
}
