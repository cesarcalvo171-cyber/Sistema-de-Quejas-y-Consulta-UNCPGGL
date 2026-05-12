import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavBarRevisor } from "../../components/Revison/NavBarRevisor";
import { HeroRevisor } from "@/components/Revison/HeroRevisor";

export default function Inicio_RV() {
  return (
    <SidebarProvider>
      <NavBarRevisor />
      <SidebarTrigger className="h-7 w-7 text-red-900 :text-yellow-500" />
      <SidebarInset>
        <main><HeroRevisor /></main>
      </SidebarInset>
    </SidebarProvider>
  );
}
