const { yupText } = require('./index')

describe('yupText', () => {
  test('works with text value', async () => {
    const text = yupText('somename', { required: true })
    const result = await text.validate('Vega baja')

    expect(result).toBe('Vega baja')
  })

  test('works with text value and trims', async () => {
    const text = yupText('somename', { required: true })
    const result = await text.validate('   Valle Arriba ')

    expect(result).toBe('Valle Arriba')
  })

  test('works if not required', async () => {
    const text = yupText('somename', { required: false })

    const result = await text.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })

  test('works if shorter than maxLength', async () => {
    const text = yupText('somename', { required: false, maxLength: 3 })

    const result = await text.validate('123', { required: false })
    expect(result).toBe('123')
  })

  test('throws if field name is not a string (e.g. accidentally pass options)', () => {
    expect(() => {
      yupText({ required: true })
    }).toThrow()
  })

  test('throws if required, but not provided', async () => {
    const text = yupText('somename', { required: true })

    await expect(text.validate(undefined)).rejects.toThrow()
  })

  test('throws if more than maxLength', async () => {
    const text = yupText('somename', { required: true, maxLength: 5 })

    await expect(text.validate('12345677')).rejects.toThrow()
  })
})
