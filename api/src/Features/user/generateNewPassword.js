export const generatePassword = (length = 12) => {
  if (length < 4) throw new Error('length debe ser >= 4')

  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  const symbols = '!@#$%&*()-_+[]{};:<>/?'
  const all = lower + upper + digits + symbols

  const chars = [
    lower[crypto.randomInt(lower.length)],
    upper[crypto.randomInt(upper.length)],
    digits[crypto.randomInt(digits.length)],
    symbols[crypto.randomInt(symbols.length)]
  ]

  for (let i = chars.length; i < length; i++) {
    chars.push(all[crypto.randomInt(all.length)])
  }

  // Fisher-Yates con crypto.randomInt (shuffle uniforme real)
  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1)
        ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }

  return chars.join('')
}
