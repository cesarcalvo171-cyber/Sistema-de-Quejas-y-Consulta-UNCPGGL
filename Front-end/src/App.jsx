import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import RoutesConfig from "../src/route/routes";

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
