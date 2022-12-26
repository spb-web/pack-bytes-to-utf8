import { UTF8_SIGNIFICANT_BITS_SIZE } from './constants'

const setChar = (char: number, excludeCharacters: Set<number>) => excludeCharacters.has(char) 
  ? (0x8000 | char)
  : char

export const uint8ArrayToUtf8 = (bytes: Uint8Array, excludeCharacters = new Set<number>()): string => {
  const dataSize = bytes.length 
  const chars = new Uint16Array(dataSize + Math.trunc((dataSize / UTF8_SIGNIFICANT_BITS_SIZE)) + 1)
    
  let residue = 0
  let residueIndex = 0
  let charIndex = 0
  
  for(let byteIndex = 0; byteIndex < dataSize; byteIndex++) {
    const byte = bytes[byteIndex]

    residueIndex += 1
    chars[charIndex] = setChar(residue | (byte >>> residueIndex), excludeCharacters)
    charIndex += 1
    residue = (byte & ((2 ** residueIndex) - 1)) << (UTF8_SIGNIFICANT_BITS_SIZE - residueIndex) 
     
    if (residueIndex >= UTF8_SIGNIFICANT_BITS_SIZE) {
      chars[charIndex] = setChar(residue, excludeCharacters)
      charIndex += 1
      residueIndex = 0
      residue = 0
    }
  }

  if (residueIndex > 0) {
    chars[charIndex] = setChar(residue, excludeCharacters)
  }
  
  return String.fromCharCode.apply(null, chars)
}
