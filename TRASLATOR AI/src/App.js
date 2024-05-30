import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/AuthProvider'; // Asegúrate de que la ruta del archivo sea correcta
import Login from './components/Login';
import Register from './components/Register';
import Translator from './components/Translator';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Asegúrate de envolver todas tus rutas con AuthProvider */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/translator" element={<Translator />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
