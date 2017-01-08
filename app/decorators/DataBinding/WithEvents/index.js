import React, { PropTypes } from 'react';

import WithApi from 'api/WithApi';

import {
  // STATUS_INIT,
  STATUS_LOADING,
  STATUS_LOADED,
  STATUS_ERROR,
} from 'utils/constants';

export default function (Component) {
  @WithApi
  class WithEvents extends React.PureComponent {
    static propTypes = {
      fetchData: PropTypes.func,
      apiData: PropTypes.object,
      apiStauts: PropTypes.object,
      setInited: PropTypes.func,
      setError: PropTypes.func,
    }

    componentDidMount() {
      const {
        apiStauts,
        setInited,
      } = this.props;
      if (!apiStauts.events) {
        this.loadData();
      } else if (apiStauts.events === STATUS_LOADED) {
        setInited();
      }
    }

    componentWillReceiveProps(nextProps) {
      const {
        apiStauts,
        setInited,
      } = this.props;
      if (apiStauts.events === STATUS_LOADING && nextProps.apiStauts.events === STATUS_LOADED) {
        setInited();
      }
    }

    loadData() {
      const { fetchData } = this.props;
      fetchData('events', {
        include: 'person',
      });
    }

    render() {
      const {
        apiData,
        apiStauts,
        setError,
      } = this.props;

      try {
        // if find no data, will throw error
        const events = apiData.events.data.reduce((obj, data) => {
          obj.byId[data.id] = data;  // eslint-disable-line no-param-reassign
          obj.allId.push(data.id);
          obj.data.push(data);
          return obj;
        }, {
          byId: {},
          allId: [],
          data: [],
        });

        return (
          <Component
            {...this.props}
            events={events}
          />
        );
      } catch (e) {
        if (apiStauts === STATUS_ERROR) setError(null, this.loadData);
        return null;
      }
    }
  }

  return WithEvents;
}
