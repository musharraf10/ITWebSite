import React from 'react'
import {Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { UserContextProvider } from '../context/UserContext';
import { EmployeeListPage } from '../pages/getEmployees';
import OHome from '../pages/HomePage/OHome';
import Login from '../pages/Login';
import Login1 from '../pages/Login2step';

export default function PublicRoutes() {
  return (
    <>
        <AuthProvider>
            <UserContextProvider>

                <Routes>
                    <Route path="/getemp1" element={<EmployeeListPage />} />
                    <Route path="/" element={<OHome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login1" element={<Login1 />} />
                </Routes>

            </UserContextProvider>
        </AuthProvider>
    </>
  )
}
