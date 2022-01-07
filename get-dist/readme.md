# Get Blaze Slider dist files

## clone the repo to your local machine

```bash
git clone https://github.com/blaze-slider/blaze-slider.git
```

<br/>

## Specify the version

go to `get-dist` folder

Specify the version in the package.json > dependencies > blaze-slider

(By default it is set to "latest")

```json
{
  "name": "get-dist",
  "dependencies": {
    "blaze-slider": "latest"
  }
}
```

<br/>

## Install

```
cd get-dist
npm i
```

<br/>

## Get the dist files

Go to `node_modules/blaze-slider/dist`

<br/>

### Get JS

| File                | where to use |
| ------------------- | ------------ |
| blaze-slider.min.js | production   |
| blaze-slider.dev.js | development  |

`blaze-slider.dev.js` contains extra warning messages that alerts the developer when blaze-slider is not configured properly. while `blaze-slider.min.js` does not contain any warnings and is minified to reduce the size of JavaScript bundle. Both are Functionally equivalent.

<br/>

### Get CSS

get the `blaze-slider.min.css`
