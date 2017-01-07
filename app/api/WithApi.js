import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CircularProgress from 'material-ui/CircularProgress';
import LoadError from 'components/LoadError';

import Center from './Center';

import {
  requestData,
} from './actions';

import {
  selectData,
  selectStatus,
} from './selectors';

import { Blue } from 'styles/colors';

export default function (Component) {
  class WithApi extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        inited: false,
        errorMsg: null,
        errorAction: null,
      };
    }

    setInited = () => this.setState({
      inited: true,
      errorMsg: null,
      errorAction: null,
    })

    setError = (errorMsg, errorAction = null) => this.setState({
      errorMsg,
      errorAction,
    })

    render() {
      const {
        inited,
        errorAction,
        errorMsg,
      } = this.state;
      return (
        <div>
          <div style={{ display: inited ? 'block' : 'none' }}>
            <Component
              {...this.props}
              setInited={this.setInited}
              inited={inited}
            />
          </div>
          {!inited && !errorMsg && (
            <Center>
              <CircularProgress color={Blue} />
            </Center>
          )}
          {errorMsg && <LoadError msg={errorMsg} action={errorAction} />}
        </div>
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

  return connect(mapStateToProps, mapDispatchToProps)(WithApi);
}
