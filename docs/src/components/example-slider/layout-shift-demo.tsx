'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import BlazeSlider, { type BlazeConfig } from 'blaze-slider';
import 'blaze-slider/dist/blaze.css';
import './example-slider.css';

interface LayoutShiftDemoProps {
  children: ReactNode;
  config?: BlazeConfig;
  fixCLS?: boolean;
}

export function LayoutShiftDemo({
  children,
  config,
  fixCLS = false,
}: LayoutShiftDemoProps) {
  const [status, setStatus] = useState<'before' | 'after'>('before');
  const sliderRef = useRef<HTMLDivElement>(null);
  const blazeInstance = useRef<BlazeSlider | null>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    if (status === 'after' && !blazeInstance.current) {
      blazeInstance.current = new BlazeSlider(sliderRef.current, config);
    }
  }, [status, config]);

  // Reset when switching to "before"
  useEffect(() => {
    if (status === 'before' && blazeInstance.current) {
      // We need to refresh the page state - simplest is to force re-render
      blazeInstance.current = null;
    }
  }, [status]);

  return (
    <div className="layout-shift-demo">
      <div className="demo-toggle">
        <button
          onClick={() => setStatus('before')}
          className={status === 'before' ? 'active' : ''}
        >
          Before
        </button>
        <button
          onClick={() => setStatus('after')}
          className={status === 'after' ? 'active' : ''}
        >
          After
        </button>
      </div>

      <div
        className={`example-slider ${fixCLS ? 'cls-fixed' : ''}`}
        key={status} // Force re-mount when toggling
      >
        <div className="blaze-slider" ref={sliderRef}>
          <div className="blaze-container">
            <div className="blaze-track-container">
              <div className="blaze-track">{children}</div>
            </div>
          </div>
        </div>
      </div>

      <p className="demo-hint">
        {status === 'before'
          ? 'This shows how the slider looks before JavaScript runs.'
          : 'This shows the slider after JavaScript initializes it.'}
        {!fixCLS && status === 'after' && ' Notice the layout shift!'}
        {fixCLS && ' No layout shift - CSS variables keep it stable.'}
      </p>
    </div>
  );
}
