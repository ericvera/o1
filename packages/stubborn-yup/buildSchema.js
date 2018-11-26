const yup = require('yup')

module.exports = (shape, options = { noUnknown: true }) => {
  let schema = yup.object().shape(shape)

  if (options.noUnknown) {
    schema = schema.noUnknown(
      'The request included fields that were not expected'
    )
  }

  return schema
}
