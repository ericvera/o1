const { yupEnum } = require('./index')

// TODO: Add tests below
// TODO: Publish

const SampleEnum = {
  a: 'a',
  other: 'different'
}

describe('yupEnum', () => {
  test('works with numvalue', async () => {
    const enumVal = yupEnum('some name', SampleEnum, { required: true })
    const result = await enumVal.validate('a')

    expect(result).toBe('a')
  })

  test('works with enumVal with value different to key', async () => {
    const enumVal = yupEnum('some name', SampleEnum, { required: true })
    const result = await enumVal.validate('different')

    expect(result).toBe('different')
  })

  test('throws if required, but not provided', async () => {
    const enumVal = yupEnum('some name', SampleEnum, { required: true })

    await expect(enumVal.validate(undefined)).rejects.toThrow()
  })

  test('throws with invalid enumVal', async () => {
    const enumVal = yupEnum('some name', SampleEnum, { required: true })

    await expect(enumVal.validate('not-valid')).rejects.toThrow()
  })

  test('valid if not required', async () => {
    const enumVal = yupEnum('some name', SampleEnum, { required: false })

    const result = await enumVal.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })
})
