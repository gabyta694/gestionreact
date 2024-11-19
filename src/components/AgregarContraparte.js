import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EstiloFormulario.css'

const AgregarContraparte = () => {
    const [nombre_contraparte, setNombreContraparte] = useState('');
    const [rut_contraparte, setRut_contraparte] = useState('');
    const [dv_contraparte, setDv_contraparte] = useState('');
    const [correo_contraparte, setCorreo_contraparte] = useState('');
    const [telefono, setTelefono] = useState('');
    const navigate = useNavigate();

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación simple
        if (!nombre_contraparte || !rut_contraparte || !dv_contraparte || !correo_contraparte || !telefono) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            // Enviar los datos al backend
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/contraparte`, {
                nombre_contraparte,
                rut_contraparte,
                dv_contraparte,
                correo_contraparte,
                telefono
            });

            // Si la respuesta es exitosa, redirigir al inicio
            if (response.status === 201) {
                alert('Contraparte agregado exitosamente');
                // Redirigir según el rol del usuario almacenado
                const storedRole = localStorage.getItem('userRole');
                if (storedRole === 'admin') {
                    navigate('/admin'); // Redirige a la página de inicio del admin
                } else {
                    navigate('/user'); // Redirige a la página de inicio del usuario normal
                }
            }
        } catch (error) {
            console.error('Hubo un error al agregar la contraparte:', error);
            alert('Hubo un error al agregar la contraparte');
        }
    };
    
    // Función para el botón de cancelar
    const handleCancel = () => {
        const storedRole = localStorage.getItem('userRole'); // Obtén el rol desde el almacenamiento local
        if (storedRole === 'admin') {
            navigate('/admin'); // Redirige a la página de admin
        } else {
            navigate('/user'); // Redirige a la página de usuario normal
        }
    };

    return (
        <div className="contenedor-formulario">
            <h2 className="titulo">Agregar Contraparte</h2>
            <h3 className="subtitulo">Ingrese los datos requeridos en el formulario para agregar un nuevo registro</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la Contraparte:</label>
                    <input
                        type="text"
                        value={nombre_contraparte}
                        onChange={(e) => setNombreContraparte(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rut de la Contraparte:</label>
                    <input
                        type="text"
                        value={rut_contraparte}
                        onChange={(e) => setRut_contraparte(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Dv de la Contraparte:</label>
                    <input
                        type="text"
                        value={dv_contraparte}
                        onChange={(e) => setDv_contraparte(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Correo de la Contraparte:</label>
                    <input
                        type="text"
                        value={correo_contraparte}
                        onChange={(e) => setCorreo_contraparte(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Telefono:</label>
                    <input
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />  
                </div>
                <div className="button-group">
                    <button type="submit">Agregar Contraparte</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default AgregarContraparte;