const getE164Phone = require('./getE164Phone')

describe('getE164Phone', () => {
  test('works with E164 phone', () => {
    const phone = getE164Phone('+14251231234')

    expect(phone).toBe('+14251231234')
  })

  test('works with format with country code', () => {
    const phone = getE164Phone('+1 (425)123-1234')

    expect(phone).toBe('+14251231234')
  })

  test('works for US phone', () => {
    const phone = getE164Phone('425-123-1234')

    expect(phone).toBe('+14251231234')
  })

  test('works for PR phone', () => {
    const phone = getE164Phone('7874321234')

    expect(phone).toBe('+17874321234')
  })

  test('empty with invalid phone', () => {
    const phone = getE164Phone('874321234')

    expect(phone).toBeUndefined()
  })
})
