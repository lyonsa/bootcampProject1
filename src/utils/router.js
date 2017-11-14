import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ pushRoute: routerActions.push }, dispatch)
)

const Router = ({ children, auth, pushRoute }) => (
  <main>
    {
      // inject authentication state and ability
      // to programmatically push routes to child routes
      // this will allow `ProtectedRoute`s to check if the
      // user is authenticated in `componentWillMount()`
      // if the user is not authenticated, the route can 
      // push the "/sign-in" route
      React.Children.map(children, child => 
        React.cloneElement(child, {
          authenticated: auth.authenticated,
          pushRoute,
        })
      )
    }
  </main>
)

Router.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Router)
