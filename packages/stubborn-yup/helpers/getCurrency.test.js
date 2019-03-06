const getCurrency = require('./getCurrency')

describe('getCurrency', () => {
  test('works with value currency', () => {
    const currencyVal = getCurrency('123.12')

    expect(currencyVal).toEqual('123.12')
  })

  test('works with value that does not include two decimal places', () => {
    const currencyVal = getCurrency('123.1')

    expect(currencyVal).toEqual('123.10')
  })

  test('works with values including commas', () => {
    const currencyVal = getCurrency('1,000')

    expect(currencyVal).toEqual('1000.00')
  })

  test('works with commas and dots', () => {
    const currencyVal = getCurrency('1,800.93')

    expect(currencyVal).toEqual('1800.93')
  })

  test('works with numbers', () => {
    const currencyVal = getCurrency(3412.4)

    expect(currencyVal).toEqual('3412.40')
  })

  test('works with tiny numbers', () => {
    const currencyVal = getCurrency(0.000001)

    expect(currencyVal).toEqual('0.00')
  })

  test('returns null with malformed numbers', () => {
    const currencyVal = getCurrency('12..2')

    expect(currencyVal).toBeNull()
  })

  test('returns null with malformed numbers', () => {
    const currencyVal = getCurrency('12.sd')

    expect(currencyVal).toBeNull()
  })

  test('returns null with non-numbers', () => {
    const currencyVal = getCurrency('asdf')

    expect(currencyVal).toBeNull()
  })

  test('returns null with undefined', () => {
    const currencyVal = getCurrency()

    expect(currencyVal).toBeNull()
  })

  test('works with negative number strings', () => {
    const currencyVal = getCurrency('-123')

    expect(currencyVal).toEqual('-123.00')
  })

  test('works with negative numbers', () => {
    const currencyVal = getCurrency(-0.43)

    expect(currencyVal).toEqual('-0.43')
  })

  test('returns null with objects', () => {
    const currencyVal = getCurrency({ val: 123 })

    expect(currencyVal).toBeNull()
  })
})
