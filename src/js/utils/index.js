// import _ from 'lodash'
// just chill

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const pathToData = (path, files) => {
  // const _path = path.split('/').join('/data/').split('/').slice(2).join('/')
  const data = searchTree(path.split('/').slice(1), files)
  return data
  // const data = _.get(files, _path)
  // console.log(data)
  // console.log(path, JSON.parse(JSON.stringify(files)))
}

function searchTree (path_array, files) {
  if (path_array.length) {
    const match = files.find(file => {
      return path_array[0] === file.name
    })
    path_array = path_array.slice(1)
    if (path_array.length && match) {
      return searchTree(path_array, match.data)
    } else {
      return match
    }
  }
}
/*
export const processFolder = (object) => {
  let output = []
  for (let key in object) {
    let file = {}
    file.name = key
    if (typeof object[key] === 'string') {
      file.type = 'file'
      file.data = object[key]
    } else {
      file.type = 'folder'
      file.data = processFolder(object[key])
    }
    output.push(file)
  }
  return output
}
*/
