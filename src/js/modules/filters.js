// import { prettyCurrency } from '@/utils'
// import moment from 'moment'

const filters = {
  // currency(value = '') {
  //   return prettyCurrency(value)
  // },
  lowercase(value = '') {
    return value.toLowerCase()
  },
  uppercase(value = '') {
    return value.toUpperCase()
  },
  capitalize(value = '') {
    return value.replace(/\b\w/g, l => l.toUpperCase())
  },
  replace(value = '', pattern = '_', new_char = ' ', flags = 'g') {
    const regex = new RegExp(pattern, flags)
    return value.replace(regex, l => new_char)
  },
  pluralize(value = 0, noun = 'item') {
    let output = `${value} ${noun}`
    if (value !== 1) output = output + 's'
    return output
  }
  // ordinal(value = '') {
  //   const options = ['th', 'st', 'nd', 'rd']
  //   const remainder = value % 100
  //   return value + (options[(remainder - 20) % 10] || options[remainder] || options[0])
  // },
  // moment(value = '', format = 'l') {
  //   let output
  //   if (value) output = moment.utc(value).format(format)
  //   return output
  // }
}

export { filters }
