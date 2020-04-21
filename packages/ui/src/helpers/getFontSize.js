import { FontSizeLevel } from './constants'

export default (level, base = 16) => {
  switch (level) {
    case FontSizeLevel.l1:
      return base * 0.618
    case FontSizeLevel.l2:
      return base * 1
    case FontSizeLevel.l3:
      return base * 1.618
    case FontSizeLevel.l4:
      return base * 2.617
    default:
      throw Error(
        `[getFontSize] Unsupported font size level: ${level}. Expected one of ${Object.values(
          FontSizeLevel
        )}.`
      )
  }
}
