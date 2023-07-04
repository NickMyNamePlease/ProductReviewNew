import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateProduct from "../components/modals/CreateProduct";
import DeleteProduct from "../components/modals/DeleteProduct";
import CreateCategory from "../components/modals/CreateCategory";

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [deleteProductVisible, setDeleteProductVisible] = useState(false)

    useEffect(() => {
        document.title = 'Сторінка адміністратора';
    }, []);

    return (
        <div className="bg-mobile">
            <Container
                className="d-flex flex-column background col-lg-7 col-12 align-items-center min-vh-100"
            >

                <button
                    className="btn btn-success mt-4 p-2 col-lg-8 col-10"
                    onClick={() => setTypeVisible(true)}
                >
                    Додати новий тип
                </button>
                <button
                    className="btn btn-success mt-4 p-2 col-lg-8 col-10"
                    onClick={() => setCategoryVisible(true)}
                >
                    Додати нову категорію
                </button>
                <button
                    className="btn btn-success mt-4 p-2 col-lg-8 col-10"
                    onClick={() => setProductVisible(true)}
                >
                    Додати новий товар
                </button>
                <button
                    className="btn btn-success mt-4 p-2 col-lg-8 col-10"
                    onClick={() => setDeleteProductVisible(true)}
                >
                    Видалити товар
                </button>

                <CreateType
                    show={typeVisible} onHide={() => setTypeVisible(false)}
                />
                <CreateCategory
                    show={categoryVisible} onHide={() => setCategoryVisible(false)}
                />
                <CreateProduct
                    show={productVisible} onHide={() => setProductVisible(false)}
                />
                <DeleteProduct
                    show={deleteProductVisible} onHide={() => setDeleteProductVisible(false)}
                />
            </Container>
        </div>
    );
};

export default Admin;