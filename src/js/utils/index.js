// just chill

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
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
