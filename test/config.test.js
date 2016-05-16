import { expect } from 'chai'
import { createConfig, updatePath, default as config } from '../src/config'
import { resolve } from 'path'


describe('minitee config', () => {
  it('should return the object merged', () => {
    const a1 = { test: 'x', plz: 'bb' }
    const a2 = { test: 'y', plzz: 'b' }
    const result = createConfig(a1, a2)
    const expected = { test: 'y', plz: 'bb', plzz: 'b' }

    expect(result).to.deep.equal(expected)
  })

  it('should return the path updated', () => {
    const a1 = { test: 'y', src: 'src', dest: 'lib' }
    const rootDir = '/'
    const result = updatePath(rootDir, a1)
    const expected = { test: 'y', src: resolve('/', 'src'), dest: resolve('/', 'lib')}
    expect(result).to.deep.equal(expected)
  })

  it('should return the config object updated', () => {
    const expected = { src: resolve(process.cwd(), './templates'), dest: resolve(process.cwd(), '.') }
    expect(config).to.deep.equal(expected)
  })
})
