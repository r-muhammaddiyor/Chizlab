import { HeroVideoDialog } from '@/components/ui/hero-video-dialog';
import { Banner1 } from './banner1';

export default function Hero() {
  const token = localStorage.getItem('token')

  return (
    <section className="pt-40 pb-40">
      <div className="relative">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/Bvj8Jvvsifc"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/Bvj8Jvvsifc"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0">{!token ? <Banner1 /> : null}</div>
    </section>
  );
}
