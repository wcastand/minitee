
import { templates, parseData } from './utils'
import { error, success, neutral, infos } from './console'
export default (options) => {
    infos("List des templates:")
    templates.map(x => {
      infos("  - %s", x.name)
      if(options.all)
        x.attr.map(y => neutral("    | %s", y))
    })
  }
