const { yupPostalCode } = require('./index')

describe('yupPostalCode', () => {
  test('works with formatted postal code value', async () => {
    const postalCode = yupPostalCode({ required: true })
    const result = await postalCode.validate('00123')

    expect(result).toBe('00123')
  })

  test('works for US postal code', async () => {
    const postalCode = yupPostalCode({ required: true })
    const result = await postalCode.validate('98033')

    expect(result).toBe('98033')
  })

  test('works US postal code+4', async () => {
    const postalCode = yupPostalCode({ required: true })
    const result = await postalCode.validate('98033-4321')

    expect(result).toBe('98033-4321')
  })

  test('throws with invalid characters in postal code', async () => {
    const postalCode = yupPostalCode({ required: true })

    await expect(postalCode.validate('s1234')).rejects.toThrow()
  })

  test('throws with invalid postal code', async () => {
    const postalCode = yupPostalCode({ required: true })

    await expect(postalCode.validate('1234')).rejects.toThrow()
  })

  test('throws if invalid even if not required', async () => {
    const postalCode = yupPostalCode({ required: false })

    await expect(postalCode.validate('12343-64')).rejects.toThrow()
  })

  test('throws on string too long', async () => {
    const postalCode = yupPostalCode({ required: false })

    await expect(postalCode.validate('12343 - 5421')).rejects.toThrow()
  })

  test('valid if not required', async () => {
    const postalCode = yupPostalCode({ required: false })

    const result = await postalCode.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })
})
