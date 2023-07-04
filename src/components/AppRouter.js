import React, {useContext} from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import {adminRoutes, publicRoutes, userRoutes} from "../routes";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <div>
            <Routes>
                {user.isAuth && user.isAdmin && adminRoutes?.map(({ path,  Component }) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                {user.isAuth && !user.isAdmin && userRoutes?.map(({ path,  Component }) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                {publicRoutes?.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </div>
    );
};


export default AppRouter;