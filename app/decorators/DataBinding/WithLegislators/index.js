import React, { PropTypes } from 'react';
import { get } from 'lodash';

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
      const pos = ['posts', 1];
      this.state = {
        inited: get(props.apiStauts, pos) === STATUS_LOADED,
        pos,
      };
    }

    componentDidMount() {
      const { apiStauts, fetchData } = this.props;
      const { pos } = this.state;

      if (!get(apiStauts, pos)) {
        fetchData('posts/1', {
          include: [
            'memberships.person.memberships.post.classification',
          ],
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      // const { apiStauts } = this.props;
      const { pos } = this.state;

      if (get(nextProps.apiStauts, pos) === STATUS_LOADED) {
        this.setState({ inited: true });
      }
    }

    render() {
      const {
        inited,
        pos,
      } = this.state;

      if (!inited) return null;

      const {
        apiData,
      } = this.props;

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
    }
  }

  return InnerComponent;
}
