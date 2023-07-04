import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Button, Modal} from "react-bootstrap";
import {deleteOneProduct, fetchProducts} from "../../http/productAPI";


const DeleteMovie = ({show, onHide}) => {
    const [,setValue] = useState('')
    const {product} = useContext(Context)

    useEffect(() => {
        fetchProducts(null, null, null,100).then(data => {
            product.setProducts(data.rows)
        })
    }, [])

    const deleteProduct = (id) => {
        deleteOneProduct(id).then(() => {
            setValue('')
        }).then(() => {window.location.reload()})
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Видалити продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {product.products?.map((product) =>
                    <a
                        href="#" key={product.id}
                        product={product}
                        className="list-group-item list-group-item-action list-group-item-danger"
                        onClick={() => deleteProduct(product.id)}
                    >
                        {product.name}
                    </a>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                >
                    Закрити
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteMovie;