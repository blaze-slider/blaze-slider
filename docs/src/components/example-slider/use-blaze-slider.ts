'use client';

import { useEffect, useRef } from 'react';
import BlazeSlider, { type BlazeConfig } from 'blaze-slider';

export function useBlazeSlider(config?: BlazeConfig) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!sliderRef.current || initialized.current) return;
    new BlazeSlider(sliderRef.current, config);
    initialized.current = true;
  }, [config]);

  return sliderRef;
}
