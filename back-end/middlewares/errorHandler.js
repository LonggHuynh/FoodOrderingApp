const errorHandlerMiddleware = (err, req, res, next) => {

  console.log(err.stack)
  return res.status(500).json({ msg: 'Internal errors' })


}

module.exports = errorHandlerMiddleware
