import React, { Component } from 'react'
import styled from 'styled-components'
import { ProfileCard } from '../components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  min-height: 80vh;
`

const Greeting = styled.h1`
  color: #212121;
`

const Subheading = styled.strong`
  color: #212121;
`

class Profile extends Component {

  render() {
    const { params } = this.props.match
    return (
      <Root>
        <Subheading>
          {<ProfileCard />}
        </Subheading>
      </Root>
    )
  }

}

export default Profile
