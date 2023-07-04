import React from 'react';
import {USER_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const ButtonUser = () => {
    const navigate = useNavigate()

    return (
        <li className="nav-item button-margin">
            <button className="btn btn-outline-success me-2 fw-bold" type="button" onClick={() => navigate(USER_ROUTE)}>Особистий кабінет</button>
        </li>
    );
};

export default ButtonUser;