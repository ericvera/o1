const { yupEmail } = require('./index')

describe('yupEmail', () => {
  test('works with email value', async () => {
    const email = yupEmail({ required: true })
    const result = await email.validate('er@as.io')

    expect(result).toBe('er@as.io')
  })

  test('works with email value and trims', async () => {
    const email = yupEmail({ required: true })
    const result = await email.validate('    asdfasdf@asdfafdas.com ')

    expect(result).toBe('asdfasdf@asdfafdas.com')
  })

  test('throws if required, but not provided', async () => {
    const email = yupEmail({ required: true })

    await expect(email.validate(undefined)).rejects.toThrow()
  })

  test('throws with invalid email', async () => {
    const email = yupEmail({ required: true })

    await expect(email.validate('  e@dc ')).rejects.toThrow()
  })

  test('valid if not required', async () => {
    const email = yupEmail({ required: false })

    const result = await email.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })
})
