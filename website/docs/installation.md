---
sidebar_position: 2
---

# Installation

Blaze slider can either be used as an NPM module or just by including it's JS and CSS files on your website

## Installing NPM module

Install the blaze-slider as a dependency in your project

```bash
npm i blaze-slider
```

### Using library via NPM module

```javascript
import BlazeSlider from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'
```

:::info

You MUST import the blaze.css, without it slider will not work

:::

<br/>

## Using JS and CSS files directly

You can get the latest JS and CSS files of blaze slider from [unpkg.com](https://unpkg.com/) as shown below:

| Asset               | Link                                                           |
| ------------------- | -------------------------------------------------------------- |
| JS Production build | https://unpkg.com/blaze-slider@latest/dist/blaze-slider.min.js |
| JS Dev build        | https://unpkg.com/blaze-slider@latest/dist/blaze-slider.dev.js |
| CSS                 | https://unpkg.com/blaze-slider@latest/dist/blaze.css           |

If you want a specific version of blaze-slider library, replace the `latest` with a version instead, For Example: https://unpkg.com/blaze-slider@0.1.6/dist/blaze-slider.min.js

JS Development build is not minified and it contains extra code that logs warnings in console to alert wrong configurations. It is only meant to be used during development.

### Using Library with JS and CSS files

Once you add the JS build in your website, a global constructor function `BlazeSlider` will be available. you can use this to initialize the sliders on desired slider elements as mentioned in [this tutorial](/docs/Tutorial/initialize-slider)

:::info

Though you can directly use these links to load CSS and JS in your website, it is better to self host these files to avoid third party network connections

:::
