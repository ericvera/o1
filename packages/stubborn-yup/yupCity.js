const yup = require('yup')

module.exports = (options = { required: true }) => {
  let yupCity = yup.string().trim()

  if (options.required) {
    yupCity = yupCity.required('Your city name is required')
  }

  yupCity = yupCity.max(100, 'Your city name is too long')

  return yupCity
}
