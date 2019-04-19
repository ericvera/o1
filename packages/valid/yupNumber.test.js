const { yupNumber } = require('./index')

describe('yupNumber', () => {
  test('works with number value', async () => {
    const text = yupNumber('somename', { required: true })
    const result = await text.validate(33)

    expect(result).toBe(33)
  })

  test('works with number value as string', async () => {
    const text = yupNumber('somename', { required: true })
    const result = await text.validate('1')

    expect(result).toBe(1)
  })

  test('works with number value as text and trims', async () => {
    const text = yupNumber('somename', { required: true })
    const result = await text.validate('   5 ')

    expect(result).toBe(5)
  })

  test('works with decimal values by default', async () => {
    const text = yupNumber('somename', { required: true })
    const result = await text.validate('1.32')

    expect(result).toBe(1.32)
  })

  test('works and strip values that are integer, but include decimal places', async () => {
    const text = yupNumber('somename', { required: true })
    const result = await text.validate('54234.00')

    expect(result).toBe(54234)
  })

  test('works if not required', async () => {
    const text = yupNumber('somename', { required: false })

    const result = await text.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })

  test('throws if field name is not a number (e.g. accidentally pass options)', () => {
    expect(() => {
      yupNumber({ required: true })
    }).toThrow()
  })

  test('throws if not a number', async () => {
    const text = yupNumber('somename', { required: true })

    await expect(text.validate('32p')).rejects.toThrow()
  })

  test('throws if not an integer and integer is required', async () => {
    const text = yupNumber('somename', { required: true, mustBeInteger: true })

    await expect(text.validate('432.8')).rejects.toThrow()
  })

  test('throws if required, but not provided', async () => {
    const text = yupNumber('somename', { required: true })

    await expect(text.validate(undefined)).rejects.toThrow()
  })
})
