import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
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
import { Wheat } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

/* =====================
   ESQUEMA PRINCIPAL FCD_03
===================== */
const FCD_03Schema = z
  .object({
    equipo_investigador: z.string().optional(),
    fecha_cierre: z.string().optional(),
    metodologia: z.enum([
      "Entrevista",
      "Revision_Documental",
      "Inspeccion",
      "Otros",
    ]),
    otro_metodologia: z.string().optional(),
    descripcion: z.string().optional(),
    analisis: z.string().optional(),
    valoracion: z.string().optional(),
    observaciones: z.string().min(10).max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.metodologia === "Otro" && !data.otro_metodologia) {
      ctx.addIssue({
        path: ["otro_metodologia"],
        message: "Debe especificar otra Metodologia",
        code: z.ZodIssueCode.custom,
      });
    }
  });

/* =====================
   COMPONENTE FCD_03
===================== */
export function FCD_03() {
  const form = useForm({
    resolver: zodResolver(FCD_03Schema),
    mode: "onBlur",
    defaultValues: {
      equipo_investigador: "",
      fecha_cierre: "",
      analisis: "",
      metodologia: "",
      descripcion: "",
      valoracion: "",
      observaciones: "",
    },
  });

  const { handleSubmit, reset, watch, setValue } = form;

  const metodologia = watch("metodologia");
  useEffect(() => {
    if (metodologia !== "Otros") setValue("otro_metodologia");
  });

  return (
    <>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Formulario FCD-003</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={[]} className="space-x-6" id="FCD-003">
              <h3 className="text-lg font-semibold  mb-2 px-6">
                I. Datos Generales
              </h3>

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
                  <Input value={[]} disabled  />
                </div>
                {/* Fecha inicio */}
                <div className="flex flex-col gap-2">
                  <Label>Fecha de Inicio</Label>
                  <FormField
                    control={form.control}
                    name="fecha"
                    render={({ field }) => <input type="hidden" {...field} />}
                  />
                  <Input value={[]} disabled />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Equipo de Investigacion</Label>
                  <FormField
                    control={form.control}
                    name=""
                    render={({ field }) => <input type="hidden" {...field} />}
                  />
                  <Input value={[]} disabled  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Fecha de Cierre</Label>
                  <FormField
                    control={form.control}
                    name="fecha"
                    render={({ field }) => <input type="hidden" {...field} />}
                  />
                  <Input value={[]} disabled  />
                </div>
              </div>
              <h3 className="text-lg font-semibold  mt-4">
                II. Metodologia Empleada
              </h3>

              {/* Metodologia */}

              <FormField
                control={form.control}
                name="metodologia"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent >
                        <SelectItem value="Entrevista">
                          Entrevista
                        </SelectItem>

                        <SelectItem value="Revision_Documental">
                          Revision Documental
                        </SelectItem>
                        <SelectItem value="Inspeccion">Inspeccion</SelectItem>
                        <SelectItem value="Otros">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {metodologia === "Otros" && (
                <FormField
                  control={form.control}
                  name="otro_metodologia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">
                        Especifique otra Metodologia empleada
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Especifique aquí"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
              )}
               <h3 className="text-lg font-semibold  mt-4">
                III. Descripcion de Halllazgos 
              </h3>
               <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Describa aqui..."
                            {...field}
                              rows={4}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <h3 className="text-lg font-semibold  mt-4">
                IV. Analisis y Valoracion
              </h3>
                  <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Describa aqui..."
                            {...field}
                              rows={4}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <h3 className="text-lg font-semibold  mt-4">
                V.Conclusiones y Recomendaciones
              </h3>
                  <FormField
                    control={form.control}
                    name="analisis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold uppercase">
                         
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describa aqui..."
                            {...field}
                              rows={4}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
