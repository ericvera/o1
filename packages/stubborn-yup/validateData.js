const functions = require('firebase-functions')
const yup = require('yup')

module.exports = async (shape, data) => {
  const schema = yup
    .object()
    .shape(shape)
    .noUnknown('The request included fields that were not expected')

  // Check validity of user input
  try {
    await schema.validate(data, { strict: true })
  } catch (error) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      `Found the following errors: ${error.errors.join(',')}`
    )
  }
}
