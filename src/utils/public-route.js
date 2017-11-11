import React from 'react';
import { Route } from 'react-router-dom';

/**
 * @param {function|object} Component React component to render
 * @param {boolean} authed describes user auth status
 * @param {*} rest any additional parameters
 */
export default ({ component: Component, authed, ...rest }) => (
    <Route
        {...rest}
        render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
);
