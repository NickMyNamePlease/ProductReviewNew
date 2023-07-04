import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {MAIN_ROUTE} from "../../utils/consts";

const ButtonExit = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(MAIN_ROUTE)
        localStorage.removeItem('token')
    }

    return (
        <li className="nav-item button-margin">
            <button className="btn btn-outline-danger me-2 fw-bold" type="button" onClick={() => logOut()}>Вихід</button>
        </li>
    );
};

export default ButtonExit;