import React from 'react'
import './feature.css'
import { useBlazeSlider } from '../../hooks/useBlazeSlider'
import { FeatureList } from './featureList'
import PrevSVG from '@site/static/svg/prev.svg'
import NextSVG from '@site/static/svg/next.svg'

export default function HomepageFeatures() {
  const sliderRef = useBlazeSlider({
    screen: {
      slidesToShow: 3,
      slideGap: '0px',
      loop: false,
    },
    '(max-width: 991px)': {
      slidesToShow: 2,
    },
    '(max-width: 500px)': {
      slidesToShow: 1,
    },
  })

  return (
    <section className="feature-section">
      <div className="container">
        <div className="blaze-slider" ref={sliderRef}>
          <div className="bottom-nav" style={{ height: '40px' }}>
            <button className="blaze-prev">
              <PrevSVG />
            </button>
            <div className="blaze-pagination"></div>
            <button className="blaze-next" aria-label="next">
              <NextSVG />
            </button>
          </div>
          <div className="blaze-container">
            <div className="blaze-track-container">
              <div className="blaze-track">
                {FeatureList.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Feature({ imgSrc, title, description, Svg, className }) {
  return (
    <div className="feature-container">
      <div className={`feature ${className}`}>
        {Svg || <img src={imgSrc} className="feature-img" />}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
