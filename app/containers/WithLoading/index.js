import React, { PropTypes } from 'React';
import CircularProgress from 'material-ui/CircularProgress';

function WithLoading(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      loading: PropTypes.bool,
    }

    render() {
      const { loading } = this.props;
      if (loading) return <CircularProgress />
      return <WrappedComponent {...this.props}/>
    }
  }
}

export default WithLoading;
