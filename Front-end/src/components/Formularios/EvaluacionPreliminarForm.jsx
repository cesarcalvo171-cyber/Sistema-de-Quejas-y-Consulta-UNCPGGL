import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { Clock, AlertCircle, Info, FileText, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const evaluacionSchema = z.object({
  tipoTramite: z.enum(["Queja", "Reclamo", "Denuncia"], {
    errorMap: () => ({ message: "Seleccione un tipo de trámite válido" }),
  }),
  instanciaReceptora: z.string().min(3, "La instancia receptora debe tener al menos 3 caracteres"),
  resumenHechos: z.string().min(20, "El resumen de los hechos debe tener al menos 20 caracteres"),
  resultado: z.enum(["Procede", "No procede", "Requiere información adicional"], {
    errorMap: () => ({ message: "Debe seleccionar un resultado para la evaluación" }),
  }),
  observaciones: z.string().optional(),
});

export default function EvaluacionPreliminarForm({ 
  numeroDenuncia = "DEN-2026-0001", 
  fechaRecepcion = new Date().toISOString().split('T')[0] 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(evaluacionSchema),
    defaultValues: {
      tipoTramite: "",
      instanciaReceptora: "",
      resumenHechos: "",
      resultado: "",
      observaciones: "",
    }
  });

  const selectedResultado = watch("resultado");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        numeroDenuncia,
        fechaRecepcion,
        ...data
      };
      
      console.log("Enviando a API (/api/evaluaciones):", payload);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Swal.fire({
        title: '¡Evaluación Registrada!',
        text: 'La evaluación preliminar ha sido guardada con éxito en el sistema.',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-2xl shadow-xl border border-slate-100',
        }
      });
      
      reset();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un problema al guardar la evaluación. Intente nuevamente.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-slate-100 bg-white/90 backdrop-blur-md overflow-hidden rounded-2xl">
      {/* Encabezado Premium con gradiente sutil */}
      <CardHeader className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 pb-8 pt-8 px-8">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 bg-clip-text text-transparent">
                Evaluación Preliminar (FCD-02)
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium mt-0.5">
                Módulo de revisión técnica para la admisibilidad de expedientes
              </CardDescription>
            </div>
          </div>
        </div>
        
        {/* Banner Informativo con Estilo Moderno */}
        <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 border border-blue-500/20 text-blue-900 rounded-xl p-4 flex items-start space-x-3 shadow-sm">
          <div className="p-1 bg-blue-500 text-white rounded-lg mt-0.5 shadow-md shadow-blue-500/20">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-sm leading-relaxed">
            <span className="font-bold text-blue-950 block text-base mb-0.5">Plazo Máximo Resolutivo: 1 Día Hábil</span>
            Conforme al Manual de Procesos Institucionales, esta evaluación preliminar debe ser resuelta y enviada dentro de las primeras 24 horas hábiles tras la recepción.
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Sección 1: Metadatos del expediente */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="numeroDenuncia" className="text-slate-600 font-semibold text-xs tracking-wider uppercase">Código del Expediente</Label>
              <div className="relative">
                <Input 
                  id="numeroDenuncia" 
                  value={numeroDenuncia} 
                  disabled 
                  className="bg-white/80 border-slate-200 text-slate-700 font-bold cursor-not-allowed pl-4 pr-10 shadow-sm focus:border-slate-300 rounded-xl"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaRecepcion" className="text-slate-600 font-semibold text-xs tracking-wider uppercase">Fecha de Ingreso</Label>
              <Input 
                id="fechaRecepcion" 
                type="date"
                value={fechaRecepcion} 
                disabled 
                className="bg-white/80 border-slate-200 text-slate-700 font-semibold cursor-not-allowed shadow-sm rounded-xl"
              />
            </div>
          </div>

          {/* Sección 2: Especificaciones técnicas del caso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tipoTramite" className="text-slate-700 font-semibold">Tipo de Trámite <span className="text-red-500">*</span></Label>
              <select
                id="tipoTramite"
                {...register("tipoTramite")}
                className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm ${errors.tipoTramite ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'}`}
              >
                <option value="">Seleccione una tipología...</option>
                <option value="Queja">Queja</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Denuncia">Denuncia</option>
              </select>
              {errors.tipoTramite && <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/>{errors.tipoTramite.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instanciaReceptora" className="text-slate-700 font-semibold">Instancia Receptora <span className="text-red-500">*</span></Label>
              <Input 
                id="instanciaReceptora" 
                placeholder="Ej. Oficina de Asuntos Estudiantiles"
                {...register("instanciaReceptora")}
                className={`h-11 rounded-xl shadow-sm border-slate-200 transition-all ${errors.instanciaReceptora ? 'border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500' : 'focus-visible:ring-blue-500/20 focus-visible:border-blue-500'}`}
              />
              {errors.instanciaReceptora && <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/>{errors.instanciaReceptora.message}</p>}
            </div>
          </div>

          {/* Sección 3: Hechos analizados */}
          <div className="space-y-2">
            <Label htmlFor="resumenHechos" className="text-slate-700 font-semibold">Resumen de Hechos Revisados <span className="text-red-500">*</span></Label>
            <Textarea 
              id="resumenHechos" 
              placeholder="Escriba un resumen detallado y objetivo de los hechos expuestos por el recurrente..."
              className={`min-h-[140px] resize-y rounded-xl shadow-sm border-slate-200 transition-all p-4 ${errors.resumenHechos ? 'border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500 bg-red-50/5' : 'focus-visible:ring-blue-500/20 focus-visible:border-blue-500'}`}
              {...register("resumenHechos")}
            />
            {errors.resumenHechos ? (
               <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/>{errors.resumenHechos.message}</p>
            ) : (
               <p className="text-slate-400 text-xs mt-1.5 flex items-center gap-1"><Info className="w-3.5 h-3.5 text-blue-500"/> Ingrese un resumen descriptivo sustentado (mínimo 20 caracteres).</p>
            )}
          </div>

          {/* Sección 4: Decisión y Calificación */}
          <div className="space-y-4 pt-2">
            <Label className="text-base font-bold text-slate-800 tracking-wide">Calificación y Resultado <span className="text-red-500">*</span></Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Opción Procede */}
              <div className="relative">
                <input 
                  type="radio" 
                  id="procede" 
                  value="Procede" 
                  {...register("resultado")} 
                  className="peer sr-only" 
                />
                <label 
                  htmlFor="procede"
                  className={`flex flex-col p-5 bg-white border rounded-2xl cursor-pointer transition-all duration-300 shadow-sm relative overflow-hidden select-none hover:bg-slate-50/50
                    peer-checked:border-blue-600 peer-checked:ring-2 peer-checked:ring-blue-500/10 peer-checked:shadow-md
                    ${errors.resultado ? 'border-red-200' : 'border-slate-200'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Admisible
                      </span>
                      <span className="text-slate-500 text-xs leading-relaxed mt-1">El expediente cumple la totalidad de requerimientos institucionales.</span>
                    </div>
                    {/* Custom Radio Button */}
                    <div className="h-5.5 w-5.5 rounded-full border border-slate-300 flex items-center justify-center transition-all bg-white
                      peer-checked:border-blue-600 peer-checked:bg-blue-600">
                      <div className="w-2 h-2 rounded-full bg-white scale-0 transition-transform peer-checked:scale-100"></div>
                    </div>
                  </div>
                  {selectedResultado === "Procede" && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  )}
                </label>
              </div>

              {/* Opción No Procede */}
              <div className="relative">
                <input 
                  type="radio" 
                  id="no-procede" 
                  value="No procede" 
                  {...register("resultado")} 
                  className="peer sr-only" 
                />
                <label 
                  htmlFor="no-procede"
                  className={`flex flex-col p-5 bg-white border rounded-2xl cursor-pointer transition-all duration-300 shadow-sm relative overflow-hidden select-none hover:bg-slate-50/50
                    peer-checked:border-red-500 peer-checked:ring-2 peer-checked:ring-red-500/10 peer-checked:shadow-md
                    ${errors.resultado ? 'border-red-200' : 'border-slate-200'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-500" />
                        Inadmisible
                      </span>
                      <span className="text-slate-500 text-xs leading-relaxed mt-1">Se desestima formalmente por no cumplir los requisitos legales.</span>
                    </div>
                    <div className="h-5.5 w-5.5 rounded-full border border-slate-300 flex items-center justify-center transition-all bg-white
                      peer-checked:border-red-500 peer-checked:bg-red-500">
                      <div className="w-2 h-2 rounded-full bg-white scale-0 transition-transform peer-checked:scale-100"></div>
                    </div>
                  </div>
                  {selectedResultado === "No procede" && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div>
                  )}
                </label>
              </div>

              {/* Opción Adicional */}
              <div className="relative">
                <input 
                  type="radio" 
                  id="adicional" 
                  value="Requiere información adicional" 
                  {...register("resultado")} 
                  className="peer sr-only" 
                />
                <label 
                  htmlFor="adicional"
                  className={`flex flex-col p-5 bg-white border rounded-2xl cursor-pointer transition-all duration-300 shadow-sm relative overflow-hidden select-none hover:bg-slate-50/50
                    peer-checked:border-amber-500 peer-checked:ring-2 peer-checked:ring-amber-500/10 peer-checked:shadow-md
                    ${errors.resultado ? 'border-red-200' : 'border-slate-200'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        Observado
                      </span>
                      <span className="text-slate-500 text-xs leading-relaxed mt-1">El expediente requiere subsanación o aportación de más evidencias.</span>
                    </div>
                    <div className="h-5.5 w-5.5 rounded-full border border-slate-300 flex items-center justify-center transition-all bg-white
                      peer-checked:border-amber-500 peer-checked:bg-amber-500">
                      <div className="w-2 h-2 rounded-full bg-white scale-0 transition-transform peer-checked:scale-100"></div>
                    </div>
                  </div>
                  {selectedResultado === "Requiere información adicional" && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                  )}
                </label>
              </div>

            </div>
            {errors.resultado && <p className="text-red-500 text-xs font-semibold mt-2 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/>{errors.resultado.message}</p>}
          </div>

          {/* Sección 5: Observaciones */}
          <div className="space-y-2 pt-2">
            <Label htmlFor="observaciones" className="text-slate-700 font-semibold">Observaciones y Precisiones <span className="text-slate-400 font-normal">(Opcional)</span></Label>
            <Textarea 
              id="observaciones" 
              placeholder="Describa de manera pormenorizada las consideraciones o requisitos faltantes..."
              className="min-h-[100px] resize-y rounded-xl shadow-sm border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all p-4"
              {...register("observaciones")}
            />
          </div>

          <CardFooter className="px-0 pt-6 pb-0 flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-100">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => reset()} 
              disabled={isSubmitting}
              className="w-full sm:w-auto hover:bg-slate-100 text-slate-600 rounded-xl px-6 h-11 font-medium transition-all"
            >
              Restablecer Campos
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 px-8 h-11 font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando evaluación...
                </>
              ) : (
                'Confirmar y Enviar'
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
