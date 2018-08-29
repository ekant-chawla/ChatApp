/* response generation library for api */
let generate = (err, message, status, data) => {
    let response = {
      error: err,
      message: message,
      status: status,
      data: data,
      timestamp:Date.now() // used to mark the response time to compare and find latest update on client side if needed.
    }
    return response
  }
  
  module.exports = {
    generate: generate
  }
  