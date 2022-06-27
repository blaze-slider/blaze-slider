---
sidebar_position: 2
---

# Installation

Blaze slider can either be used as an NPM module for modern web app or just by including it's JS and CSS files for traditional websites

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

JS Development build is non-minified and it contains extra code that logs warnings in console when to alert wrong configurations to developer.

### Using Library with JS and CSS files

Once you add the JS build in your website, a global constructor function `BlazeSlider` will be available. you can use this to initialize the sliders on desired slider elements as mentioned in [this tutorial](/docs/Tutorial/initialize-slider)

<br/>

If you want a specific version of blaze-slider library, replace the `latest` with a version instead as shown in example below:

https://unpkg.com/blaze-slider@0.1.6/dist/blaze-slider.min.js

:::info

Though you can directly use these links to load CSS and JS in your website, it is better to self host these files to avoid third party network connections

:::
