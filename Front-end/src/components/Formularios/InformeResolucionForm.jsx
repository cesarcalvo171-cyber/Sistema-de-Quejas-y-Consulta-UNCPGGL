import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { Scale, AlertCircle, Info, ShieldCheck } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const resolucionSchema = z.object({
  decisionFinal: z.enum(["Queja fundada", "No fundada", "Caso archivado", "Remitido a otra instancia"], {
    errorMap: () => ({ message: "Debe seleccionar una decisión final" }),
  }),
  fundamentoDecision: z.string().min(50, "El fundamento de la decisión debe tener un mínimo de 50 caracteres para asegurar la consistencia legal e institucional."),
  medidasAplicadas: z.array(z.string()).optional(),
});

export default function InformeResolucionForm({ 
  numeroDenuncia = "DEN-2026-0892",
  fechaResolucion = new Date().toISOString().split('T')[0]
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(resolucionSchema),
    defaultValues: {
      decisionFinal: "",
      fundamentoDecision: "",
      medidasAplicadas: [],
    }
  });

  // Observamos la decisión final para limpiar o requerir medidas
  const decisionFinalActual = watch("decisionFinal");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        numeroDenuncia,
        fechaResolucion,
        ...data
      };
      
      console.log("Enviando a API (/api/resoluciones):", payload);
      
      // Simula retraso de red
      await new Promise(resolve => setTimeout(resolve, 1500));

      Swal.fire({
        title: '¡Resolución Emitida!',
        text: 'El informe final de resolución ha sido guardado y notificado.',
        icon: 'success',
        confirmButtonColor: '#10b981', // Emerald color para resolución final
      });
      
      reset();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un problema al emitir la resolución. Intente nuevamente.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const opcionesMedidas = [
    { id: "amonestacion", value: "Amonestación", label: "Amonestación" },
    { id: "capacitacion", value: "Capacitación obligatoria", label: "Capacitación obligatoria" },
    { id: "mejora", value: "Mejora de proceso", label: "Mejora de proceso" },
    { id: "derivacion", value: "Derivación disciplinaria", label: "Derivación disciplinaria" },
    { id: "otro", value: "Otro", label: "Otra medida" },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md border-slate-200">
      <CardHeader className="bg-emerald-50/50 border-b border-emerald-100 pb-6 rounded-t-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Scale className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Informe Final de Resolución (FCD-04)
              </CardTitle>
              <CardDescription className="text-slate-600 mt-1">
                Emisión del dictamen final y acciones a tomar basadas en la investigación.
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Fila 1: Datos del Caso (Read-only) */}
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
              <Label className="text-slate-600">Fecha de Resolución</Label>
              <Input 
                type="date"
                value={fechaResolucion} 
                disabled 
                className="bg-white text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Fila 2: Decisión Final (Radio Buttons Personalizados) */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-slate-800">Decisión Final <span className="text-red-500">*</span></Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              
              <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${decisionFinalActual === "Queja fundada" ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' : 'bg-white hover:bg-slate-50'} ${errors.decisionFinal ? 'border-red-300' : 'border-slate-200'}`}>
                <input type="radio" value="Queja fundada" {...register("decisionFinal")} className="sr-only" />
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 flex items-center">
                    {decisionFinalActual === "Queja fundada" && <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600"/>}
                    Queja fundada
                  </span>
                  <span className="text-sm text-slate-500 mt-1">Se comprueban los hechos denunciados y se aplicarán medidas correctivas.</span>
                </div>
              </label>

              <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${decisionFinalActual === "No fundada" ? 'bg-slate-100 border-slate-400 ring-1 ring-slate-400' : 'bg-white hover:bg-slate-50'} ${errors.decisionFinal ? 'border-red-300' : 'border-slate-200'}`}>
                <input type="radio" value="No fundada" {...register("decisionFinal")} className="sr-only" />
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">No fundada</span>
                  <span className="text-sm text-slate-500 mt-1">No existen pruebas suficientes para sustentar la denuncia.</span>
                </div>
              </label>

              <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${decisionFinalActual === "Caso archivado" ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500' : 'bg-white hover:bg-slate-50'} ${errors.decisionFinal ? 'border-red-300' : 'border-slate-200'}`}>
                <input type="radio" value="Caso archivado" {...register("decisionFinal")} className="sr-only" />
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">Caso archivado</span>
                  <span className="text-sm text-slate-500 mt-1">Se archiva por falta de información o abandono del caso.</span>
                </div>
              </label>

              <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${decisionFinalActual === "Remitido a otra instancia" ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white hover:bg-slate-50'} ${errors.decisionFinal ? 'border-red-300' : 'border-slate-200'}`}>
                <input type="radio" value="Remitido a otra instancia" {...register("decisionFinal")} className="sr-only" />
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">Remitido a otra instancia</span>
                  <span className="text-sm text-slate-500 mt-1">El caso sale de nuestra jurisdicción o pasa a nivel superior.</span>
                </div>
              </label>

            </div>
            {errors.decisionFinal && <p className="text-red-500 text-sm font-medium mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.decisionFinal.message}</p>}
          </div>

          {/* Fila 3: Fundamento (Textarea con validación estricta) */}
          <div className="space-y-2">
            <Label htmlFor="fundamentoDecision" className="text-base font-semibold text-slate-800">Fundamento de la decisión <span className="text-red-500">*</span></Label>
            <p className="text-sm text-slate-500 mb-2">Describa el razonamiento legal, normativo e institucional que justifica la decisión tomada.</p>
            <Textarea 
              id="fundamentoDecision" 
              placeholder="En base a las pruebas recabadas en el informe FCD-03 y lo establecido en el Artículo X del manual institucional..."
              className={`min-h-[150px] resize-y text-base ${errors.fundamentoDecision ? 'border-red-500 focus-visible:ring-red-500 bg-red-50/20' : ''}`}
              {...register("fundamentoDecision")}
            />
            {errors.fundamentoDecision ? (
              <p className="text-red-500 text-sm font-medium mt-1 flex items-start"><AlertCircle className="w-4 h-4 mr-1 mt-0.5 shrink-0"/>{errors.fundamentoDecision.message}</p>
            ) : (
              <p className="text-slate-400 text-xs mt-1 flex items-center"><Info className="w-3 h-3 mr-1"/> Mínimo 50 caracteres para validación legal.</p>
            )}
          </div>

          {/* Fila 4: Medidas Aplicadas (Checkboxes) */}
          <div className="space-y-3 pt-2">
            <Label className="text-base font-semibold text-slate-800">Medidas aplicadas o recomendadas</Label>
            <p className="text-sm text-slate-500 mb-2">Seleccione las acciones disciplinarias o correctivas que se desprenden de esta resolución (opcional).</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {opcionesMedidas.map((medida) => (
                <label 
                  key={medida.id} 
                  className="relative flex items-center p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <input 
                    type="checkbox" 
                    value={medida.value} 
                    {...register("medidasAplicadas")} 
                    className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="ml-3 text-sm font-medium text-slate-700">{medida.label}</span>
                </label>
              ))}
            </div>
          </div>

          <CardFooter className="px-0 pt-6 pb-0 flex justify-end gap-3 border-t border-slate-100 mt-6">
            <Button type="button" variant="outline" onClick={() => reset()} disabled={isSubmitting}>
              Limpiar Formulario
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[200px]">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Emitiendo Resolución...
                </>
              ) : (
                'Emitir Dictamen Final'
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
