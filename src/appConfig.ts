const APP_CONFIG = {
  get authSecret() {
    const secret = process.env.AUTH_SECRET
    if (secret != null) {
      return secret
    }
    throw new Error('Authentication secret hasn\'t been set in the environmental variables')
  },
  salt: 10
}

export default APP_CONFIG