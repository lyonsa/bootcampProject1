import React from 'react'
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

class Profile {

  componentWillMount() {
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
        <sub>
          You're searching for {params.uid}
        </sub>
      </Root>
    )
  }

}

export default Profile
