/*Wrapper arround moment utc function to return current utc time*/
const moment = require('moment')

let now = () => {
  return moment.utc().format()
}

module.exports = {
  now: now
}