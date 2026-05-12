import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ImHome } from "react-icons/im";
import { IoFileTrayFull } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export function NavBarRevisor() {
  const navigate = useNavigate();
  return (
    <Sidebar
      collapsible="icon"
      className="[&_[data-sidebar=sidebar]]:bg-red-900 [&_[data-sidebar=sidebar]]:text-white [&_[data-sidebar=sidebar]]hover:text-yellow-300"
    >
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="mt-4">
            <SidebarMenuButton onClick={() => navigate("/Revision")}>
              <ImHome className="size-4" />
              <span className="font-semibold">Inicio</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="mt-4">
             <SidebarMenuButton onClick={() => navigate("/Revision/Tabla_Buzon")}>
              <IoFileTrayFull className="size-4" />
              <span className="font-semibold">Buzon</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FaRegUserCircle className="size-4" />
              <span className="font-semibold">Pepito Fulano</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
