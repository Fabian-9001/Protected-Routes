const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const checkCredentials = async (email, password) => {

    try {
        const user = await findUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        } else {
            null
        }
    } catch (err) {
        return null
    }

}

module.exports = checkCredentials