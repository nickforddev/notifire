import utils from '../index'
import glob from 'glob'

// utils
describe('utils.sleep', () => {
  it('should work with then', done => {
    utils.sleep(5)
      .then(() => {
        done()
      })
  })

  it('should work with await', async done => {
    await utils.sleep(5)
    done()
  })
})

describe('utils.Deferred', () => {
  it('should return a promise', () => {
    const deferred = new utils.Deferred()
    expect(deferred.promise)
      .toBeInstanceOf(Promise)
  })

  it('should resolve the promise', async () => {
    expect.assertions(1)
    const asyncFunc = (msg) => {
      const deferred = new utils.Deferred()
      utils.sleep(5)
        .then(() => {
          deferred.resolve(msg)
        })
      return deferred.promise
    }
    const msg = await asyncFunc('test')
    expect(msg)
      .toBe('test')
  })

  it('should reject the promise', () => {
    expect.assertions(1)
    const asyncFunc = (msg) => {
      const deferred = new utils.Deferred()
      deferred.reject(msg)
      return deferred.promise
    }

    asyncFunc('test')
      .catch(error => {
        expect(error)
          .toBe('test')
      })
  })
})

describe('utils.asyncCallback', () => {
  it('should turn a callback into async', async () => {
    expect.assertions(1)
    const callbackFunc = (param, callback) => {
      return callback(false, param)
    }
    const asyncFunc = (param) => {
      return utils.asyncCallback(callbackFunc, param)
    }
    const msg = await asyncFunc('test')
    expect(msg)
      .toBe('test')
  })
})

describe('utils.transformAsync', () => {
  it('should transform contents of promise', async () => {
    expect.assertions(1)
    const callbackFunc = (param, callback) => {
      return callback(false, param)
    }
    const asyncFunc = (param) => {
      return utils.transformAsync(
        utils.asyncCallback(callbackFunc, param),
        (array) => {
          return array.sort((a, b) => {
            return a > b
          })
        }
      )
    }
    const arr = await asyncFunc([3, 2, 1])
    expect(arr)
      .toEqual([1, 2, 3])
  })
})

// fs
describe('utils.mkdir', () => {
  it('should make a new directory asynchronously', async () => {
    expect.assertions(1)
    await utils.mkdir('./___testing___')
    const files = await utils.asyncCallback(glob, './___testing___')
    expect(files)
      .toEqual([
        './___testing___'
      ])
  })

  it('should make another directory asynchronously', async () => {
    expect.assertions(1)
    await utils.mkdir('./___testing___/test')
    const files = await utils.asyncCallback(glob, './___testing___/*')
    expect(files)
      .toEqual([
        './___testing___/test'
      ])
  })
})

describe('utils.writeFile', () => {
  it('should write a file asynchronously', async () => {
    await utils.writeFile('./___testing___/test/test.txt', 'testing')
    const files = await utils.asyncCallback(glob, './___testing___/test/*')
    expect(files)
      .toEqual([
        './___testing___/test/test.txt'
      ])
  })
})

describe('utils.appendFile', () => {
  it('should write a file asynchronously', async () => {
    await utils.appendFile('./___testing___/test/test.txt', 'testing')
    const files = await utils.asyncCallback(glob, './___testing___/test/*')
    expect(files)
      .toEqual([
        './___testing___/test/test.txt'
      ])
  })
})

describe('utils.readFile', () => {
  it('should read a file asynchronously', async () => {
    const txt = await utils.readFile('./___testing___/test/test.txt')
    expect(txt)
      .toBe('testingtesting')
  })
})

describe('utils.readdir', () => {
  it('should read a directory and return relative paths', async () => {
    const files = await utils.readdir('./___testing___')
    expect(files)
      .toEqual([
        'test'
      ])
  })
})

describe('utils.readdirPaths', () => {
  it('should read a directory and return full paths', async () => {
    const files = await utils.readdirPaths('./___testing___')
    expect(files)
      .toEqual([
        './___testing___/test'
      ])
  })
})

describe('utils.readdirRecursive', () => {
  it('should read a directory recursively, asynchronously', async () => {
    const files = await utils.readdirRecursive('./___testing___')
    expect(files)
      .toEqual([
        './___testing___/test',
        './___testing___/test/test.txt'
      ])
  })
})

describe('utils.pathsToTree', () => {
  it('should turn paths array into tree', async () => {
    const files = await utils.readdirRecursive('___testing___')
    const tree = await utils.pathsToTree(files)
    expect(tree)
      .toEqual({
        '___testing___': {
          'data': {
            'test': {
              'path': '___testing___/test',
              'type': 'folder',
              'data': {
                'test.txt': {
                  'path': '___testing___/test/test.txt',
                  'type': 'file'
                }
              }
            }
          }
        }
      }
    )
  })
})

describe('utils.treeToArray', () => {
  it('should convert the tree structure to nested arrays', async () => {
    const files = await utils.getFilesData('___testing___/')

    expect(files)
      .toEqual([
        {
          'data': [
            {
              'ext': 'txt',
              'name': 'test.txt',
              'path': 'test/test.txt',
              'type': 'file'
            }
          ],
          'name': 'test',
          'path': 'test',
          'type': 'folder'
        }
      ]
    )
  })
})

describe('utils.rmrf', () => {
  it('should remove a file asynchronously', async () => {
    await utils.rmrf('./___testing___/')
    const files = await utils.asyncCallback(glob, './___testing___/*')
    expect(files)
      .toEqual([])
  })
})

// templates
describe('utils.createTemplate', () => {
  it('should create a new template', async () => {
    await utils.removeTemplate('___test___') // just in case :)
    await utils.createTemplate('___test___')
    const files = await utils.readdir('data/templates/___test___')
    expect(files)
      .toEqual([
        'data.json',
        'email',
        'push',
        'text'
      ])
  })

  it('should throw when template already exists', async () => {
    await expect(utils.createTemplate('___test___'))
      .rejects.toEqual(new Error('A template with that name already exists'))
  })
})

describe('utils.removeTemplate', () => {
  it('should remove a template', async () => {
    await utils.removeTemplate('___test___')
    const files = await utils.readdir('data/templates/')
    expect(!files.includes('___test___'))
      .toBe(true)
  })
})

// stylesheets
describe('utils.createStylesheet', () => {
  it('should create a new stylesheet with no extension', async () => {
    await utils.removeStylesheet('___test___.scss') // just in case :)
    await utils.createStylesheet('___test___')
    const files = await utils.readdir('data/styles/')
    expect(files.includes('___test___.scss'))
      .toBe(true)
  })

  it('should create a new stylesheet with an extension', async () => {
    await utils.removeStylesheet('___test___.css') // just in case :)
    await utils.createStylesheet('___test___.css')
    const files = await utils.readdir('data/styles/')
    expect(files.includes('___test___.css'))
      .toBe(true)
  })

  it('should throw when stylesheet already exists', async () => {
    await expect(utils.createStylesheet('___test___'))
      .rejects.toEqual(new Error('A stylesheet with that name already exists'))
  })
})

describe('utils.removeStylesheet', () => {
  it('should remove a stylesheet', async () => {
    await utils.removeStylesheet('___test___.scss')
    await utils.removeStylesheet('___test___.css')
    const files = await utils.readdir('data/styles/')
    expect(!files.includes('___test___.scss'))
      .toBe(true)
  })
})

// partials
describe('utils.createPartial', () => {
  it('should create a new template', async () => {
    await utils.removePartial('___test___') // just in case :)
    await utils.createPartial('___test___')
    const files = await utils.readdir('data/partials/')
    expect(files.includes('___test___'))
      .toBe(true)
  })

  it('should throw when Partial already exists', async () => {
    await expect(utils.createPartial('___test___'))
      .rejects.toEqual(new Error('A partial with that name already exists'))
  })
})

describe('utils.removePartial', () => {
  it('should remove a Partial', async () => {
    await utils.removePartial('___test___')
    const files = await utils.readdir('data/partials/')
    expect(!files.includes('___test___'))
      .toBe(true)
  })
})
