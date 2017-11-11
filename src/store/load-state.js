export default () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      // let reducers assign default state
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error(`Error loading state: ${err}`)
    return undefined
  }
}
