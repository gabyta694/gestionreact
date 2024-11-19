import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Asegúrate de que la ruta sea correcta
import Home from './components/Home'; // Importa el nuevo componente Home
import Admin from './components/Admin'; // Importa el componente Admin
import User from './components/User'; // Importa el componente User
import AgregarUsuario from './components/AgregarUsuario';
import AgregarProyectos from './components/AgregarProyectos';
import AgregarContraparte from './components/AgregarContraparte';
import AgregarDesempeno from './components/AgregarDesempeno';
import AgregarTarea from './components/AgregarTarea';

import ListarUsuarios from './components/ListarUsuarios';
import ListarProyectos from './components/ListarProyectos';
import ListarContrapartes from './components/ListarContrapartes';
import ListarDesempeno from './components/ListarDesempeno';
import ListarTareas from './components/ListarTareas';
import ListarHistorial from './components/ListarHistorial';

import ActualizarUsuario from './components/ActualizarUsuario';
import ActualizarProyecto from './components/ActualizarProyecto';
import ActualizarContraparte from './components/ActualizarContraparte';
import ActualizarDesempeno from './components/ActualizarDesempeno';
import ActualizarTarea from './components/ActualizarTarea';

import Indicadores from './components/KPI';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Ruta para Home */}
                <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
                <Route path="/admin" element={<Admin />} /> {/* Ruta para Admin */}
                <Route path="/user" element={<User />} /> {/* Ruta para User */}
                <Route path="/agregar" element={<AgregarUsuario />} /> {/* Ruta para AgregarUsuario */}
                <Route path="/agregarproyectos" element={<AgregarProyectos />} /> {/* Ruta para AgregarProyectos */}
                <Route path="/agregarcontraparte" element={<AgregarContraparte />} /> {/* Ruta para AgregarContraparte */}
                <Route path="/agregardesempeno" element={<AgregarDesempeno />} />
                <Route path="/agregartarea" element={<AgregarTarea/>} />

                <Route path="/listarusuarios" element={<ListarUsuarios />} /> 
                <Route path="/listarproyectos" element={<ListarProyectos />} /> 
                <Route path="/listarcontrapartes" element={<ListarContrapartes />} />
                <Route path="/listardesempeno" element={<ListarDesempeno />} /> 
                <Route path="/listartareas" element={<ListarTareas />} /> 
                <Route path="/listarhistorial" element={<ListarHistorial />} /> 
                
                <Route path="/actualizar/:id" element={<ActualizarUsuario />} />
                <Route path="/actualizarproyecto/:id" element={<ActualizarProyecto />} />
                <Route path="/actualizarcontraparte/:id" element={<ActualizarContraparte />} />
                <Route path="/actualizardesempeno/:id" element={<ActualizarDesempeno />} />
                <Route path="/actualizartarea/:id" element={<ActualizarTarea />} />

                <Route path="/indicadores" element={<Indicadores />} />
            </Routes>
        </Router>
    );
};

export default App;
