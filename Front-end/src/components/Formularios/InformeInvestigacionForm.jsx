import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { Clock, AlertCircle, FileSearch } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const investigacionSchema = z.object({
  metodologia: z.array(z.string()).min(1, "Debe seleccionar al menos una metodología empleada"),
  descripcionHallazgos: z.string().min(10, "La descripción de hallazgos es obligatoria y debe ser detallada"),
  analisisValoracion: z.string().min(10, "El análisis y valoración es obligatorio"),
  conclusionesRecomendaciones: z.string().min(10, "Las conclusiones y recomendaciones son obligatorias"),
});

export default function InformeInvestigacionForm({ 
  numeroDenuncia = "DEN-2026-0892", 
  fechaInicio = new Date().toISOString().split('T')[0] 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(investigacionSchema),
    defaultValues: {
      metodologia: [],
      descripcionHallazgos: "",
      analisisValoracion: "",
      conclusionesRecomendaciones: "",
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        numeroDenuncia,
        fechaInicio,
        ...data
      };
      
      console.log("Enviando a API (/api/investigaciones):", payload);
      
      // Simula retraso de red
      await new Promise(resolve => setTimeout(resolve, 1500));

      Swal.fire({
        title: '¡Informe Guardado!',
        text: 'El informe de investigación ha sido registrado correctamente.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      
      reset();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un problema al guardar el informe. Intente nuevamente.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const opcionesMetodologia = [
    { id: "entrevistas", value: "Entrevistas", label: "Entrevistas" },
    { id: "revision", value: "Revisión documental", label: "Revisión Documental" },
    { id: "inspeccion", value: "Inspección en sitio", label: "Inspección en Sitio" },
    { id: "otros", value: "Otros", label: "Otros" },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md border-slate-200">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 rounded-t-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileSearch className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Informe de Investigación (FCD-03)
              </CardTitle>
              <CardDescription className="text-slate-500 mt-1">
                Registro de evidencias, hallazgos y entrevistas de la investigación.
              </CardDescription>
            </div>
          </div>
        </div>
        
        {/* Banner Informativo */}
        <div className="mt-4 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg p-3 flex items-start space-x-3">
          <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold block">Plazo Máximo: 3 Días Hábiles</span>
            Este informe debe completarse en un plazo máximo de 3 días hábiles desde la fecha de inicio de la investigación.
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Fila 1: Datos del Caso (Read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="space-y-2">
              <Label htmlFor="numeroDenuncia" className="text-slate-600">N.° de Denuncia</Label>
              <Input 
                id="numeroDenuncia" 
                value={numeroDenuncia} 
                disabled 
                className="bg-white text-slate-600 font-medium cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaInicio" className="text-slate-600">Fecha de Inicio de Investigación</Label>
              <Input 
                id="fechaInicio" 
                type="date"
                value={fechaInicio} 
                disabled 
                className="bg-white text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Fila 2: Checkboxes Metodología Nativos */}
          <div className="space-y-3 pt-2">
            <Label className="text-base font-semibold text-slate-800">Metodología Empleada <span className="text-red-500">*</span></Label>
            <p className="text-sm text-slate-500">Seleccione al menos una opción que describa cómo se llevó a cabo la investigación.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              {opcionesMetodologia.map((opcion) => (
                <label 
                  key={opcion.id} 
                  className={`relative flex items-center p-3 rounded-lg border cursor-pointer hover:bg-slate-50 transition-colors ${errors.metodologia ? 'border-red-300' : 'border-slate-200'}`}
                >
                  <input 
                    type="checkbox" 
                    value={opcion.value} 
                    {...register("metodologia")} 
                    className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span className="ml-3 text-sm font-medium text-slate-700">{opcion.label}</span>
                </label>
              ))}
            </div>
            {errors.metodologia && <p className="text-red-500 text-xs font-medium mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.metodologia.message}</p>}
          </div>

          {/* Fila 3: Textarea Hallazgos */}
          <div className="space-y-2 pt-2">
            <Label htmlFor="descripcionHallazgos" className="text-base font-semibold text-slate-800">Descripción de Hallazgos <span className="text-red-500">*</span></Label>
            <Textarea 
              id="descripcionHallazgos" 
              placeholder="Detalle los hechos encontrados, testimonios recabados o evidencias documentales descubiertas..."
              className={`min-h-[120px] resize-y ${errors.descripcionHallazgos ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              {...register("descripcionHallazgos")}
            />
            {errors.descripcionHallazgos && <p className="text-red-500 text-xs font-medium mt-1">{errors.descripcionHallazgos.message}</p>}
          </div>

          {/* Fila 4: Textarea Análisis */}
          <div className="space-y-2">
            <Label htmlFor="analisisValoracion" className="text-base font-semibold text-slate-800">Análisis y Valoración <span className="text-red-500">*</span></Label>
            <Textarea 
              id="analisisValoracion" 
              placeholder="Analice los hallazgos en contraste con la normativa vigente o el código de ética..."
              className={`min-h-[120px] resize-y ${errors.analisisValoracion ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              {...register("analisisValoracion")}
            />
            {errors.analisisValoracion && <p className="text-red-500 text-xs font-medium mt-1">{errors.analisisValoracion.message}</p>}
          </div>

          {/* Fila 5: Textarea Conclusiones */}
          <div className="space-y-2">
            <Label htmlFor="conclusionesRecomendaciones" className="text-base font-semibold text-slate-800">Conclusiones y Recomendaciones <span className="text-red-500">*</span></Label>
            <Textarea 
              id="conclusionesRecomendaciones" 
              placeholder="Escriba las conclusiones finales derivadas del análisis y qué acciones recomienda tomar..."
              className={`min-h-[120px] resize-y ${errors.conclusionesRecomendaciones ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              {...register("conclusionesRecomendaciones")}
            />
            {errors.conclusionesRecomendaciones && <p className="text-red-500 text-xs font-medium mt-1">{errors.conclusionesRecomendaciones.message}</p>}
          </div>

          <CardFooter className="px-0 pt-6 pb-0 flex justify-end gap-3 border-t border-slate-100 mt-6">
            <Button type="button" variant="outline" onClick={() => reset()} disabled={isSubmitting}>
              Limpiar Campos
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[180px]">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                'Guardar Informe'
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
