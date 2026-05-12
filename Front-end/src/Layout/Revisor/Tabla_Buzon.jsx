import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { NavBarRevisor } from "@/components/Revison/NavBarRevisor";
import { FiEye } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineAddCircle } from "react-icons/md";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Abrir_Denuncia } from "@/components/Revison/Abrir_Denuncia";
import { FCD_02 } from "@/components/Formularios/FCD-02";
export function Tabla_Buzon() {
  const [denuncias, setDenuncias] = useState([]);
useEffect(() => {
  fetch("http://localhost:8000/api/revisor/denuncias", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log("STATUS:", res.status);
      console.log("RESPUESTA:", data);
      return data;
    })
    .then((json) => {
      setDenuncias(json);
    })
    .catch(console.error);
}, []);
console.log(denuncias);
  return (
    <>
      <SidebarProvider>
        <NavBarRevisor />
        <SidebarInset>
          <SidebarTrigger className="h-7 w-7 text-red-900 :text-yellow-500" />
          <div className="mt-4 overflow-x-auto px-3">
            <Table className="w-full border-collapse border border-gray-200 mt-9 ">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="px-4 py-2 font-semibold">
                    Numero de denuncia
                  </TableHead>
                  <TableHead className="px-4 py-2 font-semibold">
                    Nombre Completo
                  </TableHead>
                  <TableHead className="px-4 py-2 font-semibold">
                    Tipo de Denuncia
                  </TableHead>
                  <TableHead className=" py-2 font-semibold">
                    Estado de La denuncia
                  </TableHead>

                  <TableHead className=" py-2 font-semibold">Ver</TableHead>

                  <TableHead className=" font-semibold">
                    Crear Denuncia
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {denuncias.map((denuncia) => (
                  <TableRow key={denuncia.id}>
                    <TableCell className="font-medium hover:bg-gray-50">
                      {denuncia.numeroRegistro}
                    </TableCell>
                    <TableCell className="font-medium hover:bg-gray-50">
                      {denuncia.Nombre_Completo}
                    </TableCell>
                    <TableCell className="font-medium hover:bg-gray-50">
                      {denuncia.Tipo_denuncia}
                    </TableCell>
                    <TableCell className="font-medium hover:bg-gray-50">
                      <Badge>
                        {denuncia.estado}
                      </Badge>
                    </TableCell>

                    <TableCell className=" px-2 font-medium hover:bg-gray-50">
                      <Abrir_Denuncia denuncia={denuncia} />
                    </TableCell>

                    <TableCell className=" px2 font-medium hover:bg-gray-50">
                      <FCD_02 denunciaId={denuncia.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
