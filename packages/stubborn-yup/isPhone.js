const phone = require('phone')

module.exports = phoneNumber => {
  return phone(phoneNumber, 'PRI').length > 0 || phone(phoneNumber).length > 0
}