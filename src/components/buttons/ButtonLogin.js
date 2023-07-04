import React from 'react';
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts";

const ButtonLogin = () => {
    const navigate = useNavigate()

    return (
        <li className="nav-item button-margin">
            <button className="btn btn-outline-success me-2 fw-bold " type="button" onClick={() => navigate(LOGIN_ROUTE)}>Авторизуватися</button>
        </li>
    );
};

export default ButtonLogin;