import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';

class ProtectedComponent extends PureComponent {

  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    pushRoute: PropTypes.func.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
  }

  componentWillMount() {
    // if user is not authenticated, redirect to sign-in
    console.log('authenticated -> ', this.props.authenticated)
    if (!this.props.authenticated) {
      // TODO: add params necessary for redirecting back to original route
      this.props.pushRoute('/sign-in')
    }
  }

  render() {
    const Component = this.props.component
    return (
      <Component />
    )
  }
}
  

// takes in authentication state, and push route action from 
// `Router`; takes in a component from a given `Route`
// generates a protected component.
export default ({ component, authenticated, pushRoute, ...args }) => (
    <Route
        {...args}
        render={ props =>
            <ProtectedComponent
              authenticated={authenticated}
              pushRoute={pushRoute}
              component={component}
            />
        }
    />
);
