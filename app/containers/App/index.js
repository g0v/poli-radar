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

import AppBar from 'material-ui/AppBar';

import WithRouter from 'decorators/WithRouter';
import Wrapper from './Wrapper';

@WithRouter
class App extends React.Component {
  goHome = () => {
    this.props.changeRoute('/');
  }

  render() {
    return (
      <div>
        <Wrapper>
          <AppBar
            title="立委行程追追追"
            style={{ position: 'fixed' }}
            onTitleTouchTap={this.goHome}
          />
        </Wrapper>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  changeRoute: React.PropTypes.func,
};


export default App;
