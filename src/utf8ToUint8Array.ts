import { BITS_IN_BYTE, UTF8_SIGNIFICANT_BITS_SIZE } from './constants'

export const utf8ToUint8Array = (dataString: string): Uint8Array => {
  const { length } = dataString
  const uint8Array = new Uint8Array(length - Math.trunc((length / BITS_IN_BYTE)) - 1)
  let bits = 0
  let byteIndex = 0
  let bitsIndex = 0

  for (let index = 0; index < length; index++) {
    bitsIndex += UTF8_SIGNIFICANT_BITS_SIZE
    bits = (bits << UTF8_SIGNIFICANT_BITS_SIZE) | (dataString.charCodeAt(index) & 0x7F)
      
    if (bitsIndex >= BITS_IN_BYTE) {
      bitsIndex = bitsIndex - BITS_IN_BYTE

      const byte = bits >>> bitsIndex

      bits ^= byte << bitsIndex
      uint8Array[byteIndex] = byte
      byteIndex += 1
    }
  }
    
  return uint8Array
}
  