import React from 'react';
import { Route } from 'react-router-dom';

/**
 * @param {function|object} Component React component to render
 * @param {boolean} authed describes user auth status
 * @param {*} rest any additional parameters
 */
export default ({ component: Component, authenticated, ...args }) => (
    <Route
        {...rest}
        render={props => authenticated ?
            // user is authorized; proceed to route
            <Component {...props} /> :
            // user is not authorized: proceed to login
            <Redirect to={{pathname: '/login', state: { from: props.location}}} />
        }
    />
);
