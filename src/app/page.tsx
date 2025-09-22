import ChooseUsSection from "./_sections/ChooseUsSection";
import HeroSection from "./_sections/HeroSection";

export default function HomePage() {
  return (
    <>
      <section className="hero " id="hero">
        {/* <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        </h1> */}
          <HeroSection />
          <ChooseUsSection />

      </section>
    </>
  );
}
