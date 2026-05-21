import React from "react";
import EvaluacionPreliminarForm from "@/components/Formularios/EvaluacionPreliminarForm";

export function FCD_02pg() {
  return (
    <div className="container mx-auto py-10 px-4">
      {/* 
        Aquí le pasamos props simuladas al formulario.
        En el futuro, estos datos vendrán de una llamada a la API usando el ID de la queja de la URL.
      */}
      <EvaluacionPreliminarForm 
        numeroDenuncia="DEN-2026-0892" 
        fechaRecepcion="2026-05-20" 
      />
    </div>
  );
}
