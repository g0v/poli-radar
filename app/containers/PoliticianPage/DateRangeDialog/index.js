/*
 *
 * DateRangeDialog
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

export class DateRangeDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: props.start,
      end: props.end,
    };
  }

  setStartDate = (evt, date) => {
    const start = moment(date).format('YYYY-MM-DD');
    this.setState({ start });
  };

  setendDate = (evt, date) => {
    const end = moment(date).format('YYYY-MM-DD');
    this.setState({ end });
  };

  setDate = () => {
    const { start, end } = this.state;
    const { onSetDate, onRequestClose } = this.props;
    onSetDate({ start, end });
    onRequestClose();
  }

  render() {
    const {
      open,
      onRequestClose,
      min,
      max,
    } = this.props;

    const {
      start,
      end,
    } = this.state;

    const datePickerBase = {
      minDate: new Date(min),
      maxDate: new Date(max),
      autoOk: true,
    };

    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={onRequestClose}
      />,
      <FlatButton
        label="確定"
        onTouchTap={this.setDate}
        primary
      />,
    ];

    return (
      <Dialog
        title="設定日期區間"
        open={open}
        onRequestClose={onRequestClose}
        actions={actions}
      >
        <DatePicker
          {...datePickerBase}
          defaultDate={new Date(start)}
          floatingLabelText="開始時間"
          onChange={this.setStartDate}
        />
        <DatePicker
          {...datePickerBase}
          defaultDate={new Date(end)}
          floatingLabelText="結束時間"
          onChange={this.setEndDate}
        />
      </Dialog>
    );
  }
}

DateRangeDialog.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  onRequestClose: PropTypes.func,
  onSetDate: PropTypes.func,
  open: PropTypes.bool,
};

export default DateRangeDialog;
