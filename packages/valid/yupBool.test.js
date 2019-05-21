const { yupBool } = require('./index')

describe('yupBool', () => {
  test('works with true value', async () => {
    const yupVal = yupBool('somename', { required: true })
    const result = await yupVal.validate(true)

    expect(result).toBe(true)
  })

  test('works with false value', async () => {
    const yupVal = yupBool('somename', { required: true })
    const result = await yupVal.validate(false)

    expect(result).toBe(false)
  })

  test('works with bool value as string', async () => {
    const yupVal = yupBool('somename', { required: true })
    const result = await yupVal.validate('true')

    expect(result).toBe(true)
  })

  test('works with bool value as string (case insensitive)', async () => {
    const yupVal = yupBool('somename', { required: true })
    const result = await yupVal.validate('FALSE')

    expect(result).toBe(false)
  })

  test('works if not required', async () => {
    const yupVal = yupBool('somename', { required: false })

    const result = await yupVal.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })

  test('throws if field name is not defined (e.g. accidentally pass options)', () => {
    expect(() => {
      yupBool({ required: true })
    }).toThrow()
  })

  test('throws if not a bool', async () => {
    const yupVal = yupBool('somename', { required: true })

    await expect(yupVal.validate('32')).rejects.toThrow()
  })

  test('throws if required, but not provided', async () => {
    const yupVal = yupBool('somename', { required: true })

    await expect(yupVal.validate(undefined)).rejects.toThrow()
  })
})
