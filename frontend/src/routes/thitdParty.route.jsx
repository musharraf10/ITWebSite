import React from 'react'
import {Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'
import { ThirdPartyContextProvider } from '../context/ThirdPartyContext'
import ProtectedRoute from '../context/ProtectedRoute'
import ThirdPartyDB from '../components/DashboardComponent/ThirdPartyDB'

export default function ThirdPartyroutes() {
  return (
    <>
        <AuthProvider>
            <ThirdPartyContextProvider>

                <Routes>

                    <Route
                        path="/third-party"
                        element={
                        <ProtectedRoute allowedRoles={['third-party']}>
                            <ThirdPartyDB />
                        </ProtectedRoute>
                        }
                    />

                </Routes>

            </ThirdPartyContextProvider>
        </AuthProvider>
    </>
  )
}
