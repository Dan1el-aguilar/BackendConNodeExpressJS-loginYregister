const User = require('../models/userModel')

const emailVal = async(email) => {
  const searchEmail = await User.find({email})

  if (searchEmail.length !== 0) {
    throw new Error(`El email ${email} ya se encuentra en uso`)
  }
  return false
}

module.exports = {
  emailVal
}