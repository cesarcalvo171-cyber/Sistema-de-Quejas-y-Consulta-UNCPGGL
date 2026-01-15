import { Navigate, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/page/Login/Login";
import DefaultLayout from "@/Layout/default";  
import { ComplaintsSuggestions } from "@/page/complaints_suggestions/complaints_suggestions";
import { Ver_denuncia } from "@/page/Ver_Denuncia/Ver_Denuncia";
export default function Router() {

    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                
                <Route path="login" element={<LoginPage />} />
                <Route path="Inicio" element={<ComplaintsSuggestions />} />
                    <Route path="Inicio/Registro_Denuncias" element={<Ver_denuncia />} />



            </Route>
        </Routes>
    );
}
