import React, { PropTypes } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  handleChange = (event, index, value) => {
    this.setState({
      value,
    });
    this.props.onChange(value);
  }

  renderOption = (option, index) => (
    <MenuItem
      key={`option-${index}`}
      value={option.value}
      primaryText={option.text}
    />
  )

  render() {
    const options = this.props.options.map(this.renderOption);
    return (
      <SelectField {...this.props} value={this.state.value} onChange={this.handleChange}>
        {options}
      </SelectField>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default Select;
