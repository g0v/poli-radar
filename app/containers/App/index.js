/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import WithRouter from 'decorators/WithRouter';

import AppBar from './AppBar';
import AppWrapper from './AppWrapper';

@WithRouter
export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    changeRoute: React.PropTypes.func,
  }

  goHome = () => {
    this.props.changeRoute('/');
  }

  render() {
    return (
      <AppWrapper>
        <AppBar
          title="立委行程追追追"
          onTitleTouchTap={this.goHome}
        />
        {React.Children.toArray(this.props.children)}
      </AppWrapper>
    );
  }
}
