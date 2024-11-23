import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EstiloFormulario.css';

const AgregarContraparte = () => {
    const [nombre_contraparte, setNombreContraparte] = useState('');
    const [rut_contraparte, setRut_contraparte] = useState('');
    const [dv_contraparte, setDv_contraparte] = useState('');
    const [correo_contraparte, setCorreo_contraparte] = useState('');
    const [telefono, setTelefono] = useState('');
    const navigate = useNavigate();

    const validarRut = (rut) => /^[0-9]+$/.test(rut);
    const validarDv = (dv) => /^[0-9K]$/i.test(dv) && dv.length === 1;
    const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    const validarTelefono = (telefono) => /^[0-9]*$/.test(telefono);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos
        if (!validarRut(rut_contraparte)) {
            alert('El RUT debe contener solo números.');
            return;
        }

        if (!validarDv(dv_contraparte)) {
            alert('El dígito verificador (DV) debe ser un número o "K".');
            return;
        }

        if (!validarCorreo(correo_contraparte)) {
            alert('El correo debe contener un "@" y un dominio válido.');
            return;
        }

        if (!validarTelefono(telefono)) {
            alert('El teléfono debe contener solo números.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/contraparte`, {
                nombre_contraparte,
                rut_contraparte,
                dv_contraparte,
                correo_contraparte,
                telefono
            });

            if (response.status === 201) {
                alert('Contraparte agregada exitosamente');
                const storedRole = localStorage.getItem('userRole');
                navigate(storedRole === 'admin' ? '/admin' : '/user');
            }
        } catch (error) {
            console.error('Hubo un error al agregar la contraparte:', error);
            alert('Hubo un error al agregar la contraparte.');
        }
    };

    const handleCancel = () => {
        const storedRole = localStorage.getItem('userRole');
        navigate(storedRole === 'admin' ? '/admin' : '/user');
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
                    <label>RUT de la Contraparte:</label>
                    <input
                        type="text"
                        value={rut_contraparte}
                        onChange={(e) => setRut_contraparte(e.target.value.replace(/[^0-9]/g, ''))}
                        required
                    />
                </div>
                <div>
                    <label>DV de la Contraparte:</label>
                    <input
                        type="text"
                        value={dv_contraparte}
                        onChange={(e) => setDv_contraparte(e.target.value.replace(/[^0-9Kk]/g, ''))}
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
                    <label>Teléfono:</label>
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
