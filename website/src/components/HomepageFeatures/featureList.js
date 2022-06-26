import FastSVG from '@site/static/svg/fast.svg'
import ExplosionSVG from '@site/static/svg/explosion.svg'
import CustomizableSVG from '@site/static/svg/customizable.svg'
import ResponsiveSVG from '@site/static/svg/responsive.svg'
import EyeSVG from '@site/static/svg/eye.svg'
import NoCloneSVG from '@site/static/svg/noclone.svg'
import React from 'react'

export const FeatureList = [
  {
    className: 'fast',
    title: 'High Performance',
    Svg: <FastSVG />,
    description: (
      <>
        Lightening fast slider initialization with zero layout shifts.
        <span className="wow"> 30x faster </span> than Slick slider,
        <span className="wow"> 15x faster </span>than Swiper slider.
      </>
    ),
  },
  {
    className: 'explosion',
    title: 'Packed With Features',
    Svg: <ExplosionSVG />,
    description: (
      <>
        Touch support, drag, swipe, autoplay, pagination, navigation, infinite
        loop and much more
      </>
    ),
  },
  {
    title: 'Super Customizable',
    className: 'customizable',
    Svg: <CustomizableSVG />,
    description: (
      <>
        Customize everything from number of slides to show, scroll, transition
        duration, easing etc
      </>
    ),
  },
  {
    title: 'Responsive Configuration',
    Svg: <ResponsiveSVG />,
    className: 'responsive',
    description: (
      <>
        You can have unique configurations for each type of media with power css
        media query based configuration
      </>
    ),
  },
  {
    className: 'eye',
    title: 'Zero Layout Shifts',
    Svg: <EyeSVG />,
    description: (
      <>
        Blaze Slider creates layout using css variables, so you can configure
        the css variables to prevent layout shifts
      </>
    ),
  },
  {
    className: 'noclone',
    title: 'No Slide Cloning',
    Svg: <NoCloneSVG />,
    description: (
      <>
        Even when infinite looping is enabled, blaze slider does not clone the
        slides. This removes an entire class of bugs that are caused by slide
        cloning
      </>
    ),
  },
]
