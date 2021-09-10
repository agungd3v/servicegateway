const axios = require('axios').default
const jwt = require('jsonwebtoken')
const serviceUrl = process.env.AUTH_SERVICE

const AuthController = {
  gLogin: async (req, res) => {
    try {
      const { usormail, pwd } = req.body
      const request = await axios.post(serviceUrl + '/login', { usmail: usormail, password: pwd })
      if (!request.data.status) return res.json({
        status: false,
        message: request.data.message
      })
      const data = request.data.message
      const accessToken = jwt.sign({ email: data.email, id: data._id }, process.env.SECRET_TOKEN, { expiresIn: '1d' })
      const verifyToken = jwt.verify(accessToken, process.env.SECRET_TOKEN)
      return res.json({
        status: true,
        message: {
          user: {
            name: data.name,
            username: data.username,
            email: data.email,
            carts: data.carts,
          },
          token: {
            bearer: accessToken,
            identity: verifyToken
          }
        }
      })
    } catch (error) {
      return res.json({
        status: false,
        message: "Error: " + error
      })
    }
  },
  gRegister: async (req, res) => {
    try {
      const { name, username, email, pwd } = req.body
      const request = await axios.post(serviceUrl + '/register', {
        name: name,
        username: username,
        email: email,
        password: pwd
      })
      if (!request.data.status) return res.json({
        status: false,
        message: request.data.message
      })
      return res.json({
        status: true,
        message: "Success created account"
      })
    } catch (error) {
      return res.json({
        status: false,
        message: "Error: " + error
      })
    }
  }
}

module.exports = AuthController