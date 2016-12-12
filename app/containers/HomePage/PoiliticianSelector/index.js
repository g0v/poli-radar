/*
 *
 * PoliticianSelector
 *
 */

import React, { PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { isInteger } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';

import Select from 'components/Select';

export class PoliticianSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
      politician: null,
    };
  }

  onCategoryChange = (category) => {
    this.setState({
      category,
      politician: null,
    });
  }

  onPoliticianChange = (politician) => {
    this.setState({ politician });
  }

  onTouchTap = () => {
    const { eventCategories } = this.props.categories[this.state.category];
    const eventCategoriesLink = eventCategories.data.map((d) => d.id).join(',');
    this.props.onSetPolitician(`${this.state.politician}?eventCategories=${eventCategoriesLink}`);
  }

  render() {
    const {
      categories,
      politicians,
    } = this.props;

    const {
      category,
      politician,
    } = this.state;

    const categoriesOptions = categories.map((c, value) => ({
      value,
      text: c.name,
    }));

    const politicianOptions = isInteger(category) ?
      categories[category].politicians
        .map((id) => {
          const p = politicians.byId[id];
          return {
            value: p.id,
            text: p.name,
          };
        })
      : [];

    return (
      <Row start="xs" middle="xs">
        <Col xs>
          <Select
            floatingLabelText="政治人物分類"
            options={categoriesOptions}
            onChange={this.onCategoryChange}
          />
        </Col>
        <Col xs>
          <Select
            floatingLabelText="政治人物"
            options={politicianOptions}
            onChange={this.onPoliticianChange}
          />
        </Col>
        <Col xs>
          <RaisedButton
            label="開始追蹤"
            disabled={!politician}
            onTouchTap={this.onTouchTap}
          />
        </Col>
      </Row>
    );
  }
}

PoliticianSelector.propTypes = {
  onSetPolitician: PropTypes.func,
  categories: PropTypes.array,
  politicians: PropTypes.object,
};

export default PoliticianSelector;
