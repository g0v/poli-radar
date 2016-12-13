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
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

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
  selectChartData,
} from './selectors';

import CursorPointer from 'components/CursorPointer';
import WithLoading from '../WithLoading';

import DateRangeDialog from './DateRangeDialog';
import EventList from './EventList';

import { DATE_FORMAT } from 'config';

class PoliticianPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateDialogOpen: false,
      mode: '30',
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

  componentWillReceiveProps(nextProps) {
    const { dateRange, curDateRange } = this.props;
    if (nextProps.curDateRange.start !== curDateRange.start) {

    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.politician && nextProps.politician) {
      const { end } = nextProps.dateRange;
      this.props.onSetDateRange({
        end,
        start: moment(end).subtract(30, 'days').format(DATE_FORMAT),
      });
    }
  }

  prevDateRange = () => {
    const { dateRange, curDateRange } = this.props;
    const { mode } = this.state;
    const range = parseInt(mode, 10);
    if (range) {
      const targetStart = moment(curDateRange.start).subtract(range, 'days');
      if (targetStart.isSameOrAfter(dateRange.start)) {
        const targetEnd = moment(curDateRange.end).subtract(range, 'days');
        this.props.onSetDateRange({
          start: targetStart.format(DATE_FORMAT),
          end: targetEnd.format(DATE_FORMAT),
        })
      }
    }
  }

  nextDateRange = () => {
    const { dateRange, curDateRange } = this.props;
    const { mode } = this.state;
    const range = parseInt(mode, 10);
    if (range) {
      const targetEnd = moment(curDateRange.end).add(range, 'days');
      if (targetEnd.isSameOrBefore(dateRange.end)) {
        const targetStart = moment(curDateRange.start).add(range, 'days');
        this.props.onSetDateRange({
          start: targetStart.format(DATE_FORMAT),
          end: targetEnd.format(DATE_FORMAT),
        })
      }
    }
  }

  openDateDialog = () => {
    this.setState({ dateDialogOpen: true });
  }

  closeDateDialog = () => {
    this.setState({ dateDialogOpen: false });
  }

  handleModeChange = (mode) => {
    this.setState({ mode });
  }

  render() {
    const {
      curDateRange,
      dateRange,
      loading,
      politician,
      chartData,
      events,
    } = this.props;
    console.log(chartData);
    if (!politician) return <div>Initializing</div>;

    const {
      dateDialogOpen,
      mode,
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
          <IconButton onTouchTap={this.prevDateRange} disabled={mode === 'custom'}>
            <ChevronLeft />
          </IconButton>
          <IconButton onTouchTap={this.nextDateRange} disabled={mode === 'custom'}>
            <ChevronRight />
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup>
        </ToolbarGroup>
        <DateRangeDialog
          {...curDateRange}
          min={dateRange.start}
          max={dateRange.end}
          open={dateDialogOpen}
          mode={mode}
          onRequestClose={this.closeDateDialog}
          onModeChange={this.handleModeChange}
          onSetDate={this.props.onSetDateRange}
        />
      </Toolbar> : null;

    const eventsData = events.allId.map((id) => events.byId[id]);
    return (
      <div>
        {dateRangeToolBar}
        <Grid>
          <Row start="xs">
            <Col xs={6}>
              <EventList events={eventsData} loading={loading} />
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
