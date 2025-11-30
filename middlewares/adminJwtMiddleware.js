const jwt = require('jsonwebtoken')

const adminJwtMiddlware = (req, res, next) => {
    console.log("Inside admin jwt middleware")

    const token = req.headers.authorization.split(" ")[1]

    if (token) {
        try {

            const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
            req.role = jwtResponse.role
            req.payload = jwtResponse.email
            if(jwtResponse.role=="admin") {
                next()
            }
            else{
                res.status(401).json("Authorization failed,admin has only access to our resources!")
            }
        }
        catch (err) {
            res.status(500).json(err)
        }

    }
    else {
        res.status(404).json("Authorization Failed.")
    }

}

module.exports = adminJwtMiddlware