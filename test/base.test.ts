import { uint8ArrayToUtf8, utf8ToUint8Array } from '../src'

const check = (input: Uint8Array) => {
  const uint8Str = uint8ArrayToUtf8(input)
  const output = utf8ToUint8Array(uint8Str)

  expect(input).toEqual(output)
}

describe('base', () => {
  it('empty', () => {
    check(new Uint8Array())
  })

  it('1 zero byte', () => {
    check(new Uint8Array([0]))
  })

  it('0xff byte', () => {
    check(new Uint8Array([0xff]))
  })

  it('1000 bytes', () => {
    const bytes: number[] = []

    for (let index = 0; index < 1000; index++) {
      bytes.push(index % 256)
    }

    check(new Uint8Array(bytes))
  })

  it('3000 bytes', () => {
    const bytes: number[] = []

    for (let index = 0; index < 3000; index++) {
      if (index > 2000) {
        bytes.push(0)
      } else if (index > 1000) {
        bytes.push(index % 256)
      } else {
        bytes.push(0)
      }
    }

    check(new Uint8Array(bytes))
  })
})
