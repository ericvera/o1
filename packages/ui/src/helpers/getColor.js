import { Color } from './constants'

export default (colors, color) => {
  if (!Object.values(Color).includes(color)) {
    throw Error(
      `[getColor] Unsupported color value: ${color}. Expected one of ${Object.values(
        Color
      )}.`
    )
  }

  return colors[color]
}
