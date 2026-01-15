import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* =====================
   ARCHIVOS
===================== */
const documentFileSchema = z
  .instanceof(File)
  .refine((f) => f.type === "application/pdf", "Debe ser un PDF")
  .refine((f) => f.size <= 5 * 1024 * 1024, "Máx 5MB")
  .optional()
  .or(z.literal(null));

const imageFileSchema = z
  .instanceof(File)
  .refine(
    (f) => ["image/jpeg", "image/png"].includes(f.type),
    "Solo JPG o PNG"
  )
  .refine((f) => f.size <= 5 * 1024 * 1024, "Máx 5MB")
  .optional()
  .or(z.literal(null));

const videoFileSchema = z
  .instanceof(File)
  .refine(
    (f) => ["video/mp4", "video/webm"].includes(f.type),
    "Solo MP4 o WebM"
  )
  .refine((f) => f.size <= 50 * 1024 * 1024, "Máx 50MB")
  .optional()
  .or(z.literal(null));

/* =====================
   ESQUEMA PRINCIPAL
===================== */
const FCD_01Schema = z
  .object({
    Nombre_Completo: z.string().min(10).max(100),

    R_universitaria: z.enum([
      "Estudiante",
      "Docente",
      "Personal Administrativo",
      "Otro",
    ]),

    otro_R_universitaria: z.string().optional(),

    Area: z.enum([
      "Contabilidad",
      "Caja",
      "Docente",
      "Personal Administrativo",
      "Otro",
    ]),

    Otro_area: z.string().optional(),

    Telefono: z.string().regex(/^[0-9]+$/).min(8).max(20),

    Correo: z.string().email().max(150),

    Medio_Recepcion: z.string().default("Plataforma"),

    Tipo_denuncia: z.enum([
      "Gestion Academica",
      "Gestion de Titulos",
      "Incumplimientos de Normas Academicas o Administrativas",
      "Otro",
    ]),

    otros_tipo_denuncia: z.string().optional(),

    Descripcion: z.string().min(10).max(500),

fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

    lugar_incidencia: z.string().max(200).optional(),

    persona_involucrada: z.enum(["Contabilidad","Informatica" ]),

    persona_nombre: z.string().optional(),
    area_nombre: z.string().optional(),

    Documentos: documentFileSchema,
    Imagenes: imageFileSchema,
    Video: videoFileSchema,
  })
  .superRefine((data, ctx) => {
    if (data.R_universitaria === "Otro" && !data.otro_R_universitaria) {
      ctx.addIssue({
        path: ["otro_R_universitaria"],
        message: "Debe especificar la relación",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.Area === "Otro" && !data.Otro_area) {
      ctx.addIssue({
        path: ["Otro_area"],
        message: "Debe especificar el área",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.Tipo_denuncia === "Otro" && !data.otros_tipo_denuncia) {
      ctx.addIssue({
        path: ["otros_tipo_denuncia"],
        message: "Debe especificar el tipo de denuncia",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.persona_involucrada === "Contabilidad" && !data.persona_involucrada) {
      ctx.addIssue({
        path: ["Contabilidad"],
        message: "Debe seleccionar la persona",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.persona_involucrada === "Informatica" && !data.persona_involucrada) {
      ctx.addIssue({
        path: ["Contabilidad"],
        message: "Debe seleccionar el área",
        code: z.ZodIssueCode.custom,
      });
    }
  });

/* =====================
   COMPONENTE
===================== */
export function FCD_01() {
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(FCD_01Schema),
    mode: "onBlur",
    defaultValues: {
      Nombre_Completo: "",
      R_universitaria: undefined,
      otro_R_universitaria: "",
      Area: undefined,
      Otro_area: "",
      Telefono: "",
      Correo: "",
      Medio_Recepcion: "Plataforma",
      Tipo_denuncia: undefined,
      otros_tipo_denuncia: "",
      Descripcion: "",
      fecha: undefined,
      lugar_incidencia: "",
      persona_involucrada: undefined,
      persona_nombre: "",
      area_nombre: "",
      Documentos: null,
      Imagenes: null,
      Video: null,
    },
  });

  const { watch, handleSubmit, trigger, reset, setValue } = form;

  const R_universitaria = watch("R_universitaria");
  const Area = watch("Area");
  const Tipo_denuncia = watch("Tipo_denuncia");
  const persona_involucrada = watch("persona_involucrada");

  /* Limpia campos ocultos */
  useEffect(() => {
    if (R_universitaria !== "Otro") setValue("otro_R_universitaria", "");
    if (Area !== "Otro") setValue("Otro_area", "");
    if (Tipo_denuncia !== "Otro") setValue("otros_tipo_denuncia", "");
    if (persona_involucrada !== "Contabilidad") setValue("Contabilidad", "");
    if (persona_involucrada !== "Informatica") setValue("Informatica", "");
  }, [R_universitaria, Area, Tipo_denuncia, persona_involucrada, setValue]);

  const nextStep = async () => {
    const fields = {
      1: [
        "Nombre_Completo",
        "R_universitaria",
        "otro_R_universitaria",
        "Area",
        "Otro_area",
        "Telefono",
        "Correo",
        "Tipo_denuncia",
        "otros_tipo_denuncia",
      ],
      2: [
        "Descripcion",
        "fecha",
        "persona_involucrada",
        "persona_nombre",
        "area_nombre",
      ],
      3: ["Documentos", "Imagenes", "Video"],
    };

    const valid = await trigger(fields[step]);
    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });

    const res = await fetch("http://localhost:8000/api/denuncias", {
  method: "POST",
  headers: {
    Accept: "application/json",
  },
  body: formData,
});
      const result = await res.json();

      Swal.fire({
        icon: "success",
        title: "Denuncia enviada",
        html: `<strong>N°:</strong> ${result.numeroRegistro}`,
      });

      reset();
      setStep(1);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la denuncia",
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-10" >
      <CardHeader>
        <CardTitle className="uppercase">
          Formulario FCD‑01 ({step}/3)
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form} >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="FCD-01">
   {/* PASO 1: DATOS DEL DENUNCIANTE */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold uppercase mb-2">
                  I. DATOS DEL DENUNCIANTE
                </h3>

                <FormField
                  control={form.control}
                  name="Nombre_Completo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Nombre completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese su nombre completo"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="R_universitaria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Relación con la universidad</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Estudiante">
                              Estudiante
                            </SelectItem>
                            <SelectItem value="Docente">Docente</SelectItem>
                            <SelectItem value="Personal Administrativo">
                              Personal Administrativo
                            </SelectItem>
                            <SelectItem value="Otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                 
                />
                 {R_universitaria==="Otro" && (
                <FormField
                  control={form.control}
                  name="otro_R_universitaria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Especifique otra relación con la universidad</FormLabel>
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
                
                <FormField
                  control={form.control}
                  name="Area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Unidad o área</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Seleccione una opción"
                              {...field}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Contabilidad">
                              Contabilidad
                            </SelectItem>
                            <SelectItem value="Caja">Caja</SelectItem>
                            <SelectItem value="Personal Administrativo">
                              Personal Administrativo
                            </SelectItem>
                            <SelectItem value="Otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                 {Area==="Otro" && (
                <FormField
                  control={form.control}
                  name="Otro_area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Especifique otra Area de la universidad</FormLabel>
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

                <FormField
                  control={form.control}
                  name="Telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase" >Teléfono </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese teléfono "
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Correo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase"> Correo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="fulanito@gmail.com"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Medio_Recepcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase"> Medio de recepción</FormLabel>
                      <FormControl>
                        <Input
                        placeholder="Plataforma"
                          {...field}
                          value={field.value ?? ""} 
                          disabled
                          className="font-semibold text-black"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Tipo_denuncia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Tipo de Denuncia </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Gestion Academica">
                              Gestión Académica
                            </SelectItem>
                            <SelectItem value="Gestion de Titulos">
                              Gestión de Títulos
                            </SelectItem>
                            <SelectItem value="Incumplimientos de Normas Academicas o Administrativas">
                              Incumplimientos de Normas Académicas o
                              Administrativas
                            </SelectItem>
                            <SelectItem value="Otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                 {Tipo_denuncia==="Otro" && (
                <FormField
                  control={form.control}
                  name="otros_tipo_denuncia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Especifique otro tipo de denuncia</FormLabel>
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
              </div>
            )}

            {/* PASO 2: DESCRIPCIÓN */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold uppercase mb-2">
                  II. DESCRIPCIÓN DE LA DENUNCIA
                </h3>

                <FormField
                  control={form.control}
                  name="Descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Resumen de los hechos denunciados</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa los hechos aquí..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Fecha de la incidencia</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Fecha de los hechos"
                          {...field}
                          type="date"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lugar_incidencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Lugar de la incidiencia</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Lugar de los hechos"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="persona_involucrada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase"> Area involucrada</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Contabilidad">
                             Contabilidad
                            
                             
                            </SelectItem>
                             <SelectItem value="Informatica">
                            Informatica
                            
                             
                            </SelectItem>
                            
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                {/*Muestra si la selccion de persona involucrada es persona */}
                {persona_involucrada==="Contabilidad" && (
                <FormField
                  control={form.control}  
                  name="Contabilidad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Nombre de la persona involucrada</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Juan Perez">
                              Juan Perez
                            </SelectItem>
                            <SelectItem value="Maria Gomez">
                              Maria Gomez
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                )}
                
               {persona_involucrada==="Informatica" && (
                <FormField
                  control={form.control}  
                  name="Informatica"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Nombre del Persona  involucrada</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pepito">
                            pepito
                            </SelectItem>
                            <SelectItem value="pepito1">
                             pepito1
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}>
                    
                 </FormField>
                )}
              </div>
            )}

            {/* PASO 3: EVIDENCIAS */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold uppercase mb-2">
                  III. EVIDENCIAS ADJUNTAS
                </h3>

                <FormField
                  control={form.control}
                  name="Documentos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Documentos (PDF)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Imagenes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Imágenes (JPG/PNG)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/jpeg,image/png"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Video"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold uppercase">Video (MP4/WebM)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="video/mp4,video/webm"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            )}
             

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Atrás
                </button>
              )}

              {step < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-red-800 text-white rounded ml-auto"
                >
                  Siguiente
                </button>
              )}

              {step === 3 && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded ml-auto"
                >
                  Enviar
                </button>
              )}
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}