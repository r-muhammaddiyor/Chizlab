import { Blog7 } from '../components/blog7';
import { Footer2 } from '../components/footer2';
import Header from '../components/Header';
import Hero from '../components/Hero';

export default function Home({ setLoading }) {
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
  }, 3000)
  return (
    <div className="container max-w-285 w-full mx-auto p-4">
      <Header />

      <main>
        <Hero />

        <section>
          <Blog7 />
        </section>
      </main>

      <Footer2 />
    </div>
  );
}
