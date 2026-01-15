import { FCD_01 } from "@/components/Formularios/FCD-01";
import { NavBarPublic } from "./Navbarpublic";
import { Hero } from "@/components/Hero";
import { ContenHero } from "@/components/contenHero";
export function Complaints_suggestions() {
  return (
    <>
      <Hero />
      <NavBarPublic />
      <ContenHero/>
      <FCD_01 />
    </>
  );
}
