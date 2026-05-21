import React from "react";
import InformeResolucionForm from "@/components/Formularios/InformeResolucionForm";

export function FCD_04pg() {
  return (
    <div className="container mx-auto py-10 px-4">
      <InformeResolucionForm 
        numeroDenuncia="DEN-2026-0892" 
        fechaResolucion="2026-05-20" 
      />
    </div>
  );
}
