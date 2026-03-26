import HeroPage from './HeroPage'
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";

export default function App() {
  return (
    <main>
      <HeroPage />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </main>
  );
}