import { cookies } from "next/headers";
import ChooseUsSection from "./_sections/ChooseUsSection";
import HeroSection from "./_sections/HeroSection";
import { redirect } from "next/navigation";
import { loggedUser } from "./_AppComponents/Guard/loggedUser";

export default async function HomePage() {
  const isLoggedUser = await loggedUser();
  if (isLoggedUser) {
    redirect("/dashboard");
  }

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
