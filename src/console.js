import { blue, red, green, yellow, cyan } from 'chalk'

export const infos   = (str, ...args) => console.log(blue(str), ...args)
export const neutral = (str, ...args) => console.log(cyan(str), ...args)
export const warning = (str, ...args) => console.log(yellow(str), ...args)
export const error   = (str, ...args) => console.log(red(str), ...args)
export const success = (str, ...args) => console.log(green(str), ...args)
