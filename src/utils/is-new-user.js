export default (user) => {
  try {
    const { metadata } = user
    const { creationTime, lastSignInTime } = metadata
    return creationTime === lastSignInTime
  } catch (err) {
    throw new Error('Error checking if user is new')
  }
}
