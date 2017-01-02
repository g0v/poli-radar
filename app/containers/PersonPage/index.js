/*
 * PersonPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
// import { Page, Row, Column } from 'hedron';

import WithPerson from 'decorators/DataBinding/WithPerson';
import WithRouter from 'decorators/WithRouter';

@WithRouter
@WithPerson
class PersonPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    person: PropTypes.object,
  }

  render() {
    const { person } = this.props;

    console.log(person);

    return (
      <div>
        {person.name}
      </div>
    );
  }
}

export default PersonPage;
