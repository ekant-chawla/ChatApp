let isValidEmail = function (email) {
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return emailRegex.test(email)
}


let isValidPassword = function (password) {
  let passwordRegex = /^[A-Za-z0-9]\w{7,}$/
  return passwordRegex.test(password)
}

module.exports = {
  isValidEmail: isValidEmail,
  isValidPassword: isValidPassword
}
