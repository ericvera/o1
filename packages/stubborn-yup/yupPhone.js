const yup = require('yup')
const isPhone = require('./isPhone')

module.exports = (options = { required: true }) => {
  let yupPhone = yup
    .string()
    .trim()
    .max(50, 'Your phone is too long (max. 50 characters)')

  if (options.required) {
    yupPhone = yupPhone.required('Your phone is required')
  }

  yupPhone = yupPhone.test(
    'phone',
    'It looks like there is something wrong with the phone number',
    value => !value || isPhone(value) // !value makes this optional (required is checked above)
  )

  return yupPhone
}
