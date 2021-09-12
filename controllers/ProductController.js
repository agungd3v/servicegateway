const axios = require('axios').default
const serviceUrl = process.env.PRODUCT_SERVICE

const ProductController = {
  index: async (req, res) => {
    try {
      const request = await axios.get(serviceUrl + '/product')
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
  },
  detail: async (req, res) => {
    try {
      const { productid } = req.body
      const request = await axios.post(serviceUrl + '/show', { id: productid })
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

module.exports = ProductController