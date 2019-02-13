const yup = require('yup')

module.exports = (options = { required: true }) => {
  let yupState = yup.string().trim()

  if (options.required) {
    yupState = yupState.required('Your state is required')
  }

  yupState = yupState
    .uppercase()
    .min(2, 'Your state must be two characters long')
    .max(2, 'Your state must be two characters long')

  return yupState
}
