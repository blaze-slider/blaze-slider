---
sidebar_position: 2
---

# BlazeConfig

BlazeConfig is an object that contains configuration for various media types. The key can be any valid media query and the value is the configuration object.

If the `BlazeSlider` is not given any configuration as the second argument, below show default configuration will be applied

## Default Config

```js
const defaultConfig = {
  all: {
    // layout
    slidesToShow: 1,
    slidesToScroll: 1,
    slideGap: '20px',

    // behavior
    loop: true,

    // autoplay
    enableAutoplay: false,
    stopAutoplayOnInteraction: true,
    autoplayInterval: 3000,
    autoplayDirection: 'to left',

    // pagination
    enablePagination: true,

    // transition
    transitionDuration: 500,
    transitionTimingFunction: 'ease',
  },
}
```

Notice the `all` key in configuration above, it is one of the 3 [media-types](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types) that targets all kinds of devices. You may have seen media types such as `all`, `print` and `screen` when writing media queries in css.

The key can be any valid [media query syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#syntax) which means that you can also combine different media queries using the [logical operators](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#logical_operators) such as `only`, `not`, `and`, `,`

### Examples of valid media query keys

```javascript
'all'
'(max-width: 991px)'
'(min-width: 500px)'
'(max-width: 700px) and (min-width: 500px)'
'(orientation: landscape)'
'(orientation: landscape) and (max-height: 500px)'
'(min-height: 25rem)'
'(hover: hover)'
'(prefers-contrast: more)'
'prefers-reduced-motion'
'(pointer: fine)'
etc...
```

## Responsive Configurations

Other Slider libraries force you write some the config in some esoteric "width" based configuration, and force you to write either a mobile first or desktop first config. In Blaze Slider there is no such concept as being desktop first or mobile first config. You can write any kind of config and mix match - just like how you would write a css media query.

### Example: A Desktop first Config

```javascript
const exampleConfig = {
  all: {
    loop: true
    slidesToShow: 3,
  },
  '(max-width: 900px)': {
    slidesToShow: 2,
  },
  '(max-width: 500px)': {
    loop: true
    slidesToShow: 1,
  },
}
```

As you can see it looks a lot of like CSS and it works exactly like CSS, the properties cascade

So in the example above, blaze-slider will

- show 3 slides on desktop, loop enabled
- show 2 slides on tablet, loop enabled
- show 1 slide on the mobile device, loop disabled

To understand why, just treat this configuration like you would treat a css media query

In desktop device, only the first media query matches, so it shows 1 slide with loop enabled.

In tablet device, first and second media query matches, but because the second one comes after first one, it overrides the first one's value of `slidesToShow` and inherits the value of `loop`

### Example: Same config written in mobile-first style

This configuration above is written in a desktop-first style. But you can just as well write a mobile first config using `min-width` instead as shown below (just like css)

```javascript
const exampleConfig = {
  all: {
    loop: true,
    slidesToShow: 1,
  },
  '(min-width: 500px)': {
    loop: false,
    slidesToShow: 2,
  },
  '(min-width: 900px)': {
    slidesToShow: 3,
  },
}
```

As you can see, This allows you to write the Responsive configuration in very intuitive way, just like you would write CSS

But if you rather be explicit than relying on cascade, you can do it as well, just like how you do it in css as shown below:

```javascript
const exampleConfig = {
  // desktop
  '(min-width: 900px)': {
    loop: true,
    slidesToShow: 3,
  },
  // tablet
  '(min-width: 700px) and (max-width: 900px)': {
    loop: false,
    slidesToShow: 2,
  },
  // phone
  '(max-width: 500px)': {
    loop: false,
    slidesToShow: 3,
  },
}
```

### Going beyond the width based configuration

Because blaze-slider allows you to use any valid media-queries, rather than just width.

you can target all kinds of media that is simply not possible with other libraries. such as targeting a phone in landscape mode, targeting a device where use prefers reduce motion, targeting a device based on height, targeting a device where a user has capability to hover etc.
