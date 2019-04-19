const { yupState } = require('./index')

describe('yupState', () => {
  test('works with state value', async () => {
    const state = yupState({ required: true })
    const result = await state.validate('os')

    expect(result).toBe('OS')
  })

  test('works with state value and trims', async () => {
    const state = yupState({ required: true })
    const result = await state.validate('   Pr ')

    expect(result).toBe('PR')
  })

  test('throws if required, but not provided', async () => {
    const state = yupState({ required: true })

    await expect(state.validate(undefined)).rejects.toThrow()
  })

  test('throws with invalid state', async () => {
    const state = yupState({ required: true })

    await expect(state.validate('  Sas ')).rejects.toThrow()
  })

  test('throws with state too short', async () => {
    const state = yupState({ required: false })

    await expect(state.validate('P')).rejects.toThrow()
  })

  test('valid if not required', async () => {
    const state = yupState({ required: false })

    const result = await state.validate(undefined, { required: false })
    expect(result).toBeUndefined()
  })
})
