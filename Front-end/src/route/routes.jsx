import { Navigate, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/page/Login/Login";
import DefaultLayout from "@/Layout/default";
import { InicioPg } from "@/page/complaints_suggestions/complaints_suggestions";
import { Ver_denuncia } from "@/page/Ver_Denuncia/Ver_Denuncia";
import { FCD_01pg } from "@/page/FORMULARIO/FDC-001pg";
import { Inicio_RVpg } from "@/page/Revisor/Revisor";
import { Tabla_BuzonPg } from "@/page/Revisor/Tabla_BuzonPg";
import { FCD_03pg } from "@/page/FORMULARIO/formulario3";
import { FCD_02pg } from "@/page/Revisor/FCD_02pg";
import { FCD_04pg } from "@/page/Revisor/FCD_04pg";
import { FCD_05pg } from "@/page/Revisor/FCD_05pg";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="Inicio" element={<InicioPg />} />
        <Route path="Inicio/Registro_Denuncias" element={<Ver_denuncia />} />
        <Route path="Inicio/Formulario_FCD-001" element={<FCD_01pg />} />
         <Route path="Revision" element={<Inicio_RVpg />} /> 
         <Route path="Revision/Tabla_Buzon" element={<Tabla_BuzonPg/>} /> 
         <Route path="Revision/FCD-02" element={<FCD_02pg />} />
         <Route path="Revision/FCD-04" element={<FCD_04pg />} />
         <Route path="Revision/FCD-05" element={<FCD_05pg />} />
         <Route path="Revision/FCD-03" element={<FCD_03pg/>} /> 
      </Route>
    </Routes>
  );
}
