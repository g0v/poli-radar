/*
 *
 * DateRangeDialog
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

import { DATE_FORMAT } from 'config';

export class DateRangeDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: props.start,
      end: props.end,
    };
  }

  setStartDate = (evt, date) => {
    const start = moment(date).format(DATE_FORMAT);
    this.setState({ start });
  };

  setEndDate = (evt, date) => {
    const end = moment(date).format(DATE_FORMAT);
    this.setState({ end });
  };

  setDate = () => {
    const { start, end } = this.state;
    const { onSetDate, onRequestClose } = this.props;
    onSetDate({ start, end });
    onRequestClose();
  }

  handleModeChange = (evt, value) => {
    const range = parseInt(value, 10);
    if (range) this.setStartDate(null, moment(this.state.end).subtract(range, 'days'));

    this.props.onModeChange(value);
  }

  render() {
    const {
      mode,
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
      disabled: mode !== 'custom',
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
        <RadioButtonGroup
          name="mode"
          onChange={this.handleModeChange}
          valueSelected={mode}
        >
          <RadioButton label="過去30天" value="30" />
          <RadioButton label="過去7天" value="7" />
          <RadioButton label="過去3天" value="3" />
          <RadioButton label="過去1天" value="1" />
          <RadioButton label="自訂" value="custom" />
        </RadioButtonGroup>
        <DatePicker
          {...datePickerBase}
          value={new Date(start)}
          floatingLabelText="開始時間"
          onChange={this.setStartDate}
        />
        <DatePicker
          {...datePickerBase}
          value={new Date(end)}
          floatingLabelText="結束時間"
          onChange={this.setEndDate}
        />
      </Dialog>
    );
  }
}

DateRangeDialog.propTypes = {
  mode: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  onRequestClose: PropTypes.func,
  onSetDate: PropTypes.func,
  onModeChange: PropTypes.func,
  open: PropTypes.bool,
};

export default DateRangeDialog;
