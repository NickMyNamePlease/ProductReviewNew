import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react';
import { Context } from './index';
import { check } from './http/userAPI';
import Footer from './components/Footer';
import './App.css'

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then((decodedToken) => {
                user.setUser(true);
                user.setIsAuth(true);
                user.setIsAdmin(decodedToken.isAdmin);
                if (decodedToken.role === 'ADMIN') {
                    user.setIsAdmin(true);
                } else {
                    user.setIsAdmin(false);
                }
            })
            .catch(() => {
                user.setUser(false);
                user.setIsAuth(false);
                user.setIsAdmin(false);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="spinner-grow text-warning justify-content-center" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <div className="app-container">
                <NavBar />
                <div className="main-content-container">
                    <AppRouter />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
});

export default App;
