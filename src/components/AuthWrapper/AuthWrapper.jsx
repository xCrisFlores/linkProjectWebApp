import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ErrorView from '../ErrorView/ErrorView';

const AuthWrapper = ({ children }) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    const publicRoutes = ['/', '/signup'];

    if (!user  && !publicRoutes.includes(location.pathname)) {
        return (
            <ErrorView 
            title='¡Ups! Parece que no has iniciado sesión.'
            description='Debes iniciar sesión para acceder a esta página.'
            />
        );
    }

    return children; // Renderiza el resto de la aplicación si el usuario es válido
};

export default AuthWrapper;
