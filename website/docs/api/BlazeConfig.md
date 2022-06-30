---
sidebar_position: 2
---

# BlazeConfig

BlazeConfig is an object that contains the slider configuration for various types of media.

```typescript
type BlazeConfig = Record<string, MediaConfig>
```

The key of this object can be any valid media query string and the value is the configuration object for that media.

If the `BlazeSlider` is not given any configuration as the second argument, the below-shown default configuration is used.

## Default Config

```js
const defaultConfig = {
  all: {
    // layout
    slidesToShow: 1,
    slidesToScroll: 1,
    slideGap: '20px',

    // loop
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

Notice the `all` key in the configuration above, it is one of the 3 [media-types](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types). It targets all devices. You may have seen media types ( `all`, `print` and `screen` ) when writing media queries in CSS

The key can be any valid [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#syntax) string, which means that you can also combine different media queries using the [logical operators](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#logical_operators) such as `only`, `not`, `and`, `,`

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

<hr/>

## Cascading Configurations

Other Slider libraries force you to write responsive configuration based on the `width` of the media and force you to write either a mobile-first or desktop-first config.

Blaze Slider has no such concept desktop-first or mobile-first config. You can write any kind of config and even mix and match - just like how you would write a CSS media query.

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

As you can see it looks a lot like CSS and it works exactly like CSS, the properties cascade

So in the example above, the blaze-slider will

- show 3 slides on desktop, loop enabled
- show 2 slides on a tablet, loop enabled
- show 1 slide on a mobile device, loop disabled

Because

- On a desktop device, only the first media query matches, so the desktop gets the first media query's configuration as is.
- On a tablet device, the first and second media query match, but because the second one comes after the first one, it overrides the first one's value of `slidesToShow` and inherits the value of `loop`.
- On a mobile device, the first and third media query match, but both values of the first media queries get overridden by the third media query config

This configuration above is written in a desktop-first style. But you can just as well write a mobile-first config using `min-width` instead as shown below, just like how you do it in CSS.

### Example: Same config written in the mobile-first style

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

As you can see, This allows you to write the Responsive configuration in a very intuitive way.

But if you rather be explicit than rely on the cascade, you can target a specific media in a media-query configuration

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

<hr/>

## Going beyond the width-based configuration

Because blaze-slider allows you to use any valid media-queries, rather than just width.

you can target all kinds of media that's simply not possible with other libraries.

such as targeting:

- a phone in landscape orientation
- a device where use prefers a reduced motion
- a device based on its height
- a device where a user can hover

etc...
