import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AdminProducts from './pages/admin/AdminProducts'
import AdminLogin from './pages/admin/AdminLogin'
import Admin from './pages/admin/Admin'
import AdminGallery from './pages/admin/AdminGallery'

import Home from './pages/Home'
import Services from './pages/Services'
import Products from './pages/Products'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import Quote from './pages/Quote'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* WEB PÚBLICA */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/servicios"
          element={<Services />}
        />

        <Route
          path="/productos"
          element={<Products />}
        />

        <Route
          path="/proyectos"
          element={<Projects />}
        />

        <Route
          path="/nosotros"
          element={<About />}
        />

        <Route
          path="/contacto"
          element={<Contact />}
        />

        <Route
          path="/cotizar"
          element={<Quote />}
        />

        {/* ADMINISTRADOR */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin/productos"
          element={<AdminProducts />}
        />

        <Route
          path="/admin/galeria"
          element={<AdminGallery />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App