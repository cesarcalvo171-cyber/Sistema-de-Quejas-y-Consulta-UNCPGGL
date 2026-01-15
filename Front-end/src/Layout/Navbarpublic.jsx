"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import { BsArchive } from "react-icons/bs";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { BsPlusLg } from "react-icons/bs";

export function NavBarPublic() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-red-600 py-4 border-b-2 border-yellow-300 sm:px-6 lg:px-8   ">
      {/* BARRA SUPERIOR */}
      <div className="mx-auto  ">
        {/* MENU DESKTOP */}
        <Breadcrumb className="hidden lg:block ">
          <BreadcrumbList className=" gap-6 text-lg ">
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Button
                  variant="b"
                  onClick={() =>
                    document
                      .getElementById("FCD-01")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {" "}
                  <BsPlusLg />
                  Nueva Denuncia
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink>
                <Button variant="b" onClick={() => navigate("/Inicio/Registro_Denuncias")}>
                  <BsArchive /> Denuncias registradas
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* ICONOS + HAMBURGUESA */}
        <div className="flex items-center gap-3 mr-4 sm:mr-6">
          {/* Botón hamburguesa: solo en móvil/tablet */}
          <button
            className="lg:hidden "
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            {open ? <RxCross2 size={26} /> : <RxHamburgerMenu size={26} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE: */}
      {open && (
        <div className="lg:hidden   px-4 pb-4">
          <Breadcrumb>
            <BreadcrumbList className="flex flex-col gap-3 ">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#About"
                  className="block w-full py-1 font-semibold uppercase  "
                  onClick={() => setOpen(false)}
                >
                  <Button variant="b">Nueva Denucias</Button>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#Herramientas"
                  className="block w-full py-1 font-semibold uppercase "
                  onClick={() => setOpen(false)}
                >
                  <Button variant="b">
                    Denuncias registradas <FaRegFileAlt />
                  </Button>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
    </div>
  );
}
