import {
  Zap,
  Gauge,
  Feather,
  Settings2,
  Monitor,
  SlidersHorizontal,
  Globe,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface BentoItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  highlight?: string;
}

function BentoItem({
  icon,
  title,
  description,
  className = '',
}: BentoItemProps) {
  return (
    <div
      className={`bg-fd-card border-fd-border rounded-2xl border p-6 ${className}`}
    >
      <div className="text-fd-muted-foreground mb-4">{icon}</div>
      <h3 className="text-fd-card-foreground mb-1 text-lg font-medium">
        {title}
      </h3>
      <p className="text-fd-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function BentoGrid() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Large card - Performance */}
      <div className="bg-fd-card border-fd-border rounded-2xl border p-8 md:col-span-2 lg:col-span-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-fd-muted-foreground mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-fd-card-foreground mb-1 text-xl font-medium">
              Blazing Fast Performance
            </h3>
            <p className="text-fd-muted-foreground max-w-md leading-relaxed">
              Lightning fast initialization. 30x faster than Slick slider, 15x
              faster than Swiper slider.
            </p>
          </div>
          <div className="text-fd-muted-foreground hidden items-center gap-3 md:flex">
            <div className="text-right">
              <div className="text-fd-foreground font-mono text-2xl">2kb</div>
              <div className="text-xs tracking-wider uppercase">gzipped</div>
            </div>
          </div>
        </div>
      </div>

      <BentoItem
        icon={<Gauge className="h-5 w-5" />}
        title="Zero Layout Shifts"
        description="CSS variable-based layout prevents layout shifts across all viewport sizes"
      />

      <BentoItem
        icon={<Feather className="h-5 w-5" />}
        title="Ultra Lightweight"
        description="5x smaller than Slick slider, 19x smaller than Swiper slider."
      />

      <BentoItem
        icon={<Settings2 className="h-5 w-5" />}
        title="Feature Rich"
        description="Touch, drag, autoplay, pagination, navigation, and infinite loop supported"
      />

      <BentoItem
        icon={<Monitor className="h-5 w-5" />}
        title="Responsive Config"
        description="Media query based configuration for each breakpoint."
      />

      <BentoItem
        icon={<SlidersHorizontal className="h-5 w-5" />}
        title="Super Customizable"
        description="Customize everything from slides to show, scroll behavior, transition duration, easing, and more."
        className="md:col-span-2 lg:col-span-2"
      />

      {/* Use Everywhere */}
      <BentoItem
        icon={<Globe className="h-5 w-5" />}
        title="Use Everywhere"
        description="Works with any framework or drop a script tag in your HTML."
      />
    </div>
  );
}
