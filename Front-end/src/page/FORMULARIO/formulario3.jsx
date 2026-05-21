import InformeInvestigacionForm from "@/components/Formularios/InformeInvestigacionForm";

export function FCD_03pg() {
  return (
    <div className="container mx-auto py-10 px-4">
      <InformeInvestigacionForm 
        numeroDenuncia="DEN-2026-0892" 
        fechaInicio="2026-05-20" 
      />
    </div>
  );
}