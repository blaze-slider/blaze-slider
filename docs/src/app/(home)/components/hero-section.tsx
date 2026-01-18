import Link from 'next/link';

export function HeroSection() {
  return (
    <header className="relative px-4 pt-28 pb-28">
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-fd-foreground mb-3 font-serif text-4xl leading-none tracking-tight sm:text-5xl md:mb-5 md:text-7xl">
          High Performance Carousel
          <br />
          <span className="text-fd-foreground">with Zero layout shifts</span>
        </h1>

        <p className="text-fd-muted-foreground mx-auto mb-5 max-w-xl text-base leading-relaxed md:mb-8 md:text-lg text-balance md:text-pretty">
          A high-performance, lightweight carousel library built for speed with
          Zero layout shifts and minimal bundle size
        </p>

        <div className="flex justify-center gap-3 max-w-md mx-auto">
          <Link
            href="/docs"
            className="bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors"
          >
            Get Started
          </Link>
          <Link
            target="_blank"
            href="https://github.com/blaze-slider/blaze-slider"
            className="border-fd-border bg-fd-muted text-fd-foreground hover:bg-fd-accent inline-flex h-10 items-center justify-center rounded-lg border px-5 text-sm font-medium transition-colors"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}
