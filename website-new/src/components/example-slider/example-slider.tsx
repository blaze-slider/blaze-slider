'use client';

import type { BlazeConfig } from 'blaze-slider';
import type { ReactNode } from 'react';
import { useBlazeSlider } from './use-blaze-slider';
import 'blaze-slider/dist/blaze.css';
import './example-slider.css';

interface ExampleSliderProps {
  children: ReactNode;
  config?: BlazeConfig;
  showNav?: boolean;
  showPagination?: boolean;
}

export function ExampleSlider({
  children,
  config,
  showNav = false,
  showPagination = false,
}: ExampleSliderProps) {
  const ref = useBlazeSlider(config);

  return (
    <div className="example-slider">
      <div className="blaze-slider" ref={ref}>
        <div className="blaze-container">
          <div className="blaze-track-container">
            <div className="blaze-track">{children}</div>
          </div>

          {(showNav || showPagination) && (
            <div className="slider-controls">
              {showNav && (
                <button
                  className="blaze-prev"
                  aria-label="Previous slide"
                />
              )}
              {showPagination && <div className="blaze-pagination" />}
              {showNav && (
                <button
                  className="blaze-next"
                  aria-label="Next slide"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
