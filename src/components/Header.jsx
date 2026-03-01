import { Navbar1 } from "./Navbar";
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

export default function Header() {
  return (
    <header>
      <Navbar1 />

      <div className="fixed bottom-20 right-20 z-999">
        <AnimatedThemeToggler />
      </div>
    </header>
  );
}
