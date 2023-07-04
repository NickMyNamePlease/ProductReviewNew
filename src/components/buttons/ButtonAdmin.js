import React from 'react';
import {ADMIN_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const ButtonAdmin = () => {
    const navigate = useNavigate()

    return (
        <li className="nav-item button-margin">
            <button className="btn btn-outline-success me-2 fw-bold " type="button" onClick={() => navigate(ADMIN_ROUTE)}>Адмін панель</button>
        </li>
    );
};

export default ButtonAdmin;