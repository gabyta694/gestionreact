import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EstiloFormulario.css'

const AgregarProyectos = () => {
    const [nombre_proyecto, setNombreProyecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_fin, setFechaFin] = useState('');
    const [estado, setEstado] = useState('');
    const [relevancia, setRelevancia] = useState('');
    const navigate = useNavigate();

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación simple
        if (!nombre_proyecto || !descripcion || !fecha_inicio || !fecha_fin || !estado || !relevancia) {
            alert('Todos los campos son obligatorios');
            return;
        }

        // Validación: fechaFin debe ser mayor que fechaInicio
        const fechaInicioDate = new Date(fecha_inicio);
        const fechaFinDate = new Date(fecha_fin);

        if (fechaFinDate <= fechaInicioDate) {
            alert('La fecha de fin debe ser posterior a la fecha de inicio');
            return;
        }

        try {
            // Enviar los datos al backend
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/proyecto`, {
                nombre_proyecto,
                descripcion,
                fecha_inicio,
                fecha_fin,
                estado,
                relevancia
            });

            // Si la respuesta es exitosa, redirigir al inicio
            if (response.status === 201) {
                alert('Proyecto agregado exitosamente');
                // Redirigir según el rol del usuario almacenado
                const storedRole = localStorage.getItem('userRole');
                if (storedRole === 'admin') {
                    navigate('/admin'); // Redirige a la página de inicio del admin
                } else {
                    navigate('/user'); // Redirige a la página de inicio del usuario normal
                }
            }
        } catch (error) {
            console.error('Hubo un error al agregar el proyecto:', error);
            alert('Hubo un error al agregar el proyecto');
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
            <h2 className="titulo">Agregar Proyecto</h2>
            <h3 className="subtitulo">Ingrese los datos requeridos en el formulario para agregar un nuevo registro</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Proyecto:</label>
                    <input
                        type="text"
                        value={nombre_proyecto}
                        onChange={(e) => setNombreProyecto(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        value={fecha_inicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de Fin:</label>
                    <input
                        type="date"
                        value={fecha_fin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Estado:</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar estado</option>
                        <option value="en progreso">En progreso</option>
                        <option value="terminado">Terminado</option>
                        <option value="pendiente">Pendiente</option>
                    </select>
                </div>
                <div>
                    <label>Relevancia:</label>
                    <select
                        value={relevancia}
                        onChange={(e) => setRelevancia(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar relevancia</option>
                        <option value="estrategico">Estratégico</option>
                        <option value="mantencion">Mantención</option>
                        <option value="desarrollo">Desarrollo</option>
                    </select>
                </div>
                <div className="button-group">
                    <button type="submit">Agregar Proyecto</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default AgregarProyectos;


