---
sidebar_position: 2
---

# Installation

Blaze slider can either be used as an NPM module or just by including its JS and CSS files on your website

## Installing NPM module

Install the blaze-slider as a dependency in your project

```bash
npm i blaze-slider
```

### Using the library via NPM module

```javascript
import BlazeSlider from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'
```

:::info

You MUST import the blaze.css, without it slider will not work

:::

See [this sandbox](https://codesandbox.io/s/blaze-slider-npm-playground-hm60ip?file=/src/index.js) for example.

<br/>

## Using JS and CSS files directly

You can get the latest JS and CSS files of Blaze Slider from [unpkg.com](https://unpkg.com/) as shown below:

| Asset               | Link                                                           |
| ------------------- | -------------------------------------------------------------- |
| JS Production build | https://unpkg.com/blaze-slider@latest/dist/blaze-slider.min.js |
| JS Dev build        | https://unpkg.com/blaze-slider@latest/dist/blaze-slider.dev.js |
| CSS                 | https://unpkg.com/blaze-slider@latest/dist/blaze.css           |

If you want a specific version of the `blaze-slider` library, replace the `latest` with a version instead, For Example https://unpkg.com/blaze-slider@0.1.6/dist/blaze-slider.min.js

JS Development build is not minified and it contains extra code that logs warnings in the console to alert wrong configurations. It is only meant to be used during development.

### Using Library with JS and CSS files

Once you add the JS build to your website, a global constructor function `BlazeSlider` will be available. you can use this to initialize the sliders on desired slider elements as mentioned in [this tutorial](/docs/Tutorial/initialize-slider)

See [this sandbox](https://codesandbox.io/s/blaze-slider-playground-ps0b9u) for example.

:::info

Though you can directly use these links to load CSS and JS files to your website, it is better to self-host these files to avoid third-party network connections

:::
