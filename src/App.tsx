import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
        <Route path="/" element={<Home />} />

        <Route path="/servicios" element={<Services />} />

        <Route path="/productos" element={<Products />} />

        <Route path="/proyectos" element={<Projects />} />

        <Route path="/nosotros" element={<About />} />

        <Route path="/contacto" element={<Contact />} />

        <Route path="/cotizar" element={<Quote />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App