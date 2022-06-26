import React from 'react'

export const FeatureList = [
  {
    className: 'fast',
    color: '#fc427b',
    title: 'High Performance',
    description: (
      <>
        Lightening fast slider initialization with zero layout shifts.
        <span className="wow"> 30x faster </span> than Slick slider,
        <span className="wow"> 15x faster </span>than Swiper slider.
      </>
    ),
  },
  {
    color: '#c56cf0',

    className: 'explosion',
    title: 'Packed With Features',
    description: (
      <>
        Touch support, drag, swipe, autoplay, pagination, navigation, infinite
        loop and much more
      </>
    ),
  },
  {
    color: '#7d5fff',

    title: 'Super Customizable',
    className: 'customizable',
    description: (
      <>
        Customize everything from number of slides to show, scroll, transition
        duration, easing etc
      </>
    ),
  },
  {
    color: '#70a1ff',

    title: 'Responsive Config',
    className: 'responsive',
    description: (
      <>
        You can have unique configurations for each type of media with power css
        media query based configuration
      </>
    ),
  },
  {
    color: '#d6a2e8',
    className: 'eye',
    title: 'Zero Layout Shifts',
    description: (
      <>
        Blaze Slider creates layout using css variables, so you can configure
        the css variables to prevent layout shifts
      </>
    ),
  },
  {
    className: 'noclone',
    color: '#f8c291',
    title: 'Infinite Loop without cloning slides',
    description: (
      <>
        Blaze slider does not clone the slides. This removes an entire class of
        bugs that can be caused by slide cloning
      </>
    ),
  },
]
