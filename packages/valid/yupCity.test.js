const { yupCity } = require('./index')

describe('yupCity', () => {
  test('works with city value', async () => {
    const city = yupCity({ required: true })
    const result = await city.validate('Vega baja')

    expect(result).toBe('Vega baja')
  })

  test('works with city value and trims', async () => {
    const city = yupCity({ required: true })
    const result = await city.validate('   Valle Arriba ')

    expect(result).toBe('Valle Arriba')
  })

  test('throws if required, but not provided', async () => {
    const city = yupCity({ required: true })

    await expect(city.validate(undefined)).rejects.toThrow()
  })

  test('valid if not required', async () => {
    const city = yupCity({ required: false })

    const result = await city.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })
})
