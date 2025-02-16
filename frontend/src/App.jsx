import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/admin.route";
import ThirdPartyroutes from './routes/thitdParty.route';
import EmployeeRoutes from './routes/employee.route';
import PublicRoutes from './routes/public.routes';

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} /> 
        <Route path="/admin/*" element={<AdminRoutes />} /> 
        <Route path="/third-party/*" element={<ThirdPartyroutes />} />
        <Route path="/employee/*" element={<EmployeeRoutes />} />
      </Routes>
    </Router>
  </>
  )
}
