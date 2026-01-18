import Link from 'next/link';

export function HeroSection() {
  return (
    <header className="relative px-4 pt-32 pb-20">
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-fd-foreground mb-3 md:mb-6 text-4xl leading-none tracking-tight sm:text-5xl md:text-7xl font-serif">
          High Performance Carousels
          <br />
          <span className="text-fd-foreground">for modern web</span>
        </h1>

        <p className="text-fd-muted-foreground mx-auto mb-5 md:mb-10 max-w-lg text-sm md:text-lg leading-relaxed">
          A high-performance, lightweight carousel library built for speed with Zero
          layout shifts and minimal bundle size
        </p>

        <div className="flex justify-center gap-3">
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
