import fs from 'fs'
import mkdirp from 'mkdirp'

import { templates, parseData } from './utils'
import { error, success, neutral, infos } from './console'

export default (cmd, args) => {
    let status = templates.reduce((x, y) => y.name === cmd || x, false)
    const targets = templates.filter(x => x.name.toUpperCase() === cmd.toUpperCase())
    const vv = args.reduce((x, y) => {
      const [a, b] = y.split(':')
      x[a] = b
      return x
    }, {})
    if(status){
      success("%s templates found", targets.length)
      targets.map(x => {
        const { filename, data } = parseData(vv, x.attr, `${x.destination}/${x.attributes.filename}`, x.body)

        mkdirp(x.destination, (err) =>
          fs.writeFile(filename, data, (err) =>
            infos('file created at %s', filename)
          )
        )

      })
    }
    else
      return error("Error, the template doesn't exist.")
  }
