import React, {useContext, useEffect, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {check, login, registration} from "../http/userAPI";
import {observer} from "mobx-react";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        document.title = 'Вхід';
    }, []);

    const click = async () => {
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await registration(name, email, password);
            }

            const decodedToken = await check();
            user.setUser(decodedToken)
            user.setIsAuth(true)

            if (decodedToken.role === 'ADMIN') {
                user.setIsAdmin(true)
            } else {
                user.setIsAdmin(false)
            }

            navigate(MAIN_ROUTE)
            window.location.reload()

        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card
                style={{width: 600}}
                className="p-5"
            >
                <h2
                    className="m-auto"
                >
                    {isLogin ? 'Авторизація' : 'Реєстрація'}
                </h2>
                <Form className="d-flex flex-column">
                    {!isLogin
                        ?
                        <Form.Control
                            className="mt-3"
                            placeholder="Введіть ваше ім'я..."
                            value={name}
                            onChange={e => setName(e.target.value)}
                        /> : null
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Немає аккаунту?
                                <NavLink to={REGISTRATION_ROUTE}> Зареєструватися!</NavLink>
                            </div>
                            :
                            <div>
                                Є аккаунт? <NavLink to={LOGIN_ROUTE}>Увійти!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Увійти' : 'Зареєструватися'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;