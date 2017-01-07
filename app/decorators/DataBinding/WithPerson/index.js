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
  class WithPerson extends React.PureComponent {
    static propTypes = {
      apiData: PropTypes.object,
      apiStauts: PropTypes.object,
      fetchData: PropTypes.func,
      params: PropTypes.object,
      setInited: PropTypes.func,
    }

    constructor(props) {
      super(props);
      const { id } = props.params;
      this.state = {
        id,
        pos: ['persons', id],
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
      const { pos } = this.state;
      const { apiStauts, setInited } = this.props;
      if (get(apiStauts, pos) === STATUS_LOADING && get(nextProps.apiStauts, pos) === STATUS_LOADED) {
        setInited();
      }
    }

    loadData() {
      const { id } = this.state;
      const {
        fetchData,
      } = this.props;
      fetchData(`persons/${id}`, {
        include: [
          'memberships.post.classification',
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
        const person = get(apiData, pos);
        // manully throw error
        if (!person) throw new Error('No Data');

        return (
          <Component
            {...this.props}
            person={person}
          />
        );
      } catch (e) {
        if (apiStauts === STATUS_ERROR) return <LoadError onTouchTap={this.loadData} />;
        return null;
      }
    }
  }

  return WithPerson;
}
