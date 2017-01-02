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
      apiData: PropTypes.object,
      apiStauts: PropTypes.object,
      fetchData: PropTypes.func,
      params: PropTypes.object,
    }

    constructor(props) {
      super(props);
      const { id } = props.params;
      const pos = ['persons', id];
      this.state = {
        inited: get(props.apiStauts, pos) === STATUS_LOADED,
        id,
        pos,
      };
    }

    componentDidMount() {
      const { apiStauts, fetchData } = this.props;
      const { id, pos } = this.state;
      if (!get(apiStauts, pos)) {
        fetchData(`persons/${id}`, {
          include: [
            'memberships.post.classification',
          ],
        });
      }
    }

    componentWillReceiveProps(nextProps) {
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

      const { apiData } = this.props;

      const person = get(apiData, pos);

      return (
        <Component
          {...this.props}
          person={person}
        />
      );
    }
  }

  return InnerComponent;
}
