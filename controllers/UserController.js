const axios = require('axios').default
const serviceUrl = process.env.USER_SERVICE

const UserController = {
  cart: async (req, res) => {
    try {
      const { product, user } = req.body
      const request = await axios.post(serviceUrl + '/addtocart', {
        product: product,
        userid: user
      })
      if (!request.data.status) return res.json({
        status: false,
        message: "Error: " + request.data.message
      })
      return res.json({
        status: true,
        message: request.data.message
      })
    } catch (error) {
      return res.json({
        status: false,
        message: "Error: " + error
      })
    }
  }
}

module.exports = UserController