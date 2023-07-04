import React, {useContext} from 'react';
import {Context} from ".././index";
import {MAIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react";
import {useNavigate} from 'react-router-dom'
import ButtonUser from './buttons/ButtonUser.js'
import ButtonExit from "./buttons/ButtonExit";
import ButtonAdmin from "./buttons/ButtonAdmin";
import ButtonLogin from "./buttons/ButtonLogin";
import '../App.css'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    return (
        <nav className="navbar navbar-expand-lg bg-black">

            <div className="container-fluid ms-5">
                <a className="
                    navbar-brand
                    text-success
                    fst-italic
                    fw-bold
                    cursor-pointer
                "
                   onClick={() => navigate(MAIN_ROUTE)}
                >
                    ProductReview
                </a>

                <button className="navbar-toggler collapsed bg-success"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse mt-1" id="navbarTogglerDemo02">

                    <ul className="navbar-nav ms-auto me-lg-0 mb-2 mb-lg-0">
                        {user.isAuth && user.isAdmin ?
                            <>
                                <ButtonUser/>
                                <ButtonAdmin/>
                                <ButtonExit/>
                            </>
                            :
                            user.isAuth
                            ?
                                <>
                                    <ButtonUser/>
                                    <ButtonExit/>
                                </>
                            :
                            <ButtonLogin/>
                        }
                    </ul>

                </div>
            </div>
        </nav>
    );
})

export default NavBar;