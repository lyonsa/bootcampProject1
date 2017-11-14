import React, { Component } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  min-height: 80vh;
`

const Greeting = styled.h1`
  color: #fff;
`

const Subheading = styled.strong`
  color: #fff;
`

class Profile extends Component {

  componentDidMount() {
    // fetch for profile here
    // if profile not found,
    // redirect to not found!
  }

  render() {
    const { params } = this.props.match
    return (
      <Root>
        <Greeting>
          Profile route
        </Greeting>
        <Subheading>
          You were searching for { params.uid }
        </Subheading>
      </Root>
    )
  }

}

export default Profile
