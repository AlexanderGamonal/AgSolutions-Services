import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminLayout } from './components/admin/AdminLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import ClientsPage from './pages/admin/ClientsPage'
import ClientDetailPage from './pages/admin/ClientDetailPage'
import ClientFormPage from './pages/admin/ClientFormPage'
import FormBuilderPage from './pages/admin/FormBuilderPage'
import FormFillPage from './pages/public/FormFillPage'
import FormSuccessPage from './pages/public/FormSuccessPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/new" element={<ClientFormPage />} />
            <Route path="clients/:id" element={<ClientDetailPage />} />
            <Route path="forms/new" element={<FormBuilderPage />} />
            <Route path="forms/:id" element={<FormBuilderPage />} />
          </Route>

          <Route path="/form/:token" element={<FormFillPage />} />
          <Route path="/form/:token/success" element={<FormSuccessPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
