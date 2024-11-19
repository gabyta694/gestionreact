import React from 'react';
import { Link } from 'react-router-dom';
import './ListarFormulario.css';

const Home = () => {
    return (
        <div className="contenedor-formulario">
            <h1>Bienvenido a la Aplicación</h1>
            <p>¡Gracias por visitar nuestra aplicación! Para continuar, por favor inicie sesión.</p>
            <Link to="/login">
                <button>Iniciar Sesión</button>
            </Link>
        </div>
    );
};

export default Home;
