import React, { PropTypes } from 'react';

import WithApi from 'api/WithApi';

import {
  // STATUS_INIT,
  // STATUS_LOADING,
  STATUS_LOADED,
  // STATUS_ERROR,
} from 'utils/constants';

export default function (Component) {
  @WithApi
  class InnerComponent extends React.PureComponent {
    static propTypes = {
      fetchData: PropTypes.func,
      apiData: PropTypes.object,
      apiStauts: PropTypes.object,
    }

    constructor(props) {
      super(props);
      this.state = {
        inited: props.apiStauts.events === STATUS_LOADED,
      };
    }

    componentDidMount() {
      const { apiStauts, fetchData } = this.props;
      if (!apiStauts.events) {
        fetchData('events', {
          include: 'person',
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.apiStauts.events === STATUS_LOADED) {
        this.setState({ inited: true });
      }
    }

    render() {
      const { inited } = this.state;

      if (!inited) return null;

      const {
        apiData,
      } = this.props;

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
    }
  }

  return InnerComponent;
}
