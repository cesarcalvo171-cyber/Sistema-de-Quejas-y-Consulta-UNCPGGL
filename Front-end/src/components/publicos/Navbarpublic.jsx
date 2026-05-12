

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

export function NavBarPublic() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-red-900 py-4 border-b-2 border-yellow-300 sm:px-6 lg:px-8   ">
      {/* BARRA SUPERIOR */}
      <div className=" flex justify-end">
        {/* MENU DESKTOP */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate("/Inicio")}>
                {" "}
                Inicio
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate("/Inicio/Formulario_FCD-001")}
              >
                {" "}
                Nueva Denuncia
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate("/Inicio/Registro_Denuncias")}
                className="text-white"
              >
                Ver estado de Denuncia
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
