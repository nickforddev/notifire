
/**
 * Async timeout
 *
 * @async
 * @param {Number} ms    how long to sleep
 * @returns {Promise}    no data in promise
 */
export const sleep = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * get file metadata by path
 *
 * @param {String} path   path string
 * @param {Array} files   files array
 * @returns {Object}      file metadata
 */
export const pathToData = (path = '', files = []) => {
  const data = recursiveArrayFind(path.split('/').slice(1), files)
  return data
}

/**
 * search array recursively
 *
 * @param {Array} path_array  path split into an array
 * @param {Array} files       files array
 * @returns {Array|Object}    either recursive self call or match
 */
function recursiveArrayFind (path_array = [], files = []) {
  if (path_array.length) {
    const match = files.find(file => {
      return path_array[0] === file.name
    })
    path_array = path_array.slice(1)
    if (path_array.length && match) {
      return recursiveArrayFind(path_array, match.data)
    } else {
      return match
    }
  }
}
