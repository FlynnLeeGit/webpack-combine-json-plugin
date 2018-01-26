const path = require('path')
const fse = require('fs-extra')

const WebpackCombineJsonPlugin = class {
  constructor(config = {}) {
    this.config = Object.assign(
      {
        filename: 'manifest.json',
        assets: [],
        verbose: true
      },
      config
    )
    if (!this.config.assets.length) {
      console.log('[WebpackJsonCombinePlugin]', 'no assets input')
    }
  }
  apply(compiler) {
    compiler.plugin('done', compilation => {
      const outputPath = compiler.options.output.path
      const filepath = path.join(outputPath, this.config.filename)

      let final = {}
      this.config.assets.forEach(asset => {
        const assetPath = path.join(outputPath, asset)

        let assetJson = {}
        if (path.extname(asset) !== '.json') {
          console.error(
            `\n [WebpackJsonCombinePlugin] file ${assetPath} is not a json,  use default {} \n`
          )
          return
        }
        if (!fse.existsSync(assetPath)) {
          console.error(
            `\n [WebpackJsonCombinePlugin] file ${assetPath} not found, use default {} \n`
          )
          return
        }
        assetJson = JSON.parse(fse.readFileSync(assetPath, 'utf-8'))

        final = Object.assign(final, assetJson)
      })
      fse.outputJsonSync(filepath, final, { spaces: 2 })
    })
  }
}

module.exports = WebpackCombineJsonPlugin
