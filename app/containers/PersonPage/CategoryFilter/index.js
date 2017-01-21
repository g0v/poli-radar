import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'hedron';

import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import IndeterminateCheckBox from 'material-ui/svg-icons/toggle/indeterminate-check-box';

import { Blue, eventColors } from 'styles/colors';

const getCheckBoxStyle = (category) => ({ fill: eventColors.get(category) });

const FloatFilter = styled(FloatingActionButton)`
  & {
    position: fixed;
    top: 90vh;
    right: 5%;
  }
`;

export default class CategoryFilter extends Component {
  static propTypes = {
    categories: PropTypes.object, // an immutable object
    onToogleFilter: PropTypes.func,
    onToogleRootFilter: PropTypes.func,
  }

  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  rednerMainFilter = (subCategories, mainCategory) => (
    <Column key={`filter-${mainCategory}`} sm={4}>
      <List>
        <ListItem
          primaryText={mainCategory}
          leftCheckbox={this.renderRootCheckBox(mainCategory, subCategories)}
          nestedItems={subCategories.map((checked, subCategory) =>
            this.renderSubFilter(mainCategory, subCategory, checked)).toArray()
          }
          initiallyOpen
        />
      </List>
    </Column>
  )

  renderRootCheckBox = (mainCategory, subCategories) => {
    const allChecked = subCategories.every((checked) => checked);
    const someChecked = subCategories.some((checked) => checked);
    return (
      <Checkbox
        checked={someChecked}
        checkedIcon={allChecked ? null : <IndeterminateCheckBox />}
        iconStyle={getCheckBoxStyle(mainCategory)}
        onCheck={() => this.props.onToogleRootFilter(mainCategory, !someChecked)}
      />
    );
  }

  renderSubFilter = (mainCategory, subCategory, checked) => (
    <ListItem
      key={`filter-${subCategory}`}
      primaryText={subCategory}
      leftCheckbox={
        <Checkbox
          checked={checked}
          iconStyle={getCheckBoxStyle(mainCategory)}
          onCheck={() => { this.props.onToogleFilter([mainCategory, subCategory]); }}
        />
      }
    />
  )

  render() {
    const { categories } = this.props;
    return (
      <div>
        <FloatFilter onTouchTap={this.handleOpen}>
          <ContentFilter />
        </FloatFilter>
        <Dialog
          title="行程篩選器"
          titleStyle={{ backgroundColor: Blue, color: 'white' }}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Row>
            {categories.map(this.rednerMainFilter).toArray()}
          </Row>
        </Dialog>
      </div>
    );
  }
}
