import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { ClipboardList, AlertCircle, Plus, Trash2, Info } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

// ─── Schema Zod ──────────────────────────────────────────────────────────────
const medidaSchema = z.object({
  descripcion: z.string().min(5, "Describa la medida (mínimo 5 caracteres)"),
  responsable: z.string().min(3, "Indique el responsable"),
  fechaPrevista: z.string().min(1, "Seleccione una fecha prevista"),
  estado: z.enum(["Pendiente", "En proceso", "Finalizado"], {
    errorMap: () => ({ message: "Seleccione un estado" }),
  }),
});

const seguimientoSchema = z.object({
  medidas: z.array(medidaSchema).min(1, "Debe registrar al menos una medida correctiva"),
  evidencias: z.string().optional(),
  conclusion: z.enum(["Cumplidas", "En proceso", "No cumplidas"], {
    errorMap: () => ({ message: "Seleccione la conclusión del seguimiento" }),
  }),
});

// ─── Helpers de estilos por estado ───────────────────────────────────────────
const estadoBadge = {
  "Pendiente":   "bg-amber-100 text-amber-700 border border-amber-300",
  "En proceso":  "bg-blue-100 text-blue-700 border border-blue-300",
  "Finalizado":  "bg-emerald-100 text-emerald-700 border border-emerald-300",
};

// ─── Componente principal ─────────────────────────────────────────────────────
export default function SeguimientoMedidasForm({ 
  numeroDenuncia = "DEN-2026-0892",
  fechaResolucion = new Date().toISOString().split('T')[0]
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(seguimientoSchema),
    defaultValues: {
      medidas: [
        { descripcion: "", responsable: "", fechaPrevista: "", estado: "Pendiente" }
      ],
      evidencias: "",
      conclusion: "",
    }
  });

  // useFieldArray para el array dinámico de medidas
  const { fields, append, remove } = useFieldArray({
    control,
    name: "medidas",
  });

  const medidasWatched = watch("medidas");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = { numeroDenuncia, fechaResolucion, ...data };
      console.log("Enviando a API (/api/seguimientos):", payload);
      await new Promise(resolve => setTimeout(resolve, 1500));

      Swal.fire({
        title: '¡Seguimiento Registrado!',
        text: 'El registro de seguimiento y medidas correctivas ha sido guardado correctamente.',
        icon: 'success',
        confirmButtonColor: '#7c3aed',
      });

      reset();
    } catch (error) {
      Swal.fire({
        title: 'Error al guardar',
        text: 'Ocurrió un problema al registrar el seguimiento. Intente nuevamente.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-md border-slate-200">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <CardHeader className="bg-violet-50/60 border-b border-violet-100 pb-6 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="bg-violet-100 p-2 rounded-lg">
            <ClipboardList className="w-6 h-6 text-violet-700" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Seguimiento y Medidas Correctivas (FCD-05)
            </CardTitle>
            <CardDescription className="text-slate-600 mt-1">
              Control del cumplimiento de las medidas dictadas en la resolución.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ── Datos del Caso (read-only) ────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="space-y-2">
              <Label className="text-slate-600">N.° de Denuncia / Expediente</Label>
              <Input
                value={numeroDenuncia}
                disabled
                className="bg-white text-slate-600 font-medium cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600">Fecha de Resolución de Referencia</Label>
              <Input
                type="date"
                value={fechaResolucion}
                disabled
                className="bg-white text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* ── Tabla dinámica de Medidas (useFieldArray) ─────────────────── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-lg font-semibold text-slate-800">
                  Medidas Correctivas <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-slate-500 mt-1">
                  Registre cada medida dictada, su responsable, fecha prevista y estado actual.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ descripcion: "", responsable: "", fechaPrevista: "", estado: "Pendiente" })}
                className="flex items-center gap-2 text-violet-700 border-violet-300 hover:bg-violet-50 hover:border-violet-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar medida
              </Button>
            </div>

            {/* Error global del array */}
            {errors.medidas?.root?.message && (
              <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.medidas.root.message}
              </p>
            )}
            {errors.medidas?.message && (
              <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.medidas.message}
              </p>
            )}

            {/* Cards dinámicas de cada medida */}
            <div className="space-y-4">
              {fields.map((field, index) => {
                const estadoActual = medidasWatched?.[index]?.estado;
                return (
                  <div
                    key={field.id}
                    className="relative p-5 rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Encabezado de la medida */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 text-violet-700 font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-slate-700 text-sm">Medida #{index + 1}</span>
                        {estadoActual && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge[estadoActual] || ""}`}>
                            {estadoActual}
                          </span>
                        )}
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0 rounded-full"
                          title="Eliminar medida"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    {/* Campos de la medida — grid responsive */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* Descripción */}
                      <div className="md:col-span-2 space-y-1">
                        <Label className="text-slate-700 text-sm">
                          Descripción de la medida <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Ej. Capacitar al personal del área de Registro en el protocolo de atención..."
                          {...register(`medidas.${index}.descripcion`)}
                          className={errors.medidas?.[index]?.descripcion ? "border-red-400 focus-visible:ring-red-400" : ""}
                        />
                        {errors.medidas?.[index]?.descripcion && (
                          <p className="text-red-500 text-xs">{errors.medidas[index].descripcion.message}</p>
                        )}
                      </div>

                      {/* Responsable */}
                      <div className="space-y-1">
                        <Label className="text-slate-700 text-sm">
                          Responsable <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Ej. Jefe de Unidad de Calidad"
                          {...register(`medidas.${index}.responsable`)}
                          className={errors.medidas?.[index]?.responsable ? "border-red-400 focus-visible:ring-red-400" : ""}
                        />
                        {errors.medidas?.[index]?.responsable && (
                          <p className="text-red-500 text-xs">{errors.medidas[index].responsable.message}</p>
                        )}
                      </div>

                      {/* Fecha prevista */}
                      <div className="space-y-1">
                        <Label className="text-slate-700 text-sm">
                          Fecha prevista <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="date"
                          {...register(`medidas.${index}.fechaPrevista`)}
                          className={errors.medidas?.[index]?.fechaPrevista ? "border-red-400 focus-visible:ring-red-400" : ""}
                        />
                        {errors.medidas?.[index]?.fechaPrevista && (
                          <p className="text-red-500 text-xs">{errors.medidas[index].fechaPrevista.message}</p>
                        )}
                      </div>

                      {/* Estado */}
                      <div className="md:col-span-2 space-y-1">
                        <Label className="text-slate-700 text-sm">
                          Estado <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex gap-3 flex-wrap">
                          {["Pendiente", "En proceso", "Finalizado"].map((opcion) => (
                            <label
                              key={opcion}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-sm font-medium transition-all
                                ${medidasWatched?.[index]?.estado === opcion
                                  ? opcion === "Pendiente"
                                    ? "bg-amber-50 border-amber-400 text-amber-700"
                                    : opcion === "En proceso"
                                    ? "bg-blue-50 border-blue-400 text-blue-700"
                                    : "bg-emerald-50 border-emerald-400 text-emerald-700"
                                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                              <input
                                type="radio"
                                value={opcion}
                                {...register(`medidas.${index}.estado`)}
                                className="sr-only"
                              />
                              {opcion}
                            </label>
                          ))}
                        </div>
                        {errors.medidas?.[index]?.estado && (
                          <p className="text-red-500 text-xs">{errors.medidas[index].estado.message}</p>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Evidencias presentadas ────────────────────────────────────── */}
          <div className="space-y-2">
            <Label htmlFor="evidencias" className="text-base font-semibold text-slate-800">
              Evidencias presentadas
            </Label>
            <Textarea
              id="evidencias"
              placeholder="Describa los documentos, fotos, actas u otras evidencias que acreditan el cumplimiento de las medidas..."
              className="min-h-[100px] resize-y"
              {...register("evidencias")}
            />
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <Info className="w-3 h-3" />
              Campo opcional. Puede detallar cualquier evidencia que respalde el seguimiento.
            </p>
          </div>

          {/* ── Conclusión del seguimiento ────────────────────────────────── */}
          <div className="space-y-3 pt-2">
            <Label className="text-base font-semibold text-slate-800">
              Conclusión del seguimiento <span className="text-red-500">*</span>
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  value: "Cumplidas",
                  desc: "Todas las medidas han sido ejecutadas correctamente.",
                  colorActive: "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500",
                  dot: "bg-emerald-500",
                },
                {
                  value: "En proceso",
                  desc: "Algunas medidas aún están siendo implementadas.",
                  colorActive: "bg-blue-50 border-blue-500 ring-1 ring-blue-500",
                  dot: "bg-blue-500",
                },
                {
                  value: "No cumplidas",
                  desc: "Las medidas no han sido ejecutadas en el plazo establecido.",
                  colorActive: "bg-red-50 border-red-500 ring-1 ring-red-500",
                  dot: "bg-red-500",
                },
              ].map(({ value, desc, colorActive, dot }) => {
                const isSelected = watch("conclusion") === value;
                return (
                  <label
                    key={value}
                    className={`flex cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
                      isSelected ? colorActive : "bg-white border-slate-200 hover:bg-slate-50"
                    } ${errors.conclusion ? "border-red-300" : ""}`}
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register("conclusion")}
                      className="sr-only"
                    />
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? dot : "bg-slate-300"}`} />
                        <span className="font-semibold text-slate-900 text-sm">{value}</span>
                      </div>
                      <span className="text-xs text-slate-500 mt-1">{desc}</span>
                    </div>
                  </label>
                );
              })}
            </div>

            {errors.conclusion && (
              <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.conclusion.message}
              </p>
            )}
          </div>

          {/* ── Footer ───────────────────────────────────────────────────── */}
          <CardFooter className="px-0 pt-6 pb-0 flex justify-end gap-3 border-t border-slate-100 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Limpiar Formulario
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-violet-600 hover:bg-violet-700 text-white min-w-[220px]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Guardando seguimiento...
                </>
              ) : (
                "Registrar Seguimiento"
              )}
            </Button>
          </CardFooter>

        </form>
      </CardContent>
    </Card>
  );
}
