const bcrypt = require('bcrypt')

/*ENCRYPT*/
const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10)
}

/*COMPARE*/
const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}