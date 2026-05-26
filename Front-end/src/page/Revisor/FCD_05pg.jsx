import React from "react";
import SeguimientoMedidasForm from "@/components/Formularios/SeguimientoMedidasForm";

export function FCD_05pg() {
  return (
    <div className="container mx-auto py-10 px-4">
      <SeguimientoMedidasForm
        numeroDenuncia="DEN-2026-0892"
        fechaResolucion="2026-05-20"
      />
    </div>
  );
}
