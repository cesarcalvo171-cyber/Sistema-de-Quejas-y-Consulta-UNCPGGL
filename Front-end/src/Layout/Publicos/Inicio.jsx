import { FCD_01 } from "@/components/Formularios/FCD-01";
import { NavBarPublic } from "../../components/publicos/Navbarpublic";
import { Hero } from "@/components/publicos/Hero";
import { ContenHero } from "@/components/publicos/contenHero";
import { Pasos } from "@/components/publicos/pasos";

export function Inicio() {
  return (
    <>
     <NavBarPublic />
      <Hero />
      <ContenHero/>
      <Pasos/>
  
    </>
  );
}
