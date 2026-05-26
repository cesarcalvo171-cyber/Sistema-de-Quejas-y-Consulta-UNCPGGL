import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "../ui/button";
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
import { NavBarPublic } from "../publicos/Navbarpublic";
import { GoAlert } from "react-icons/go";
import { 
  User, 
  FileText, 
  Upload, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Info,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

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
  .refine((f) => ["image/jpeg", "image/png"].includes(f.type), "Solo JPG o PNG")
  .refine((f) => f.size <= 5 * 1024 * 1024, "Máx 5MB")
  .optional()
  .or(z.literal(null));

const videoFileSchema = z
  .instanceof(File)
  .refine(
    (f) => ["video/mp4", "video/webm"].includes(f.type),
    "Solo MP4 o WebM",
  )
  .refine((f) => f.size <= 50 * 1024 * 1024, "Máx 50MB")
  .optional()
  .or(z.literal(null));

/* =====================
   ESQUEMA PRINCIPAL
===================== */
const FCD_01Schema = z
  .object({
    Nombre_Completo: z.string().min(10, "El nombre completo debe tener al menos 10 caracteres").max(100),
    R_universitaria: z.enum([
      "Estudiante",
      "Docente",
      "Personal Administrativo",
      "Otro",
    ], {
      errorMap: () => ({ message: "Seleccione su relación universitaria" })
    }),
    otro_R_universitaria: z.string().optional(),
    Area: z.enum([
      "Contabilidad",
      "Caja",
      "Docente",
      "Personal Administrativo",
      "Otro",
    ], {
      errorMap: () => ({ message: "Seleccione un área o unidad" })
    }),
    Otro_area: z.string().optional(),
    Telefono: z
      .string()
      .regex(/^[0-9]+$/, "Solo se permiten números")
      .min(8, "Mínimo 8 dígitos")
      .max(20),
    Correo: z.string().email("Correo electrónico inválido").max(150),
    Medio_Recepcion: z.string().default("Plataforma"),
    Tipo_denuncia: z.enum([
      "Gestion Academica",
      "Gestion de Titulos",
      "Incumplimientos de Normas Academicas o Administrativas",
      "Otro",
    ], {
      errorMap: () => ({ message: "Seleccione un tipo de denuncia" })
    }),
    otros_tipo_denuncia: z.string().optional(),
    Descripcion: z.string().min(10, "Describa detalladamente los hechos (mínimo 10 caracteres)").max(2000),
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Seleccione una fecha válida"),
    lugar_incidencia: z.string().max(200).optional(),
    persona_involucrada: z.enum(["Contabilidad", "Informatica"], {
      errorMap: () => ({ message: "Seleccione el área involucrada" })
    }),
    persona_nombre: z.string(),
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

    if (data.persona_involucrada && !data.persona_nombre) {
      ctx.addIssue({
        path: ["persona_nombre"],
        message: "Debe ingresar el nombre de la persona involucrada",
        code: z.ZodIssueCode.custom,
      });
    }
  });

/* =====================
   COMPONENTE
===================== */
export function FCD_01() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setValue("persona_nombre", "");
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
    setIsSubmitting(true);
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
        title: "¡Denuncia Registrada!",
        html: `La solicitud fue enviada correctamente.<br><br><strong>Código de Registro:</strong> <span class="text-blue-600 font-bold">${result.numeroRegistro}</span>`,
        confirmButtonColor: '#1e3a8a',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-2xl shadow-xl border border-slate-100',
        }
      });

      reset();
      setStep(1);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la denuncia. Intente de nuevo.",
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Nombres y estados del Stepper
  const stepsConfig = [
    { number: 1, label: "Identificación", icon: User },
    { number: 2, label: "Detalle del Caso", icon: FileText },
    { number: 3, label: "Evidencias", icon: Upload }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <NavBarPublic />
      
      {/* Banner Informativo Superior Estilizado */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
          <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-sm text-slate-700 leading-relaxed space-y-1">
            <span className="font-bold text-slate-900 text-base block">Información de Seguridad</span>
            <p>
              Por favor introduzca sus datos de contacto. Se recomienda rellenar correctamente el campo de 
              <strong> Correo Electrónico</strong> para que reciba la constancia formal de recepción de su caso. 
              Los campos obligatorios están marcados con un asterisco (<span className="text-red-500 font-bold">*</span>).
            </p>
          </div>
        </div>
      </div>

      {/* Tarjeta del Formulario Principal */}
      <Card className="w-full max-w-4xl mx-auto mt-8 shadow-2xl border-slate-100 bg-white overflow-hidden rounded-2xl">
        
        {/* Encabezado y Stepper Integrado */}
        <div className="border-b border-slate-100 bg-slate-50/50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Formulario Institucional</span>
              <CardTitle className="text-2xl font-bold text-slate-800 mt-1 uppercase">
                Registro de Quejas y Denuncias (FCD-01)
              </CardTitle>
            </div>
            
            {/* Indicador de Paso */}
            <div className="bg-blue-600 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full shadow-md shadow-blue-500/20 self-start md:self-auto">
              Paso {step} de 3
            </div>
          </div>

          {/* Stepper Visual Premium */}
          <div className="mt-8 flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 pointer-events-none z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-500 pointer-events-none z-0"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>

            {stepsConfig.map((s) => {
              const StepIcon = s.icon;
              const isCompleted = step > s.number;
              const isActive = step === s.number;
              return (
                <div key={s.number} className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md
                    ${isCompleted ? 'bg-blue-600 text-white shadow-blue-600/20' : ''}
                    ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-blue-600/20 scale-110' : ''}
                    ${!isActive && !isCompleted ? 'bg-white border-2 border-slate-200 text-slate-400' : ''}
                  `}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-semibold mt-2 hidden sm:block ${isActive ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="FCD-01">
              
              {/* ========================================================
                  PASO 1: DATOS DEL DENUNCIANTE 
                  ======================================================== */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                      I. Identificación del Solicitante
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="Nombre_Completo"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                          Nombre completo <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingrese sus nombres y apellidos completos"
                            type="text"
                            className="h-11 rounded-xl shadow-sm border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs font-semibold" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="R_universitaria"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                            Relación universitaria <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-11 rounded-xl shadow-sm border-slate-200 focus:ring-blue-500/20 focus:border-blue-500">
                                <SelectValue placeholder="Seleccione su rol..." />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="Estudiante">Estudiante</SelectItem>
                                <SelectItem value="Docente">Docente</SelectItem>
                                <SelectItem value="Personal Administrativo">Personal Administrativo</SelectItem>
                                <SelectItem value="Otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Area"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                            Su área o unidad <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-11 rounded-xl shadow-sm border-slate-200 focus:ring-blue-500/20 focus:border-blue-500">
                                <SelectValue placeholder="Seleccione su departamento..." />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="Contabilidad">Contabilidad</SelectItem>
                                <SelectItem value="Caja">Caja</SelectItem>
                                <SelectItem value="Personal Administrativo">Personal Administrativo</SelectItem>
                                <SelectItem value="Otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Campos dinámicos condicionales "Otros" */}
                  {(R_universitaria === "Otro" || Area === "Otro") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      {R_universitaria === "Otro" && (
                        <FormField
                          control={form.control}
                          name="otro_R_universitaria"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                                Especifique relación
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Detalle su vínculo..."
                                  type="text"
                                  className="h-11 rounded-xl shadow-sm border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 bg-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-xs font-semibold" />
                            </FormItem>
                          )}
                        />
                      )}

                      {Area === "Otro" && (
                        <FormField
                          control={form.control}
                          name="Otro_area"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                                Especifique el área
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Escriba el nombre del área..."
                                  type="text"
                                  className="h-11 rounded-xl shadow-sm border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 bg-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-xs font-semibold" />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="Telefono"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                            Teléfono de contacto <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Phone className="w-4 h-4" /></span>
                              <Input
                                placeholder="Ej. 987654321"
                                type="text"
                                className="h-11 rounded-xl shadow-sm border-slate-200 pl-10 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Correo"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                            Correo Electrónico <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4" /></span>
                              <Input
                                placeholder="nombre@correo.com"
                                type="email"
                                className="h-11 rounded-xl shadow-sm border-slate-200 pl-10 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="Medio_Recepcion"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-500 uppercase text-xs tracking-wider">
                            Medio de Ingreso
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><ShieldCheck className="w-4 h-4" /></span>
                              <Input
                                {...field}
                                disabled
                                className="h-11 rounded-xl bg-slate-100 pl-10 text-slate-500 font-bold border-slate-200 cursor-not-allowed"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Tipo_denuncia"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                            Tipología del Caso <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-11 rounded-xl shadow-sm border-slate-200 focus:ring-blue-500/20 focus:border-blue-500">
                                <SelectValue placeholder="Seleccione categoría..." />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="Gestion Academica">Gestión Académica</SelectItem>
                                <SelectItem value="Gestion de Titulos">Gestión de Títulos</SelectItem>
                                <SelectItem value="Incumplimientos de Normas Academicas o Administrativas">Incumplimiento de Normativa</SelectItem>
                                <SelectItem value="Otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {Tipo_denuncia === "Otro" && (
                    <FormField
                      control={form.control}
                      name="otros_tipo_denuncia"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                            Escriba el tipo de caso
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Especifique el asunto..."
                              type="text"
                              className="h-11 rounded-xl shadow-sm border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {/* ========================================================
                  PASO 2: DESCRIPCIÓN Y DETALLE 
                  ======================================================== */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                      II. Detalle e Incidencias del Caso
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="Descripcion"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                          Hechos Denunciados <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Redacte de forma clara, objetiva y cronológica los hechos ocurridos..."
                            className="min-h-[140px] resize-y rounded-xl shadow-sm border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 p-4 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs font-semibold" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fecha"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                            Fecha del Suceso <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Calendar className="w-4 h-4" /></span>
                              <Input
                                type="date"
                                className="h-11 rounded-xl shadow-sm border-slate-200 pl-10 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lugar_incidencia"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                            Lugar de Ocurrencia
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><MapPin className="w-4 h-4" /></span>
                              <Input
                                placeholder="Ej. Ventanilla 2 de Tesorería"
                                className="h-11 rounded-xl shadow-sm border-slate-200 pl-10 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-6">
                    <FormField
                      control={form.control}
                      name="persona_involucrada"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                            ¿A qué departamento involucra? <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white focus:ring-blue-500/20 focus:border-blue-500">
                                <SelectValue placeholder="Seleccione el área involucrada..." />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="Contabilidad">Contabilidad</SelectItem>
                                <SelectItem value="Informatica">Informática</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />

                    {/* Mostrar personas según el área involucrada seleccionada */}
                    {persona_involucrada && (
                      <FormField
                        control={form.control}
                        name="persona_nombre"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5 animate-fadeIn">
                            <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                              Servidor Público involucrado <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white focus:ring-blue-500/20 focus:border-blue-500">
                                  <SelectValue placeholder="Seleccione el servidor..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  {persona_involucrada === "Contabilidad" ? (
                                    <>
                                      <SelectItem value="Juan Perez">Juan Perez (Contabilidad)</SelectItem>
                                      <SelectItem value="Maria Gomez">Maria Gomez (Contabilidad)</SelectItem>
                                    </>
                                  ) : (
                                    <>
                                      <SelectItem value="pepito">Pepito (Informática)</SelectItem>
                                      <SelectItem value="pepito1">Pepito 1 (Informática)</SelectItem>
                                    </>
                                  )}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs font-semibold" />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================
                  PASO 3: ARCHIVOS Y EVIDENCIAS
                  ======================================================== */}
              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                      III. Soporte Probatorio (Opcional)
                    </h3>
                  </div>
                  
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Adjunte cualquier documento, imagen o vídeo que sirva de respaldo para acelerar el análisis y fundamentar legalmente su denuncia.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Documentos */}
                    <FormField
                      control={form.control}
                      name="Documentos"
                      render={({ field }) => (
                        <FormItem className="space-y-2 border border-slate-100 bg-slate-50/50 p-4 rounded-xl shadow-sm">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider block">
                            Documentos (PDF)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="application/pdf"
                              className="h-10 rounded-lg text-xs cursor-pointer border-slate-200 bg-white file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0] || null)
                              }
                            />
                          </FormControl>
                          <span className="text-[10px] text-slate-400 block">Límite: PDF de hasta 5MB</span>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />

                    {/* Imágenes */}
                    <FormField
                      control={form.control}
                      name="Imagenes"
                      render={({ field }) => (
                        <FormItem className="space-y-2 border border-slate-100 bg-slate-50/50 p-4 rounded-xl shadow-sm">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider block">
                            Capturas (JPG/PNG)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/jpeg,image/png"
                              className="h-10 rounded-lg text-xs cursor-pointer border-slate-200 bg-white file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0] || null)
                              }
                            />
                          </FormControl>
                          <span className="text-[10px] text-slate-400 block">Límite: Imagen de hasta 5MB</span>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />

                    {/* Videos */}
                    <FormField
                      control={form.control}
                      name="Video"
                      render={({ field }) => (
                        <FormItem className="space-y-2 border border-slate-100 bg-slate-50/50 p-4 rounded-xl shadow-sm">
                          <FormLabel className="font-semibold text-slate-700 uppercase text-xs tracking-wider block">
                            Vídeos (MP4/WebM)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="video/mp4,video/webm"
                              className="h-10 rounded-lg text-xs cursor-pointer border-slate-200 bg-white file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0] || null)
                              }
                            />
                          </FormControl>
                          <span className="text-[10px] text-slate-400 block">Límite: Grabación de hasta 50MB</span>
                          <FormMessage className="text-red-500 text-xs font-semibold" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Botonera de Navegación Multistep */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-8 gap-3">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="rounded-xl px-6 h-11 font-semibold text-slate-600 transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Regresar
                  </Button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 px-8 h-11 font-semibold tracking-wide ml-auto transition-all flex items-center gap-1.5"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 px-8 h-11 font-semibold tracking-wide ml-auto transition-all flex items-center justify-center gap-1.5 min-w-[160px]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
