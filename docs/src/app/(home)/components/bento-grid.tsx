import {
  Zap,
  LayoutDashboard,
  Package,
  Sparkles,
  Smartphone,
  Settings,
  Blocks,
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
    <div className={`bg-fd-foreground/5 rounded-2xl px-6 py-10 ${className}`}>
      <div className="text-fd-muted-foreground mb-6">
        <div className="bg-fd-foreground/10 inline-flex rounded-full p-2.5">
          {icon}
        </div>
      </div>
      <h3 className="text-fd-card-foreground mb-1 text-lg font-medium">
        {title}
      </h3>
      <p className="text-fd-muted-foreground max-w-sm text-sm leading-relaxed text-pretty">
        {description}
      </p>
    </div>
  );
}

export function BentoGrid() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-2.5 md:grid-cols-6">
      <BentoItem
        icon={<Zap className="size-4" />}
        title="Blazing fast initialization"
        className="md:col-span-3"
        description="Minimal JS execution time. 30x faster than Slick slider, 15x faster than Swiper slider"
      />

      <BentoItem
        icon={<LayoutDashboard className="size-4" />}
        title="Zero Layout Shifts"
        className="md:col-span-3"
        description="CSS variables define the layout, so the layout remains the same before and after JavaScript execution"
      />

      <BentoItem
        icon={<Package className="size-4" />}
        title="Tiny Bundle"
        className="md:col-span-2"
        description="Just ~2KB gzipped. 19x smaller than Swiper, 5x smaller than Slick."
      />

      <BentoItem
        icon={<Sparkles className="size-4" />}
        title="Full Featured"
        className="md:col-span-2"
        description="Touch, drag, autoplay, pagination, navigation, and infinite loop. All built-in."
      />

      <BentoItem
        icon={<Smartphone className="size-4" />}
        title="Responsive Configuration"
        className="md:col-span-2"
        description="Use media queries to define the slider configuration for different viewport sizes"
      />

      <BentoItem
        icon={<Settings className="size-4" />}
        title="Everything you need"
        className="md:col-span-3"
        description="number of slides to show, slides to scroll, speed, easing, infinite loop, pagination, navigation, and more"
      />

      <BentoItem
        icon={<Blocks className="size-4" />}
        title="Framework Agnostic"
        className="md:col-span-3"
        description="Works with any framework or just drop a script in your HTML - no build step required"
      />
    </div>
  );
}
