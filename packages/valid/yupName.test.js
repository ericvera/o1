const { yupName } = require('./index')

describe('yupName', () => {
  test('works with name value', async () => {
    const name = yupName({ required: true })
    const result = await name.validate('Peter')

    expect(result).toBe('Peter')
  })

  test('works with name value and trims', async () => {
    const name = yupName({ required: true })
    const result = await name.validate('    Some Dude ')

    expect(result).toBe('Some Dude')
  })

  test('throws if required, but not provided', async () => {
    const name = yupName({ required: true })

    await expect(name.validate(undefined)).rejects.toThrow()
  })

  test('throws with invalid name', async () => {
    const name = yupName({ required: true })

    await expect(name.validate('   ')).rejects.toThrow()
  })

  test('throws with name too short', async () => {
    const name = yupName({ required: false })

    await expect(name.validate('P')).rejects.toThrow()
  })

  test('valid if not required', async () => {
    const name = yupName({ required: false })

    const result = await name.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })
})
