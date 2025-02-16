import React from 'react'
import {Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'
import ProtectedRoute from '../context/ProtectedRoute';
import { EmployeeContextProvider } from '../context/EmployeesContext'
import EmployeeDashBoard from '../components/DashboardComponent/EmployeeDashBoard';

export default function EmployeeRoutes() {
  return (
    <>
        <AuthProvider>
            <EmployeeContextProvider>

                <Routes>
                    <Route
                        path="/employee"
                        element={
                        <ProtectedRoute allowedRoles={['employee']}>
                            <EmployeeDashBoard />
                        </ProtectedRoute>
                        }
                    />
                </Routes>

            </EmployeeContextProvider>
        </AuthProvider>
    </>
  )
}
