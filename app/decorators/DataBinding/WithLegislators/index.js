import React, { PropTypes } from 'react';
import { get } from 'lodash';

import WithApi from 'api/WithApi';
import LoadError from 'components/LoadError';

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
      } = this.props;

      try {
        // if find no data, will throw error
        const legislators = get(apiData, pos).memberships.data.reduce((obj, data) => {
          const { person } = data;
          person.postitions = person.memberships.data.reduce((res, membership) => {
            const { post } = membership;
            if (post) {
              const { classification } = post;
              if (classification) {
                if (classification.name === '選區') res.region = post.label; // eslint-disable-line no-param-reassign
                if (classification.name === '委員會') res.committee[post.label] = post.label; // eslint-disable-line no-param-reassign
              }
            }
            return res;
          }, {
            committee: {},
          });
          obj.byId[person.id] = person; // eslint-disable-line no-param-reassign
          obj.allId.push(person.id);
          obj.data.push(person);
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
        if (apiStauts === STATUS_ERROR) return <LoadError onTouchTap={this.loadData} />;
        return null;
      }
    }
  }

  return WithLegislators;
}
