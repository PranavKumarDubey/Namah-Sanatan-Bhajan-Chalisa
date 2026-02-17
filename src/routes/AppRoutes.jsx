import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '../routes/routeConfig';

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route 
          key={route.path}
          path={route.path} 
          element={route.component ? React.createElement(route.component) : route.element}
        />
      ))}
    </Routes>
  );
}

export default AppRoutes;
