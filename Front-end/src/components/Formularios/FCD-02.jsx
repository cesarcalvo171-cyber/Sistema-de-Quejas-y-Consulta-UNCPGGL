import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MdOutlineAddCircle } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  denuncia_numero: z.string(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tipo_Evaluacion_premilinar: z.enum(["Denuncia", "Queja", "Reclamo"]),
  Instancia_Receptora: z.string().optional(),
  Nombre_Participante: z.string().optional(),
  Cargo_Participante: z.string().optional(),
  Analisis: z.string().min(10),
  Resultado: z.enum(["Procede", "No Procede", "Requiere información"]),
  Observaciones: z.string().optional(),
});

export function FCD_02({ denunciaId }) {
  const [datos, setDatos] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      denuncia_numero: "",
      fecha: "",
      tipo_Evaluacion_premilinar: "",
      Instancia_Receptora: "",
      Nombre_Participante: "",
      Cargo_Participante: "",
      Analisis: "",
      Resultado: "",
      Observaciones: "",
    },
  });

  const { handleSubmit, reset } = form;

  //  Cargar datos de la denuncia correctamente
  useEffect(() => {
    fetch(`http://localhost:8000/api/revisor/denuncias/${denunciaId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setDatos(d);

        // GUARDAMOS EL NUMERO DE REGISTRO
        form.setValue("denuncia_numero", d.numeroRegistro);
        form.setValue("fecha",d.fecha);
      });
  }, [denunciaId]);

  const onSubmit = async (data) => {
  try {
    const res = await fetch("http://localhost:8000/api/evaluaciones", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: new URLSearchParams(data).toString(),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const result = await res.json();

    Swal.fire("Correcto", result.message, "success");
    reset();
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "No se pudo registrar", "error");
  }
};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-800 rounded-full">
          <MdOutlineAddCircle />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[1100px] max-w-[95vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>FORMULARIO FDC-002</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            id="FCD_02"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {" "}
              {/* Denuncia */}
              <div className="flex flex-col gap-2">
                <Label>N.º de Denuncia</Label>
                <FormField
                  control={form.control}
                  name="denuncia_numero"
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <Input value={datos?.numeroRegistro || ""} disabled className=" border-black" />

              </div>
              {/* Fecha */}
              <div className="flex flex-col gap-2">
                <Label>Fecha</Label>
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <Input value={datos?.fecha || ""} disabled className=" border-black" />
              </div>
            </div>

            {/* Tipo */}

            <FormField
              control={form.control}
              name="tipo_Evaluacion_premilinar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo Evaluación</FormLabel>
                  <Select onValueChange={field.onChange}
                  value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" border-black">
                      <SelectItem value="Denuncia">Denuncia</SelectItem>
                      <SelectItem value="Queja">Queja</SelectItem>
                      <SelectItem value="Reclamo">Reclamo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Instancia Receptora  */}

            <FormField
              control={form.control}
              name="Instancia_Receptora"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instancia Receptora</FormLabel>
                  <FormControl>
                    <Input {...field} className=" border-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Nombre del Partcipante */}
            <FormField
              control={form.control}
              name="Nombre_Participante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Participante</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre del participante"
                      {...field}
                      className=" border-black"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/*Cargo del participante */}
            <FormField
              control={form.control}
              name="Cargo_Participante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo del Participante</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el cargo del participante"
                      {...field}
                      className=" border-black"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Resultado */}
            <FormField
              control={form.control}
              name="Resultado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resultado</FormLabel>
                 <Select onValueChange={field.onChange}
                  value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Procede">Procede</SelectItem>
                      <SelectItem value="No Procede">No Procede</SelectItem>
                      <SelectItem value="Requiere información">
                        Requiere información
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* Análisis */}
            <FormField
              control={form.control}
              name="Analisis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Análisis</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={6}
                      className="w-full p-3  border resize-y font-medium  border-black"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Análisis */}
            <FormField
              control={form.control}
              name="Observaciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={6}
                      className="w-full p-3  border resize-y font-medium  border-black"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="bg-green-600">
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
