## webpack-combine-json-plugin

#### combine final json assets in to one json,can be any file in dist folder

install

```shell
yarn add webpack-combine-json-plugin
# or
npm installl webpack-combine-json-plugin
```

use

```js
const WebpackCombineJsonPlugin = require('webpack-combine-json-plugin')
// webpack.config.js
{
  plugins:[
    new WebpackCombineJsonPlugin({
      filename:'manifest.json' // default manifest.json,
      assets: [ // default []
        '.js.manifest.json', // relative path from dist path
        '.style.manifest.json',
      ],
      verbose: ture // default true
    })
  ]
}
```

if you have more than one compilation,should use this plugin in every compilation for async reason,
because we don't know which compilation will be first completed

```js
// multiply compilation
[
  // first
  {
    //...
    plugins:[
      new WebpackCombineJsonPlugin({
        filename:'manifest.json',
        assets:['.js.manifest.json','.style.manifest.json']
      })
    ]
    //...
  },
  // second
  {
    //...
    plugins:[
       filename:'manifest.json',
       assets:['.js.manifest.json','.style.manifest.json']
    ]
    //...
  }
]


```
