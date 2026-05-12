import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BsFileText } from "react-icons/bs";
import { CiCircleAlert } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { GoAlert } from "react-icons/go";
import { NavBarPublic } from "@/components/publicos/Navbarpublic";
import Swal from "sweetalert2";
export function Ver_Denuncias() {
  const [denuncias, setDenuncias] = useState([]);
  const [, setLoading] = useState(true);

  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/denuncias?search=${encodeURIComponent(query)}`,
      );

      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      const json = await response.json();

      const list = Array.isArray(json?.denuncias) ? json.denuncias : [];
      setDenuncias(list);

      if (list.length === 0) {
        Swal.fire({
          icon: "info",
          title: "Sin resultados",
          text: "No se encontraron denuncias con ese código.",
          confirmButtonText: "Entendido",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDenuncias([]);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message ?? "No se pudo consultar el servidor.",
        confirmButtonText: "Cerrar",
      });
    } finally {
      setLoading(false);
    }
  };

  const estadoVariant = {
    Pendiente: "Pendiente",
    Resuelto: "success",
    Rechazado: "destructive",
  };

  return (
    <>
      <section></section>
      <NavBarPublic />

      {/*Alerta*/}
      <div className="flex justify-center mt-4 px-2">
        <Alert variant="succes" className="w-[600px]">
          <GoAlert size={24} />
          <AlertTitle>Atención</AlertTitle>
          <hr />
          <AlertDescription>
            <br />
            <p>
              • Utilice el buscador para consultar el estado y seguimiento de su
              denuncia mediante el número de registro asignado.
            </p>
            <br />

            <p>• Clik en Boton Buscar.</p>
          </AlertDescription>
        </Alert>
      </div>

      {/*SearchBar*/}
      <div className="flex justify-center mt-[45px] relative w-[450px] px-4   ">
        <InputGroup>
          <InputGroupInput
            placeholder="Buscar por Nº de Registro, Nombre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputGroupAddon>
            <GoSearch />
          </InputGroupAddon>
        </InputGroup>
        <div className="px-4">
          <Button
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
            className="bg-blue-800 rounded text-white hover:bg-blue-900 ml-2"
          >
            Buscar
          </Button>
        </div>
      </div>

      {/*Card*/}
      {denuncias.map((d) => (
        <Card key={d.id} className="w-full max-w-2xl mx-auto mt-[120px]">
          <CardHeader className="text-lg">
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Denunciante:{" "}
                <span className="text-foreground font-semibold">
                  {d.Nombre_Completo}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <BsFileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm text-muted-foreground">
                  Nº {d.numeroRegistro}
                </span>
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 pt-2">
              <CardTitle className="text-xl">{d.Tipo_denuncia}</CardTitle>
              <Badge
                variant={estadoVariant[d.estado]}
                className="whitespace-nowrap gap-1.5"
              >
                <CiCircleAlert className="h-3 w-3" />
                {d.estado}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Descripción */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {d.Descripcion}
            </p>

            {/* Footer con fecha */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground border-t pt-4">
              <CiCalendar className="h-4 w-4" />
              <span>{d.fecha}</span>
            </div>
          </CardContent>
        </Card>
      ))}

      {/**
       *   <div className="mt-4 overflow-x-auto">
       * <Table>
          
         
          
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
      
        {loading && <Skeleton className="h-[125px] max-w-full rounded-xl" >
          <div className="flex justify-center">
            <Spinner className=" size-8 text-red-700" />
            
          </div>
          
        </Skeleton>
        
        }
            {!loading && denunciasFiltradas.length === 0 && (
              <p className="text-center text-2xl font-semibold flex justify-center mt-4 mb-2">
                No se encontraron denuncias
              </p>
            )}
             */}
    </>
  );
}
