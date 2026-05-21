import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { Clock, AlertCircle, Info } from 'lucide-react';

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
    reset
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulación de llamada a la API
      const payload = {
        numeroDenuncia,
        fechaRecepcion,
        ...data
      };
      
      console.log("Enviando a API (/api/evaluaciones):", payload);
      
      // Simula retraso de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Fetch simulado
      // await fetch('/api/evaluaciones', { method: 'POST', body: JSON.stringify(payload) });

      Swal.fire({
        title: '¡Evaluación Registrada!',
        text: 'La evaluación preliminar ha sido guardada con éxito.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      
      reset();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un problema al guardar la evaluación. Intente nuevamente.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md border-slate-200">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 rounded-t-xl">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Evaluación Preliminar (FCD-02)
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Determine la admisibilidad de la denuncia.
            </CardDescription>
          </div>
        </div>
        
        {/* Banner Informativo */}
        <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-3 flex items-start space-x-3">
          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold block">Plazo Máximo: 1 Día Hábil</span>
            Esta evaluación debe completarse y emitirse en un plazo no mayor a 1 día hábil desde la fecha de recepción de la denuncia, según el manual institucional.
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Fila 1: Datos Read-only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="numeroDenuncia" className="text-slate-600">N.° de Denuncia</Label>
              <Input 
                id="numeroDenuncia" 
                value={numeroDenuncia} 
                disabled 
                className="bg-slate-100 text-slate-500 font-medium cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaRecepcion" className="text-slate-600">Fecha de Recepción</Label>
              <Input 
                id="fechaRecepcion" 
                type="date"
                value={fechaRecepcion} 
                disabled 
                className="bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Fila 2: Select e Input corto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tipoTramite">Tipo de Trámite <span className="text-red-500">*</span></Label>
              <select
                id="tipoTramite"
                {...register("tipoTramite")}
                className={`flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.tipoTramite ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-slate-400'}`}
              >
                <option value="">Seleccione una opción</option>
                <option value="Queja">Queja</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Denuncia">Denuncia</option>
              </select>
              {errors.tipoTramite && <p className="text-red-500 text-xs font-medium mt-1">{errors.tipoTramite.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instanciaReceptora">Instancia Receptora <span className="text-red-500">*</span></Label>
              <Input 
                id="instanciaReceptora" 
                placeholder="Ej. Secretaría Académica"
                {...register("instanciaReceptora")}
                className={errors.instanciaReceptora ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {errors.instanciaReceptora && <p className="text-red-500 text-xs font-medium mt-1">{errors.instanciaReceptora.message}</p>}
            </div>
          </div>

          {/* Fila 3: Textarea Resumen */}
          <div className="space-y-2">
            <Label htmlFor="resumenHechos">Resumen de hechos revisados <span className="text-red-500">*</span></Label>
            <Textarea 
              id="resumenHechos" 
              placeholder="Describa brevemente los hechos analizados en la denuncia..."
              className={`min-h-[120px] resize-y ${errors.resumenHechos ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              {...register("resumenHechos")}
            />
            {errors.resumenHechos ? (
               <p className="text-red-500 text-xs font-medium mt-1">{errors.resumenHechos.message}</p>
            ) : (
               <p className="text-slate-400 text-xs mt-1 flex items-center"><Info className="w-3 h-3 mr-1"/> Mínimo 20 caracteres.</p>
            )}
          </div>

          {/* Fila 4: Radio Buttons Nativos (Resultado) */}
          <div className="space-y-3 pt-2">
            <Label className="text-base font-semibold text-slate-800">Resultado de Evaluación <span className="text-red-500">*</span></Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <label className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:bg-slate-50 focus:outline-none transition-all ${errors.resultado ? 'border-red-300' : 'border-slate-200'}`}>
                <input type="radio" value="Procede" {...register("resultado")} className="peer sr-only" />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="font-medium text-slate-900">Procede</p>
                      <div className="text-slate-500 text-xs mt-1">Cumple con los requisitos.</div>
                    </div>
                  </div>
                  {/* Custom Radio Circle */}
                  <div className="h-5 w-5 rounded-full border border-slate-300 bg-white peer-checked:border-[6px] peer-checked:border-blue-600 transition-all"></div>
                </div>
              </label>

              <label className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:bg-slate-50 focus:outline-none transition-all ${errors.resultado ? 'border-red-300' : 'border-slate-200'}`}>
                <input type="radio" value="No procede" {...register("resultado")} className="peer sr-only" />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="font-medium text-slate-900">No procede</p>
                      <div className="text-slate-500 text-xs mt-1">Se desestima el caso.</div>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border border-slate-300 bg-white peer-checked:border-[6px] peer-checked:border-red-500 transition-all"></div>
                </div>
              </label>

              <label className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:bg-slate-50 focus:outline-none transition-all ${errors.resultado ? 'border-red-300' : 'border-slate-200'}`}>
                <input type="radio" value="Requiere información adicional" {...register("resultado")} className="peer sr-only" />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="font-medium text-slate-900">Más Información</p>
                      <div className="text-slate-500 text-xs mt-1">Requiere subsanación.</div>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border border-slate-300 bg-white peer-checked:border-[6px] peer-checked:border-amber-500 transition-all"></div>
                </div>
              </label>

            </div>
            {errors.resultado && <p className="text-red-500 text-xs font-medium mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.resultado.message}</p>}
          </div>

          {/* Fila 5: Textarea Observaciones */}
          <div className="space-y-2 pt-2">
            <Label htmlFor="observaciones">Observaciones (Opcional)</Label>
            <Textarea 
              id="observaciones" 
              placeholder="Anotaciones adicionales..."
              className="min-h-[80px] resize-y"
              {...register("observaciones")}
            />
          </div>

          <CardFooter className="px-0 pt-4 pb-0 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => reset()} disabled={isSubmitting}>
              Limpiar Campos
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                'Emitir Evaluación'
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
