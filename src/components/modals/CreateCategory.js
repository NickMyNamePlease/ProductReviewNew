import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import { Context } from "../../index";
import { createCategory, fetchTypes } from "../../http/productAPI";
import { observer } from "mobx-react";
import '../../App.css'

const CreateCategory = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [name, setName] = useState('');
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
    }, []);

    const addCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('typeId', selectedType.id);
            await createCategory(formData).then(() => onHide());
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle className="filter">{selectedType ? selectedType.name : "Оберіть тип"}</Dropdown.Toggle>
                        <Dropdown.Menu className="filter-body">
                            {product.types.map(type =>
                                <Dropdown.Item onClick={() => setSelectedType(type)} key={type.id}>
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть назву категорії"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addCategory}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCategory;
