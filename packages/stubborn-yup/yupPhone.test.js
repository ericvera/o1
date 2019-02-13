const { yupPhone } = require('./index')

describe('yupPhone', () => {
  test('works with phone value and coerces correctly', async () => {
    const phone = yupPhone({ required: true })
    const result = await phone.validate('+1 787-123-1234')

    expect(result).toBe('+17871231234')
  })

  test('works with E164 formatted phone value and coerces correctly', async () => {
    const phone = yupPhone({ required: true })
    const result = await phone.validate('+17871231234')

    expect(result).toBe('+17871231234')
  })

  test('works for US phone', async () => {
    const phone = yupPhone({ required: true })
    const result = await phone.validate('425-123-1234')

    expect(result).toBe('+14251231234')
  })

  test('throws with invalid phone', async () => {
    const phone = yupPhone({ required: true })

    await expect(phone.validate('1234')).rejects.toThrow()
  })

  test('throws if invalid even if not required', async () => {
    const phone = yupPhone({ required: false })

    await expect(phone.validate('1234')).rejects.toThrow()
  })

  test('throws on string too long', async () => {
    const phone = yupPhone({ required: false })

    await expect(
      phone.validate('123456789012345678901234567890123456789012345678901')
    ).rejects.toThrow()
  })

  test('valid if not required', async () => {
    const phone = yupPhone({ required: false })

    const result = await phone.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })
})
