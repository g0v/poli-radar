/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-flexbox-grid';

import {
  selectPoliticians,
  selectPoliticianCategories,
  // selectPoliticianTraits,
} from 'containers/App/selectors';

import VerticalCenter from 'components/VerticalCenter';
import H1 from 'components/H1';
import Hero from './Hero';
import PoiliticianSelector from './PoiliticianSelector';

class HomePage extends React.Component {
  static propTypes = {
    changeRoute: PropTypes.func,
    politicians: PropTypes.object,
    politicianCategories: PropTypes.array,
  };

  openRoute = (route) => {
    this.props.changeRoute(route);
  }

  handelSetPolitician = (politician) => {
    this.openRoute(`politician/${politician}`);
  }

  render() {
    const {
      politicianCategories,
      politicians,
    } = this.props;

    return (
      <Row center="xs">
        <Col xs={12}>
          <Hero
            src="http://placehold.it/1200x630"
          >
            <VerticalCenter align="right">
              <H1>你知道政治人物都去哪兒了嗎?</H1>
            </VerticalCenter>
          </Hero>
          <PoiliticianSelector
            categories={politicianCategories}
            politicians={politicians}
            onSetPolitician={this.handelSetPolitician}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  politicians: selectPoliticians(),
  politicianCategories: selectPoliticianCategories(),
  // politicianTraits: selectPoliticianTraits(),
});

function homeDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

export default connect(mapStateToProps, homeDispatchToProps)(HomePage);
