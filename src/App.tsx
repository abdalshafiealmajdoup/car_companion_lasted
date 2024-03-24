// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import React, { useEffect } from 'react';
// import { initSiteEffects } from './utilities/siteEffects'; 
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
//Pages
import { routesConfig } from "./routes";
function App() {
  return <Routes>{generateRoutes(routesConfig)}</Routes>;
}

function generateRoutes(routes: any[]) {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={<route.element />} />
  ));
}

export default App;
