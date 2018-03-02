# globes-game

*Work in progress.*


## Installation
`npm i globes-game`

## Usage

```javascript

const globesGame = require('globes-game');

import  globesGame  from 'globes-game';

```

## Adding Preact
1. Install packages:
`npm i preact babel-plugin-transform-react-jsx`
`npm i -D eslint-plugin-react`
2. Modify `tools/webpack.config.js`. Add option to javascript loader:
```javascript
  plugins: [
    ['transform-react-jsx', {
      pragma: 'h'
    }]
]
```
