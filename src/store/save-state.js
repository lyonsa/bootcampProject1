export default ({ auth }) => {
  const state = { auth }
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.error(`Error serializing state: ${err}`)
  }
}
