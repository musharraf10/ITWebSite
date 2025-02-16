import React from 'react'
import {Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'
import ProtectedRoute from '../context/ProtectedRoute'
import AdminDashBoard from '../components/DashboardComponent/AdminDashBoard';
import {AdminContextProvider} from "../context/SuperAdminContext.jsx"

export default function AdminRoutes() {
  return (
    <>
    <AuthProvider>
        <AdminContextProvider>

            <Routes>
                
                <Route
                    path="/admin"
                    element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashBoard />
                    </ProtectedRoute>
                    }
                />

            </Routes>

        </AdminContextProvider>
    </AuthProvider>
    </>
  )
}
