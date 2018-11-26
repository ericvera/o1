module.exports = async (schema, data) => {
  // Check validity of user input. This throws if validation fails.
  await schema.validate(data, { strict: true })
}
