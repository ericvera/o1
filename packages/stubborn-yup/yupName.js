const yup = require('yup')

module.exports = (options = { required: true }) => {
  let yupName = yup.string().trim()

  if (options.required) {
    yupName = yupName.required('Your name is required')
  }

  yupName = yupName
    .min(2, 'Your name is required')
    .max(100, 'Your name is too long')

  return yupName
}
