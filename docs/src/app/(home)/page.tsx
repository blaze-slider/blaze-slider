import { HeroSection } from './components/hero-section';
import { BentoGrid } from './components/bento-grid';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <section className="px-4 pb-24">
        <BentoGrid />
      </section>
    </div>
  );
}
