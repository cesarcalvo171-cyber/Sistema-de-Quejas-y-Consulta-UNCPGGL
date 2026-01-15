import React from "react";
import { BrowserRouter } from "react-router-dom";

//import 'primeicons/primeicons.css';
import { RecoilRoot } from "recoil";
import "./App.css";
import RoutesConfig from "../src/route/routes";

//import { ConfirmHandler } from "./components/utils/ConfirmHandler";

const App = () => {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <RoutesConfig />
              
            </BrowserRouter>
        </RecoilRoot>
    );
};

export default App;
