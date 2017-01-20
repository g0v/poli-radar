import React, { PropTypes } from 'react';
import { get } from 'lodash';

import WithApi from 'api/WithApi';
import Person from '../Person';

import {
  // STATUS_INIT,
  STATUS_LOADING,
  STATUS_LOADED,
  STATUS_ERROR,
} from 'utils/constants';

export default function (Component) {
  @WithApi
  class WithLegislators extends React.PureComponent {
    static propTypes = {
      fetchData: PropTypes.func,
      apiData: PropTypes.object,
      apiStauts: PropTypes.object,
      setInited: PropTypes.func,
      setError: PropTypes.func,
    }

    constructor(props) {
      super(props);
      this.state = {
        pos: ['posts', 1],
      };
    }

    componentDidMount() {
      const {
        apiStauts,
        setInited,
      } = this.props;
      const { pos } = this.state;

      if (!get(apiStauts, pos)) {
        this.loadData();
      } else if (get(apiStauts, pos) === STATUS_LOADED) {
        setInited();
      }
    }

    componentWillReceiveProps(nextProps) {
      const { apiStauts, setInited } = this.props;
      const { pos } = this.state;

      if (get(apiStauts, pos) === STATUS_LOADING && get(nextProps.apiStauts, pos) === STATUS_LOADED) {
        setInited();
      }
    }

    loadData() {
      const {
        fetchData,
      } = this.props;
      fetchData('posts/1', {
        include: [
          'memberships.person.memberships.post.classification',
          'memberships.person.memberships.organization',
        ],
      });
    }

    render() {
      const {
        pos,
      } = this.state;

      const {
        apiData,
        apiStauts,
        setError,
      } = this.props;

      try {
        // if find no data, will throw error
        const legislators = get(apiData, pos).memberships.data.reduce((obj, data) => {
          const person = new Person(data.person);
          const withMeta = person.transform('meta');
          obj.byId[withMeta.id] = withMeta; // eslint-disable-line no-param-reassign
          obj.allId.push(withMeta.id);
          obj.data.push(withMeta);
          return obj;
        }, {
          byId: {},
          allId: [],
          data: [],
        });

        return (
          <Component
            {...this.props}
            legislators={legislators}
          />
        );
      } catch (e) {
        if (apiStauts === STATUS_ERROR) setError(null, this.loadData);
        return null;
      }
    }
  }

  return WithLegislators;
}
