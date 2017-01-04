import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CircularProgress from 'material-ui/CircularProgress';

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
      };
    }

    setInited = () => this.setState({ inited: true })

    render() {
      const { inited } = this.state;
      return (
        <div>
          <div style={{ display: inited ? 'block' : 'none' }}>
            <Component
              {...this.props}
              setInited={this.setInited}
              inited={inited}
            />
          </div>
          {!inited && (
            <Center>
              <CircularProgress color={Blue} />
            </Center>
          )}
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
