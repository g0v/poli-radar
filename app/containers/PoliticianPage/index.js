/*
 * PoliticianPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';

import IconButton from 'material-ui/IconButton';
import DateRange from 'material-ui/svg-icons/action/date-range';

import moment from 'moment';

import {
  setPolitician,
  loadEvents,
  setDateRange,
  setEventCategory,
} from './actions';

import {
  selectDateRange,
} from 'containers/App/selectors';

import {
  selectPolitician,
  selectEventIsLoading,
  selectCurDateRange,
  selectEvents,
  selectChartData
} from './selectors';

import CursorPointer from 'components/CursorPointer';

import DateRangeDialog from './DateRangeDialog';

class PoliticianPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateDialogOpen: false,
    };
  }

  componentDidMount() {
    const {
      params,
      location,
      onSetPolitician,
      onSetEventCategory,
    } = this.props;
    if (params.id) {
      // id must be integer
      onSetPolitician(+params.id);
      onSetEventCategory(location.query.eventCategories.split(','));
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.politician && nextProps.politician) {
      const { end } = nextProps.dateRange;
      this.props.onSetDateRange({
        end,
        start: moment(end).subtract(30, 'days').format('YYYY-MM-DD'),
      });
    }
  }

  openDateDialog = () => {
    this.setState({ dateDialogOpen: true });
  }

  closeDateDialog = () => {
    this.setState({ dateDialogOpen: false });
  }

  render() {
    const {
      curDateRange,
      dateRange,
      events,
      loading,
      politician,
      chartData,
    } = this.props;
    console.log(chartData);
    if (!politician) return <div>Initializing</div>;

    const {
      dateDialogOpen,
    } = this.state;
    const dateText = `${curDateRange.start} - ${curDateRange.end}`;

    const dateRangeToolBar = curDateRange.start && curDateRange.end ?
      <Toolbar>
        <ToolbarGroup>
          <IconButton onTouchTap={this.openDateDialog}>
            <DateRange />
          </IconButton>
          <CursorPointer>
            <ToolbarTitle text={dateText} onTouchTap={this.openDateDialog} />
          </CursorPointer>
        </ToolbarGroup>
        <DateRangeDialog
          {...curDateRange}
          min={dateRange.start}
          max={dateRange.end}
          open={dateDialogOpen}
          onRequestClose={this.closeDateDialog}
          onSetDate={this.props.onSetDateRange}
        />
      </Toolbar> : null;

    return (
      <div>
        {dateRangeToolBar}
        <Grid>
          <Row center="xs">
            <Col xs={12}>
              
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

PoliticianPage.propTypes = {
  politician: PropTypes.object,
  loading: PropTypes.bool,
  events: PropTypes.object,
  curDateRange: PropTypes.object,
  dateRange: PropTypes.object,
  chartData: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
  onSetPolitician: PropTypes.func,
  onSetDateRange: PropTypes.func,
  onSetEventCategory: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  politician: selectPolitician(),
  loading: selectEventIsLoading(),
  events: selectEvents(),
  curDateRange: selectCurDateRange(),
  dateRange: selectDateRange(),
  chartData: selectChartData(),
});

function homeDispatchToProps(dispatch) {
  return {
    onSetPolitician: (id) => dispatch(setPolitician(id)),
    onLoadEvents: (callback) => dispatch(loadEvents(callback)),
    onSetDateRange: (range) => dispatch(setDateRange(range)),
    onSetEventCategory: (categories) => dispatch(setEventCategory(categories)),
    dispatch,
  };
}

export default connect(mapStateToProps, homeDispatchToProps)(PoliticianPage);
