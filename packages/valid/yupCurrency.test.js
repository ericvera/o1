const { yupCurrency } = require('./index')

describe('yupCurrency', () => {
  test('works with currency value', async () => {
    const currency = yupCurrency('price', { required: true })
    const result = await currency.validate('1.12')
    expect(result).toBe('1.12')
  })

  test('works with 0', async () => {
    const currency = yupCurrency('price', { required: true })
    const result = await currency.validate('0.00')
    expect(result).toBe('0.00')
  })

  test('works with numbers', async () => {
    const currency = yupCurrency('price', { required: true })
    const result = await currency.validate(-123.54)
    expect(result).toBe('-123.54')
  })

  test('works with values with commas', async () => {
    const currency = yupCurrency('price', { required: true })
    const result = await currency.validate('432,121,123.54')
    expect(result).toBe('432121123.54')
  })

  test('works with currency value and trims', async () => {
    const currency = yupCurrency('price', { required: true })
    const result = await currency.validate(' 0.12 ')
    expect(result).toBe('0.12')
  })

  test('works if not required', async () => {
    const currency = yupCurrency('price', { required: false })
    const result = await currency.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })

  test('throws if field name is not a string (e.g. accidentally pass options)', () => {
    expect(() => {
      yupCurrency({ required: true })
    }).toThrow()
  })

  test('throws with value greater than min (user defined min)', async () => {
    const currency = yupCurrency('price', { required: true, min: '0.00' })

    const result = await currency.validate('0')
    expect(result).toBe('0.00')
  })

  test('throws if required, but not provided', async () => {
    const currency = yupCurrency('price', { required: true })
    await expect(currency.validate(undefined)).rejects.toThrow()
  })

  test('throws with invalid currency', async () => {
    const currency = yupCurrency('price', { required: true })
    await expect(currency.validate('  -sad')).rejects.toThrow()
  })

  test('throws with invalid currency that kind of looks liek a number', async () => {
    const currency = yupCurrency('price', { required: true })
    await expect(currency.validate('12432.s*')).rejects.toThrow()
  })

  test('throws with numbers too long', async () => {
    const currency = yupCurrency('price', { required: true })
    await expect(currency.validate('123456789012345678901')).rejects.toThrow()
  })

  test('throws with more than 2 decimal places', async () => {
    const currency = yupCurrency('price', { required: true })
    await expect(currency.validate('123456789.432')).rejects.toThrow()
  })

  test('throws with numbers too long (user defined length)', async () => {
    const currency = yupCurrency('price', { required: true, maxLength: 4 })
    await expect(currency.validate('12345')).rejects.toThrow()
  })

  test('throws with value too small (user defined min)', async () => {
    const currency = yupCurrency('price', { required: true, min: '0.02' })
    await expect(currency.validate('0.01')).rejects.toThrow()
  })

  test('throws with value too small (user defined min) even if not required', async () => {
    const currency = yupCurrency('price', { required: false, min: '0.02' })
    await expect(currency.validate('0.01')).rejects.toThrow()
  })
})
