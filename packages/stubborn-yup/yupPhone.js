const defaultOptions = require('./helpers/defaultOptions')
const getE164Phone = require('./helpers/getE164Phone')
const yup = require('yup')

const InvalidPhone = 'invalid-phone'

/**
 * @param {YupTextOptions} [options]
 */
module.exports = options => {
  const localOptions = Object.assign({}, defaultOptions, options)

  let yupPhone = yup
    .string()
    .trim()
    .max(50, 'Your phone is too long (max. 50 characters)')

  if (localOptions.required) {
    yupPhone = yupPhone.required('Your phone is required')
  }

  yupPhone = yupPhone.test(
    'phone',
    'It looks like there is something wrong with the phone number',
    value => value !== InvalidPhone
  )

  yupPhone = yupPhone.transform(value => {
    if (!value) {
      return
    }

    // NOTE: InvalidPhone will never get to the consumer of
    //  this funtion. The consumer will receive a rejected
    //  Promise cause by .test(...)
    return getE164Phone(value) || InvalidPhone
  })

  return yupPhone
}
