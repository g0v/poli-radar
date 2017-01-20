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
  class WithPerson extends React.PureComponent {
    static propTypes = {
      apiData: PropTypes.object,
      apiStauts: PropTypes.object,
      fetchData: PropTypes.func,
      params: PropTypes.object,
      setInited: PropTypes.func,
      setError: PropTypes.func,
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
          'memberships.organization',
          'events.categories.parent',
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
        const data = get(apiData, pos);
        // manully throw error
        if (!data) throw new Error('No Data');

        const person = new Person(data);
        person.transform(['meta', 'events']);
        person.sort('events', 'date', 'DESC');
        return (
          <Component
            {...this.props}
            person={person.data}
          />
        );
      } catch (e) {
        if (apiStauts === STATUS_ERROR) setError(null, this.loadData);
        return null;
      }
    }
  }

  return WithPerson;
}
