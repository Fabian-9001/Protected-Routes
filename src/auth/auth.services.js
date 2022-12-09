const checkCredentials = require('./auth.controller')
const jwt = require('jsonwebtoken')
const jwtsecret = require('../../config').api.jwtSecret


const postLogin = (req, res) => {

    const { email, password } = req.body

    if (email && password) {

        checkCredentials(email, password)
            .then(user => {
                if (user) {

                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }, jwtsecret)

                    res.status(200).json({message:'Correct Credentials', token })

                } else {
                    res.status(401).json({ message: 'Invalid Credentials' })
                }
            })
            .catch(err => res.status(400).json({ message: err.message }))

    } else {
        res.status(400).json({ message: 'Missing Data', fields: { email: 'example@example.com', password: 'String' } })
    }
}


module.exports = postLogin