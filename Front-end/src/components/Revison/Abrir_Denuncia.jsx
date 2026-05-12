import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiEye } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useEffect, useState } from "react";
export function Abrir_Denuncia({ denuncia }) {
  const [detalle, setDetalle] = useState(null);
  const docs = detalle?.evidencias?.filter(ev => ev.tipo === "documentos");
const imgs = detalle?.evidencias?.filter(ev => ev.tipo === "imagenes");
const vids = detalle?.evidencias?.filter(ev => ev.tipo === "video");

  useEffect(() => {
    fetch(`http://localhost:8000/api/revisor/denuncias/${denuncia.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDetalle(data))
      .catch(console.error);
  }, []);
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-800 rounded-full">
              <FiEye />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[1100px] max-w-[95vw] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>FORMULARIO FDC-001</DialogTitle>
              <DialogDescription>
                Informacion de la Denuncia {detalle?.numeroRegistro}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              <div className="flex flex-col gap-2">
                <Label>Nombre Completo</Label>
                <Input
                  className="w-full h-11  font-medium border-2 border-black"
                  value={detalle?.Nombre_Completo ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Tipo de Denuncia</Label>
                <Input
                  className="w-full h-11  font-medium border-2 border-black"
                  value={detalle?.Tipo_denuncia ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Area</Label>
                <Input
                  className="w-full h-11  font-medium border-2 border-black"
                  value={detalle?.Area ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Telefono</Label>
                <Input
                  className="w-full h-11  font-medium border-2 border-black"
                  value={detalle?.Telefono ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Correo</Label>
                <Input
                  className="w-full h-11  font-medium border-2 border-black"
                  value={detalle?.Correo ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Medio de Recepcion</Label>
                <Input
                  className="w-full h-11  font-medium border-2 border-black"
                  value={detalle?.Medio_Recepcion ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Fecha de Incidencia</Label>
                <Input
                  className="w-full h-11  font-medium border-2 border-black"
                  value={detalle?.fecha ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Persona Involucrada</Label>
                <Input
                  className="w-full h-11  font-medium border-2 border-black"
                  value={detalle?.persona_involucrada ?? ""}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Nombre de la Persona Involucrada</Label>
                <Input
                  className="w-full h-11  font-medium border-2 border-black  "
                  value={detalle?.persona_nombre ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2"><div className="flex flex-col gap-2">
  <Label>Documentos</Label>
  {docs?.length > 0 ? (
    docs.map(ev => (
      <a
        key={ev.id}
        href={`http://localhost:8000/storage/${ev.ruta}`}
        target="_blank"
        className="text-blue-600 underline"
      >
        Ver documento
      </a>
    ))
  ) : (
    <span className="text-red-500">No hay documentos disponibles</span>
  )}
</div></div> 
              <div className="flex flex-col gap-2"><div className="flex flex-col gap-2">
  <Label>Imagenes</Label>
  {imgs?.length > 0 ? (
    imgs.map(ev => (
       <a
        key={ev.id}
        href={`http://localhost:8000/storage/${ev.ruta}`}
        target="_blank"
        className="text-blue-600 underline"
      >
        Ver imagen
      </a>
    ))
  ) : (
    <span className="text-red-500">No hay imágenes disponibles</span>
  )}
</div></div>
              <div className="flex flex-col gap-2"><div className="flex flex-col gap-2">
  <Label>Video</Label>
  {vids?.length > 0 ? (
    vids.map(ev => (
       <a
        key={ev.id}
        href={`http://localhost:8000/storage/${ev.ruta}`}
        target="_blank"
        className="text-blue-600 underline"
      >
        Ver video
      </a>
    ))
  ) : (
    <span className="text-red-500">No hay videos disponibles</span>
  )}
</div></div>
              <div className="mx-auto w-full max-w-4xl lg:col-span-3">
                <div className="flex flex-col gap-2 lg:col-span-2 ">
                  <Label className="text-center">Descripcion</Label>
                  <Textarea
                    className="w-full p-3  border resize-y font-medium  border-black"
                    rows={6}
                    value={detalle?.Descripcion ?? ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
