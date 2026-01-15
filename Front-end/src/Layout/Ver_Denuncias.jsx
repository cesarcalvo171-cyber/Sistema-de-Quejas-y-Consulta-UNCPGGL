import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Search } from "lucide-react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import { GoSearch } from "react-icons/go";
export function Ver_Denuncias() {
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const denunciasFiltradas = denuncias.filter((d) =>
    `${d.numeroRegistro} ${d.Nombre_Completo}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const estadoVariant = {
    Pendiente: "secondary",
    Resuelto: "success",
    Rechazado: "destructive",
  };
  useEffect(() => {
    fetch("http://localhost:8000/api/denuncias")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener denuncias");
        }
        return res.json();
      })
      .then((data) => setDenuncias(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />
      <div className="bg-red-600 border-r-2 border-yellow-300 py-2">
        <Button
          variant="b"
          className="mx-2"
          onClick={() => navigate("/Inicio")}
        >
          <BsArrowReturnLeft /> Volver a Inicio
        </Button>
      </div>
      <div className="flex justify-center">
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold uppercase pt-3   ">
          Registro de Denuncias
          <p className="text-sm text-muted-foreground mx-auto">
            Consulta pública del estado de denuncias
          </p>
        </h1>
      </div>
      <div className="flex justify-center mt-4 relative w-[300px] ">
      <InputGroup>
        <InputGroupInput
         placeholder="Buscar por Nº de Registro, Nombre..."
         vlaue={Search}
          onChange={(e) => setSearch(e.target.value)}
           />
        <InputGroupAddon>
          <GoSearch/>
        </InputGroupAddon>
        
      </InputGroup>
        
      </div>
       

      <div className="mt-4 overflow-x-auto">
        
        <Table>
          
         
          
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
              <TableHead className="px-4 py-2 font-semibold">
                Estado de La denuncia
              </TableHead>
            </TableRow>
          </TableHeader>
         
          <TableBody>
            
            {denunciasFiltradas.map((denuncia) => (
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
                <Badge variant={estadoVariant[denuncia.estado]}>
                  {denuncia.estado}
                </Badge>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
      </div>
        {loading && <Skeleton className="h-[125px] max-w-full rounded-xl" />}
            {!loading && denunciasFiltradas.length === 0 && (
              <p className="text-center text-2xl font-semibold flex justify-center mt-4 mb-2">
                No se encontraron denuncias
              </p>
            )}
            
    </>
  );
}
